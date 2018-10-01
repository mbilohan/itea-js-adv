self.onmessage = function(e) {

    var resultOfCalcs = hardCalculations(e.data);
    self.postMessage(resultOfCalcs);
}

function hardCalculations(intArg) {
    var sum = intArg;
    for(var i = 0; i < 1000; i++) {
        for(var j = 0; j < 2000; j++) {
            for(var k = 0; k < 3000; k++) {
                sum += j*k*(i+1);
            }
        }
    }

    return sum;
}