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
		this._unsubscribe= null
		this._complete= null
	}
	run( sink, scheduler) {
		var isNew= !this._sink
		this._sink= sink
		this._scheduler= scheduler
		if( this._fn){
			this._invokeFn( this._fn)
			delete this._fn
		}
		if( isNew&& this.onsubscribe){
			this.onsubscribe()
		}
		var dispose= ()=> {
			if( this._unsubscribe){
				this._unsubscribe()
			}
			this._sink= null
			this._scheduler= null
		}
		return { dispose}
	}
	_invokeFn( fn){
		var next= value=> {
			var sink= this._sink
			if( sink){
				sink.event( this._scheduler.now(), value)
			}
		}
		var complete= value=> {
			var sink= this._sink
			if( sink){
				sink.end( this._scheduler.now(), value)
			}
			this._complete= true
			this._sink= null
			this._scheduler= null
		}
		var error= err=> {
			var sink= this._sink
			if( sink){
				sink.error( this._scheduler.now(), err)
			}
		}
		var unsubscribe= fn( next, complete, error)
		this._unsubscribe= unsubscribe
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
