#!/usr/bin/env node
"use strict"

var MostCree8= require( "..")

var add
var stream= new MostCree8( function( _add, end, error){
	add= _add
	add( "ignored") // still ignored, since observer is not yet connected
	process.nextTick(_ => add(2)) //=> 2
}, true) // true here says to defer running the function until there is an observer
add && add( "ignored") || console.log( "not created yet") //=> not created yet, as add has not been set/create function has not been called
stream.forEach( console.log)
add( 1) //=> 1
