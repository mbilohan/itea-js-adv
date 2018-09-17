String.prototype.encode = function(k) {
    if(this === undefined) {
        return;
    }

    if(k <= 0 || k >= 20) {
        console.log('Key is invalid!');
        return;
    }

    var newStr = '';

    for(var i = 0; i < this.length; i++) {
        newStr += String.fromCharCode(this.charCodeAt(i) + k);
    }

    return newStr;
}

String.prototype.decode = function(k) {
    if(this === undefined) {
        return;
    }

    if(k <= 0 || k >= 20) {
        console.log('Key is invalid!');
        return;
    }

    var newStr = '';

    for(var i = 0; i < this.length; i++) {
        newStr += String.fromCharCode(this.charCodeAt(i) - k);
    }

    return newStr;
}


var encodedStr = "abc".encode(2);
console.log(encodedStr);

var decodedStr = encodedStr.decode(2);
console.log(decodedStr);


var encodedStr = "Hello world!".encode(6);
console.log(encodedStr); // "Nkrru&}uxrj'"

//---------------------------------------------------------------

var decodedStr1 = encodedStr.decode(3);
console.log(decodedStr1); // "Khoor#zruog$"

//---------------------------------------------------------------

var decodedStr2 = encodedStr.decode(6);
console.log(decodedStr2); // "Hello world!"