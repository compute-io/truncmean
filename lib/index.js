/**
*
*	COMPUTE: truncmean
*
*
*	DESCRIPTION:
*		- Computes the truncated mean of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Philipp Burckhardt.
*
*
*	AUTHOR:
*		Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
    isNumber = require( 'validate.io-number-primitive' ),
    isBoolean = require( 'validate.io-boolean-primitive' ),
    isObject = require( 'validate.io-object' ),
    isFunction = require( 'validate.io-function' ),
    isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// TRUNCATED MEAN //

/**
* FUNCTION: truncmean( arr, discard[, options] )
*	Computes the truncated mean of an array.
*
* @param {Array} arr - input array
* @param {Number} discard - either a percentage expressed on the interval [0,0.5] or a non-negative integer.
* @param {Object} [options] - function options
* @param {Boolean} [options.sorted=false] - boolean indicating if the input array is sorted in ascending order
* @param {Function} [options.accessor] - accessor function for accessing numeric array values
* @param {Boolean} [options.interpolate=false] - boolean indicating whether to interpolate between truncated means when a discard percentage does not yield an integer number of array values to discard
* @returns {Number|null} truncated mean
*/
function truncmean( arr, discard, options ) {
	var sorted,
		clbk,
		interp,
		delta,
		diff,
		len,
		mu,
		lo,
		hi,
		N,
		tmp,
		w1, w2,
		d, i;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'truncmean()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( isNumber( discard ) ) {
		if ( !isNonNegativeInteger( discard ) ) {
			if ( discard < 0 || discard > 0.5 ) {
				throw new RangeError( 'truncmean()::invalid input argument. Discard must be either a number on the interval [0,0.5] or a nonnegative integer. Value: `' + discard + '`.' );
			}
		}
		else if ( discard > len/2 ) {
			throw new RangeError( 'truncmean()::invalid input argument. Number of discard values cannot exceed half the array length. Value: `' + discard + '`.' );
		}
	} else {
		throw new TypeError( 'truncmean()::invalid input argument. Discard must be either a number on the interval [0,0.5] or a nonnegative integer. Value: `' + discard + '`.' );
	}
	if ( arguments.length > 2  ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'truncmean()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'sorted' ) ) {
			sorted = options.sorted;
			if ( !isBoolean( sorted ) ) {
				throw new TypeError( 'truncmean()::invalid option. Sorted option must be a boolean. Value: `' + sorted + '`.' );
			}
		}
		if ( options.hasOwnProperty( 'accessor' ) ) {
			clbk = options.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'truncmean()::invalid option. Accessor must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( options.hasOwnProperty( 'interpolate' ) ) {
			interp = options.interpolate;
			if ( !isBoolean( interp ) ) {
				throw new TypeError( 'truncmean()::invalid option. Interpolate option must be a boolean. Value: `' + interp + '`.' );
			}
		}
	}
	if ( !len ) {
		return null;
	}
	if ( !clbk && sorted ) {
		d = arr;
	}
	else if ( !clbk ) {
		d = [];
		for ( i = 0; i < len; i++ ) {
			d.push( arr[ i ] );
		}
	} else {
		d = [];
		for ( i = 0; i < len; i++ ) {
			d.push( clbk( arr[ i ] ) );
		}
	}
	if ( !sorted ) {
		d.sort( ascending );
	}
	// Case 1: no interpolation...
	if ( discard >= 1 || discard === 0 || discard === 0.5 || !interp ) {
		if ( discard < 1 && discard !== 0 ) {
			// Convert the discard percentage to a number of values:
			discard = Math.floor( len * discard );
		}
		lo = discard;
		hi = len - discard - 1;

		// Handle case where discard = 0.5 and array length is even...
		if ( hi < lo ) {
			tmp = lo;
			lo = hi;
			hi = tmp;
		}
		mu = 0;
		N = 0;
		for ( i = lo; i <= hi; i++ ) {
			N += 1;
			delta = d[ i ] - mu;
			mu += delta / N;
		}
		return mu;
	}
	// Case 2: interpolation...
	N = Math.floor( len * discard );

	// Compute the discard percentages used for interpolation...
	w1 = N / len;
	w2 = (N+1) / len;

	lo = N;
	hi = len - N - 1;

	// Compute the first mean...
	mu = 0;
	N = 0;
	for ( i = lo; i <= hi; i++ ) {
		N += 1;
		delta = d[ i ] - mu;
		mu += delta / N;
	}
	// If w2 exceeds 50%, then we are interpolating from the median to the median, which, regardless of weights, is just the median...
	if ( w2*2 >= 1 ) {
		return mu;
	}
	tmp = mu;

	// Convert the discard percentages to weights...
	diff = w2 - w1;
	i = w1;
	w1 = (w2-discard) / diff;
	w2 = (discard-i) / diff;

	// Compute the second mean by removing the lowest and highest previously included elements (see TODO)...
	N -= 1;
	delta = d[ lo ] - mu;
	mu -= delta / N;

	N -= 1;
	delta = d[ hi ] - mu;
	mu -= delta / N;

	// Compute the weighted average:
	return w1*tmp + w2*mu;
} // end FUNCTION truncmean()


// EXPORTS //

module.exports = truncmean;
