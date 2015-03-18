/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	truncmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-truncmean', function tests() {

	it( 'should export a function', function test() {
		expect( truncmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( value, 0.1 );
			};
		}
	});

	it( 'should throw an error if provided a non-numeric discard value', function test(){
		var values, arr;

		arr = [ 1, 2, 3 ];
		values = [
			'',
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			{}
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( arr, value );
			};
		}
	});

	it( 'should throw an error if provided a discard value which is a decimal value outside the interval [0,0.5] or is a nonnegative integer which is greater than half the input array length', function test(){
		var values, arr;

		arr = [ 1, 2, 3 ];
		values = [
			-1,
			0.6,
			arr.length,
			Math.PI
		];
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( arr, value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( [1,2,3], 0.1, value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			true,
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( [1,2,3], 0.1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided a sorted option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( [1,2,3], 0.1, {
					'sorted': value
				});
			};
		}
	});

	it( 'should throw an error if provided an interpolate option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				truncmean( [1,2,3], 0.1, {
					'interpolate': value
				});
			};
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( truncmean( [], 0 ) );
	});

	it( 'should compute the arithmetic mean when nothing is discarded', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 4;

		assert.strictEqual( truncmean( data, 0 ), expected );
	});

	it( 'should compute the arithmetic mean using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = 4;
		actual = truncmean( data, 0, {
			'accessor': getValue
		});

		function getValue( d ) {
			return d.x;
		}

		assert.strictEqual( actual, expected );
	});

	it( 'should compute the truncated mean', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2, 0, 8, -999, 100 ];
		expected = 4;

		assert.strictEqual( truncmean( data, 0.1 ), expected );
	});

	it( 'should compute the truncated mean of a sorted array', function test() {
		var data, expected, actual;

		data = [ -999, 0, 2, 2, 3, 4, 5, 8, 8, 100 ];
		expected = 4;

		actual = truncmean( data, 1, {
			'sorted': true
		});

		assert.strictEqual( actual, expected );

		data = [
			[0,-999],
			[1,0],
			[2,2],
			[3,2],
			[4,3],
			[5,4],
			[6,5],
			[7,8],
			[8,8],
			[9,100]
		];
		expected = 4;

		actual = truncmean( data, 1, {
			'sorted': true,
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should compute the median', function test() {
		var data, actual, expected;

		data = [ 3, 4, 1, 2, 5 ];
		expected = 3;

		actual = truncmean( data, 0.5 );
		assert.strictEqual( actual, expected );

		data = [ 3, 4, 1, 2, 5, 6 ];
		expected = 3.5;

		actual = truncmean( data, 0.5 );
		assert.strictEqual( actual, expected );
	});

	it( 'should compute the interquartile mean', function test() {
		var data, actual, expected;

		data = [ 100, 152, -64, -Math.PI, 3, 4, 3, 2, 76, 6, -54, 5 ];

		expected = 23/6;
		actual = truncmean( data, 3 );

		assert.closeTo( actual, expected, 1e-9 );

		data = [ 100, 152, -64, -Math.PI, 3, 4, 3, 2, 76, 6, -54, 5, 0 ];

		expected = 23/7;
		actual = truncmean( data, 0.25 );

		assert.closeTo( actual, expected, 1e-9 );
	});

	it( 'should interpolate between truncated means', function test() {
		var data, actual, expected;

		data = [ 2, 6, 3, 2, 1, 0, 0, 6, 5, 3 ];
		// 0, 0, 1, 2, 2, 3, 3, 5, 6, 6
		// avg btwn: 16/6 & 10/4
		expected = 0.5*16/6 + 0.5*10/4;

		actual = truncmean( data, 0.25, {
			'interpolate': true
		});
		assert.closeTo( actual, expected, 1e-9 );

		data = [ 2, 6, 3, 2, 1, 0, 0, 6, 5, 3 ];
		// 0, 0, 1, 2, 2, 3, 3, 5, 6, 6
		// avg btwn: 16/6 & 10/4
		expected = 0.2*16/6 + 0.8*10/4;

		actual = truncmean( data, 0.28, {
			'interpolate': true
		});
		assert.closeTo( actual, expected, 1e-9 );

		data = [ 2, 6, 3, 2, 1, 0, 0, 6, 5, 3 ];
		// 0, 0, 1, 2, 2, 3, 3, 5, 6, 6
		expected = 2.5;

		actual = truncmean( data, 0.4, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected );
	});

	it( 'should handle edge cases when interpolating between truncated means', function test() {
		var data, actual, expected;

		data = [ 1, 2 ];

		expected = 1.5;
		actual = truncmean( data, 0.4, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 2' );

		data = [ 1, 2, 3 ];

		expected = 2;
		actual = truncmean( data, 0.4, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 3' );

		data = [ 1, 2, 3, 5  ];

		expected = 2.5;
		actual = truncmean( data, 0.4, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 4' );

		data = [ 1, 2, 2, 3, 1, 4, 4, 3 ];

		expected = 2.5;
		actual = truncmean( data, 0.49, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 8' );

		data = [ 1, 2, 2, 3, 1, 4, 4, 3, 5 ];

		expected = 3;
		actual = truncmean( data, 0.49, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 9' );

		data = [ 1, 2, 2, 3, 1, 4, 4, 4, 5, 5 ];

		expected = 3.5;
		actual = truncmean( data, 0.49, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'short array of length 10' );

		data = [];
		for ( var i = 0; i < 100; i++ ) {
			data[ i ] = i+1;
		}
		expected = 50.5;
		actual = truncmean( data, 0.49, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'array of length 100' );

		data.push( 101 );
		expected = 51;
		actual = truncmean( data, 0.49, {
			'interpolate': true
		});
		assert.strictEqual( actual, expected, 'array of length 101' );
	});

});
