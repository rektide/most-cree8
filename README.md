# Most-Cree8

> An alternative to most-create

This is a very short condensed implementation of the "create" stream/observable creation pattern for Mostjs. It does not follow most of the normal Most decorum, as I still don't understand the traditional (but undocumented) ceremonies and class hierarchies of [most/core](https://github.com/mostjs/core), but it should be reasonably complete and speedy.

Unlike [@most/create](https://github.com/mostjs/create), this implementation will by-default immediately, synchronously call the creation function. Added values and errors will be ignored however until the the observable becomes observed, but it can significantly reduce code complexity by passing these methods immediately (alike how `new Promise(...)` does).

# API

```
var add
var stream= new MostCree8(function(_add, end, error){
	add= _add
	add("ignored") // this will be ignored since no one is subscribed to this stream while it is being created
})
add("ignored") // this will be ignored since the stream is still not subscribed to
stream.forEach(console.log)
add(1) //=> 1
```

Alternatively one can request the creation function not be called until it is observed:

```
var add
var stream= new MostCree8( function( _add, end, error){
	add= _add
	add( 1) //=> 1
	process.nextTick(_ => add(3)) //=> 3
}, true) // true here says to defer running the function until there is an observer
add && add( "ignored") || console.log( "not created yet") //=> not created yet, as add has not been set/create function has not been called
stream.forEach( console.log)
add( 2) //=> 2
```
