Trimmed Mean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Calculates the mean of a sequence of values excluding outliers.

## Installation

``` bash
$ npm install compute-trimmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

``` javascript
var trimmean = require( 'compute-trimmean' );
```

#### trimmean( arr, percent[, accessor] )

Computes the [trimmed mean](http://en.wikipedia.org/wiki/Truncated_mean) of a numeric `array`,
discarding `percent`\% from the high and low end of the array values.  

``` javascript
var data = [ 2, 4, 5, 3, 8, 2, 4, 4, 100, 0 ];

var mu = trimmean( data, 10);
// returns 4
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values

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

var mu = trimmean( data, 10, getValue );
// returns 4
```

### Examples

``` javascript
// Simulate some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.random() * 100;
}

// Calculate the trimmed mean...
console.log( trimmean( data, 10 ) );
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


[npm-image]: http://img.shields.io/npm/v/compute-trimmean.svg
[npm-url]: https://npmjs.org/package/compute-trimmean

[travis-image]: http://img.shields.io/travis/compute-io/trimmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/trimmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/trimmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/trimmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/trimmean.svg
[dependencies-url]: https://david-dm.org/compute-io/trimmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/trimmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/trimmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/trimmean.svg
[github-issues-url]: https://github.com/compute-io/trimmean/issues
