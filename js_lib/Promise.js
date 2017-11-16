/*
function Promise(fn){

	var value = null, deferreds = [];
	var state = 'pending';
	function resolve(newValue){
		value = newValue;
		state = 'fulfilled';
		setTimeout(function(){
			deferreds.forEach(function(deferred){
			deferred(value);
		});
		}, 0);
		
	}

	this.then = function(onFulfilled){
		if(state == 'pending'){
			deferreds.push(onFulfilled);
			return this;
		}
		onFulfilled(value);
		return this;
	}
	fn(resolve);
}


var myPromise = new Promise(function(resolve){

	setTimeout(function(){
		resolve('fly');
	}, 1000);
});

myPromise.then(function(value){
	console.log(value);
	return new Promise(function(resolve){
		resolve('pxk');
	});

}).then(function(value){
	console.log(value);
});*/

/*----------------  new version , complish the Chain of Promise!----------------*/
function Promise(fn){

	var value = null, deferreds = [];
	var state = 'pending';
	function resolve(newValue){
		if(newValue && (typeof newValue == 'object' || typeof newValue == 'function')){
			var then = newValue.then;
			if(typeof then == 'function'){
				then.call(value, resolve);
				return;
			}
		}

		value = newValue;
		state = 'fulfilled';
		setTimeout(function(){
			deferreds.forEach(function(deferred){
			handle(deferred);
		});
		}, 0);
		
	}

	this.then = function(onFulfilled){
		return new Promise(function(resolve){
			handle({
				onFulfilled: onFulfilled || null,
				resolve: resolve
			});
		});
	}

	function handle(onFulfilled){
		if(state == 'pending'){
			deferreds.push(onFulfilled);
			return;
		}
		var ret = onFulfilled.onFulfilled(value);
		onFulfilled.resolve(ret);
		return;
	}

	fn(resolve);
}



var myPromise = new Promise(function(resolve){

	setTimeout(function(){
		resolve('fly');
	}, 1000);
});

myPromise.then(function(value){
	console.log(value);
	return new Promise(function(resolve){
		resolve('pxk');
	});

}).then(function(value){
	console.log(value);
});
