var gitapi = (function() {

    return {
        send: sendRequest
    };

    function sendRequest(httpMethod, url, callback) {
        var xhr = new XMLHttpRequest();
        var specifiedUrl = Settings.git.apiUrl + url + '?client_id=' + Settings.git.clientID + '&client_secret=' + Settings.git.clientSecret;

        xhr.open(httpMethod, specifiedUrl, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    }
}())