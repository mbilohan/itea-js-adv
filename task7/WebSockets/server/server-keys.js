var webSocketsServerPort = 8080;

var wsServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function(request, response) { });
server.listen(webSocketsServerPort, function() {
    console.log((new Date()).toTimeString() + " Server is listening on port " +
        webSocketsServerPort);
});
var wsServer = new wsServer({
    httpServer: server
});
wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);

	connection.on('message', function(message) {

		var i = 0;
		var clientObj = message.utf8Data;
		console.log("===============================");
		console.log(clientObj);
		console.log("===============================");
		
		var interval = setInterval(()=>{
			
			var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
			if(i !== 10)
				connection.sendUTF(letter);
			else 
				clearInterval(interval);
			i++;
		}, 2000);
		
	});
});

var alphabet = 'abcdefghijklmnopqrstuvwxyz';