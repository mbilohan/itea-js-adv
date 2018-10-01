(function() {
    var result = document.getElementById('result');
    var worker = new Worker('worker.js');

    worker.onmessage = function(e) {
        result.innerHTML = e.data;
    }

    worker.postMessage(234);

}())