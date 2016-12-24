"use strict"
var
  most= require( "most"),
  Stream= most.Stream

class MostCreateSource {
	constructor( fn) {
		this.fn= fn
	}
	run( sink, scheduler) {
		var running = true
		function add( value){
			if( running){
				sink.event( scheduler.now(), value)
			}
		}
		function end( value) {
			sink.end( scheduler.now(), value)
			running= false
		}
		function error( err){
			sink.error( scheduler.now(), err)
		}
		this.fn( add, end, error)
		delete this.fn
		function dispose(){
			if( fn.dispose) {
				fn.dispose()
			}
			running= false
		}
		return { dispose}
	}
}

class MostCreate extends Stream {
	constructor( fn) {
		super( new MostCreateSource( fn))
	}
}

module.exports= MostCreate
module.exports.MostCreate= MostCreate
module.exports.MostCree8= MostCreate
module.exports.MostCreateSource= MostCreateSource
