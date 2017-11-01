var port = process.env.PORT || 3000;
var express = require('express')
var app = express()
var server = require('http').Server(app);
var sio = require('socket.io').listen(server)
var verbose = true;




app.use(express.static('./'))

app.get('/', function (req, res) {
  res.render('index.html');
})



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
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

  maxSpeed = 1;
  velocity = 0.1;

  client.on('keyDown', function(data) {
    if(data.key == 'w') {
      //playerList[data.id].x += 1
      playerList[data.id].pressingW = true;
    }

    if(data.key == 's') {
      //playerList[data.id].x -= 1;
      playerList[data.id].pressingS = true;
    }

    if(data.key == 'a') {
      playerList[data.id].z += 1;
    }

    if(data.key =='d') {
      playerList[data.id].z -= 1;
    }
  })

  client.on('keyUp', function(data) {
    console.log(data)
    if(data.key == 'w') {
      //playerList[data.id].x += 1
      playerList[data.id].pressingW = false;
    }

    if(data.key == 's') {
      //playerList[data.id].x -= 1;
      playerList[data.id].pressingS = false;
    }

    if(data.key == 'a') {
      playerList[data.id].z += 1;
    }

    if(data.key =='d') {
      playerList[data.id].z -= 1;
    }
  })

  function updateAll() {
    for(id in playerList) {
      if(playerList[id].pressingW) {
        playerList[id].x += 0.15;
      } else {
        //playerList[id].x = 0;
      }

      if(playerList[id].pressingS) {
        playerList[id].x -= 0.15;
      } else {
        playerList[id].x += 0;
      }

    }
  }



  var lastUpdateTime = (new Date()).getTime();
  setInterval(function() {
    var currentTime = (new Date()).getTime();
    var dt = currentTime - lastUpdateTime;
    updateAll();
    client.emit("playerResponse", playerList);
    
  }, 1000/60);



})

