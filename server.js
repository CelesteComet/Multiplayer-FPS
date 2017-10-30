var express = require('express')
var app = express()
var server = require('http').Server(app);
var sio = require('socket.io').listen(server)
var verbose = true;




app.use(express.static('./'))

app.get('/', function (req, res) {
  res.render('index.html');
})



server.listen(8081, () => {
  console.log("Listening on port 8081")
})


var playerList = {};

sio.sockets.on('connection', function(client) {

  client.id = Math.random();

  if(verbose) {
    console.log(`Client ${client.id} connected`)
  }

  

  client.on('playerUpdate', function(data) {
    playerList[data.id] = data.vector3;
  })



  var lastUpdateTime = (new Date()).getTime();
  setInterval(function() {
    var currentTime = (new Date()).getTime();
    var dt = currentTime - lastUpdateTime;
    client.emit("playerResponse", playerList);
    
  }, 1000/60);



})

