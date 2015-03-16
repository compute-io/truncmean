Truncated Mean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [truncated mean](http://en.wikipedia.org/wiki/Truncated_mean) of an array.

## Installation

``` bash
$ npm install compute-truncmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

``` javascript
var truncmean = require( 'compute-truncmean' );
```

#### truncmean( arr, discard[, options] )

Computes the [truncated mean](http://en.wikipedia.org/wiki/Truncated_mean) of an `array`. The amount of data to discard when computing the mean is given by `discard`. The amount to discard may be expressed as either a percentage on the interval `[0,0.5]` or as an `integer` number of values.

``` javascript
var data = [ 2, 4, 5, 3, 8, 2, 4, 4, 100, 0 ];

var mu = truncmean( data, 0.1 );
// returns 4
```

If `discard = 0`, then the result is equivalent to the [mean](https://github.com/compute-io/mean). If `discard = 0.5`, then the result is equivalent to the [median](https://github.com/compute-io/median). If `discard = 0.25`, then the result is equivalent to the [interquartile mean](https://github.com/compute-io/midmean).

The function accepts three `options`:

*	__sorted__: `boolean` indicating if the input `array` is sorted in __ascending__ order. Default: `false`.
*	__accessor__: accessor `function` for accessing values in object `arrays`.
*	__interpolate__: `boolean` indicating whether the mean should be interpolated if a `discard` percentage does not yield an `integer` number of values. Default: `false`.

If the input `array` is already sorted in __ascending__ order, set the `sorted` option to `true`.

``` javascript
var data = [ 0, 2, 2, 3, 4, 4, 4, 5, 8, 100 ];

var mu = truncmean( data, 2, {
	'sorted': true
});
// returns ~3.67
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values.

``` javascript
var data = [
    {'x':2},
    {'x':4},
    {'x':5},
    {'x':3},
    {'x':8},
    {'x':2},
    {'x':4},
    {'x':4},
    {'x':100},
    {'x':0}
];

function getValue( d ) {
	return d.x;
}

var mu = truncmean( data, 0.1, {
	'accessor': getValue
});
// returns 4
```

To interpolate between truncated means if a `discard` percentage does not yield an `integer` number of values to discard, set the `interpolate` option to `true`.

``` javascript
 var data = [ 2, 4, 5, 3, 8, 2, 4, 4, 100, 0 ];

var mu = truncmean( data, 0.19, {
	'interpolate': true	
});
// returns ~3.70 
```


## Notes

*	if provided an empty `array`, the function returns `null`.
*	the `discard` amount is applied to both "ends" of the (sorted) input `array`. For example, if `discard = 0.1`, 10% of the largest values and 10% of the smallest values are discarded.
*	interpolation is a weighted average between truncated means having &#8968;`N*p`&#8969; and &#8970;`N*p`&#8971; number of values discarded, where `N` is the input `array` length and `p` is the discard percentage. For example, if `N = 10` and `p = 0.19`, then the interpolated mean is `0.1*mu_{floor} + 0.9*mu_{ceil}`.




### Examples

``` javascript
var truncmean = require( 'compute-truncmean' );

// Simulate some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.random() * 100;
}

// Calculate the truncated mean...
console.log( truncmean( data, 0.1 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/compute-truncmean.svg
[npm-url]: https://npmjs.org/package/compute-truncmean

[travis-image]: http://img.shields.io/travis/compute-io/truncmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/truncmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/truncmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/truncmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/truncmean.svg
[dependencies-url]: https://david-dm.org/compute-io/truncmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/truncmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/truncmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/truncmean.svg
[github-issues-url]: https://github.com/compute-io/truncmean/issues
