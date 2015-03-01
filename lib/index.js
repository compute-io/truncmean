/**
*
*	COMPUTE: trimmean
*
*
*	DESCRIPTION:
*		- Calculates the mean of a sequence of values excluding outliers.
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
    isNumber = require( 'validate.io-number' );

// FUNCTIONS //

// TRIMMEAN //

/**
* FUNCTION: trimmean( arr, percent[, options] )
* Calculates the mean of a sequence of values excluding outliers.
*
* @param {Array} arr - input array
* @param {Number} percent - number between 0 and 100 indicating how much to trim off from both high and low end of array values
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number} trimmed mean value
*/
function trimmean( arr, percent, clbk ) {

    var n, lo, hi, x, N = 0, diff = 0, mu = 0;

    if ( !isArray( arr ) ) {
    	  throw new TypeError( 'trimmean()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
    }
    if ( !isNumber( percent ) || percent < 0 || percent > 100 ){
        throw new TypeError( 'trimmean()::invalid input argument. Must provide a scalar between 0 and 100. Value: `' + percent + '`.' );
    }
    if ( arguments.length > 2 && typeof clbk !== 'function' ) {
    			throw new TypeError( 'trimmean()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
    }

    n  = arr.length;
    lo = Math.floor( n * ( percent / 100) );
    hi = n - lo - 1;

    var d = [];
    for ( var i = 0; i < arr.length; i++ ) {
        x = ( clbk ) ? clbk( arr[ i ] ) : arr[ i ];
        d.push( x );
    }

    d.sort( function( a, b ){
        return a -b;
    } );
    for ( i = 0; i <= n; i++ ) {
        if ( i <= hi && i >= lo ) {
            N    += 1;
            diff = d[i] - mu;
            mu += diff / N;
        }
    }

    return mu;

} // end FUNCTION trimmean()


// EXPORTS //

module.exports = trimmean;
