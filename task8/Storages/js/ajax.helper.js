var aj = (function() {
    var apiHost = 'http://localhost:1111';

    return {
        get: get
    };

    function get(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiHost + url);

        xhr.onreadystatechange = function(event) {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    }

}())