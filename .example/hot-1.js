#!/usr/bin/env node
"use strict"

var MostCree8= require( "..")

var add
var stream= new MostCree8(function(_add, end, error){
	add= _add
	add( "ignored") // this will be ignored since no one is subscribed to this stream while it is being created
})
add( "ignored") // this will be ignored since the stream is still not subscribed to
stream.forEach(console.log)
add(1) //=> 1
