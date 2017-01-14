"use strict"
var
  most= require( "most"),
  Stream= most.Stream

class MostCreateSource {
	constructor( fn, cold) {
		if( !cold){
			this._invokeFn( fn)
		}else{
			this._fn= fn
		}
		this._sink= null
		this._scheduler= null
		this._dispose= null
		this._end= null
	}
	run( sink, scheduler) {
		this._sink= sink
		this._scheduler= scheduler
		if( this._fn){
			this._invokeFn( this._fn)
			delete this._fn
		}
		if( this._end){
			return
		}
		var dispose= ()=> {
			if( this._dispose){
				this._dispose()
			}
			this._sink= null
			this._scheduler= null
		}
		return { dispose}
	}
	_invokeFn( fn){
		var add= value=> {
			var sink= this._sink
			if( sink){
				sink.event( this._scheduler.now(), value)
			}
		}
		var end= value=> {
			var sink= this._sink
			if( sink){
				sink.end( this._scheduler.now(), value)
			}
			this._end= true
			this._sink= null
			this._scheduler= null
		}
		var error= err=> {
			var sink= this._sink
			if( sink){
				sink.error( this._scheduler.now(), err)
			}
		}
		var dispose= fn( add, end, error)
		this._dispose= dispose
	}
}

class MostCreate extends Stream {
	constructor( fn, cold) {
		super( new MostCreateSource( fn, cold))
	}
}

module.exports= MostCreate
module.exports.MostCreate= MostCreate
module.exports.MostCree8= MostCreate
module.exports.MostCreateSource= MostCreateSource
