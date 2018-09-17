var f = function(arg) {
    console.log(arg);
}

Function.prototype.go = function(times, ms, callback) {
    var self = this;
    for(let i = 0; i < times; i++) {
        var f = function() {
            self.call(null, i);
            if(i === times - 1) {
                callback();
            }
        }
        setTimeout(f, ms * (i+1));
    }
}

f.go(5, 2000, () => console.log('finish'));