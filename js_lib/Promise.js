

function Promise(fn){

	var value = null, deferreds = [], state = 'pending';

	this.then = function(onFulfilled){
		return new Promise(function(resolve){
			handle({
				onFulfilled: onFulfilled || null,
				resolve: resolve
			});
		});
	};

	function handle(deferred){
		if(state == 'pending'){
			deferreds.push(deferred);
			return;
		}
		var ret = deferred.onFulfilled(value);
		deferred.resolve(ret);
	}

	function resolve(newValue){
		if(newValue && (typeof(newValue) =='object' || typeof(newValue) =='function')){
			var then = newValue.then;
			if(typeof then == 'function'){
				then.call(newValue, resolve);
				return;
			}
		}
		state = 'fulfilled';
		value = newValue;
		setTimeout(function(){
			deferreds.forEach(function(deferred){
				handle(deferred);
			});
		}, 0);
	}

	fn(resolve);
}

var myPromise = new Promise(function(resolve){
	setTimeout(function(){
		resolve("fly");
	}, 3000);
});

myPromise.then(function(data){
	alert(data);
});
myPromise.then(function(value){
    console.log(value);
    return new Promise(function(resolve){
        resolve("second promise");
    })
}).then(function(data){
	alert(data);
});
