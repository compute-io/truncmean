'use strict';

var truncmean = require( './../lib' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.random() * 100;
}
console.log( truncmean( data, 0.1 ) );
