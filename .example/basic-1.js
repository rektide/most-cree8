#!/usr/bin/env node
"use strict"

var MostCreate= require( "..")

function main(){
	var stream= new MostCreate(function( put){
		put( 2)
		put( 4)
		put( 6)
		put( 8)
	})
	stream.forEach(x => console.log(x/2))
	return stream
}

if( require.main=== module){
	main()
}

module.exports= main
