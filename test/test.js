/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	trimmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-trimmean', function tests() {

		it( 'should export a function', function test() {
				expect( trimmean ).to.be.a( 'function' );
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
						trimmean( value );
					};
				}
		});

		it( 'should throw an error if percent is not number between 0 and 100', function test(){
				var values = [
					-10,
					110,
					'string',
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
						trimmean( [], value );
					};
				}
		});

		it( 'should throw an error if provided accessor is not a function', function test() {
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
						trimmean( [], 10, value );
					};
				}
		});

	it( 'should compute the arithmetic mean when nothing is trimmed off', function test() {
			var data, expected;

			data = [ 2, 4, 5, 3, 8, 2 ];
			expected = 4;

			assert.strictEqual( trimmean( data, 0 ), expected );
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
			actual = trimmean( data, 0, getValue );

			function getValue( d ) {
				return d.x;
			}

			assert.strictEqual( actual, expected );
	});

	it( 'should compute the trimmed mean', function test() {
			var data, expected;

			data = [ 2, 4, 5, 3, 8, 2, 0, 8, -999, 100];
			expected = 4;

			assert.strictEqual( trimmean( data, 10 ), expected );
	});

});
