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

  client.on('playerCreate', function(data) {
    playerList[data.id] = {
      vector3: null,
      rotation: null
    };
  })

  client.on('playerUpdate', function(data) {
    console.log(playerList)
    playerList[data.id] = data.vector3;
    playerList[data.id].rotation = {x: 0, y: 0, z: 0}
    client.emit("playerResponse", playerList);
  })

  maxSpeed = 1;
  velocity = 0.1;
  getInput = false;

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
      playerList[data.id].pressingA = true;
    }

    if(data.key =='d') {
      playerList[data.id].pressingD = true;
    }

    if(data.key =='right') {
      playerList[data.id].pressingRight = true;
    }

    if(data.key =='left') {
      playerList[data.id].pressingLeft = true;
    }
    
  })

  client.on('keyUp', function(data) {
    
    if(data.key == 'w') {
      //playerList[data.id].x += 1
      playerList[data.id].pressingW = false;
    }

    if(data.key == 's') {
      //playerList[data.id].x -= 1;
      playerList[data.id].pressingS = false;
    }

    if(data.key == 'a') {
      playerList[data.id].pressingA = false;
    }

    if(data.key =='d') {
      playerList[data.id].pressingD = false;
    }

    if(data.key =='right') {
      playerList[data.id].pressingRight = false;
    }

    if(data.key =='left') {
      playerList[data.id].pressingLeft = false;
      //playerList[data.id].rotation = data.rotation;
    }
    
  })

  function updateAll() {

    for(id in playerList) {

      if(playerList[id].pressingW) {
        console.log(playerList[id].rotation.y)
        playerList[id].x += (0.15 * Math.sin(playerList[id].rotation.y))
        playerList[id].z += (0.15 * Math.cos(playerList[id].rotation.y));
      } else {
        playerList[id].x += 0;
      }

      if(playerList[id].pressingS) {
        playerList[id].x -= (0.15 * Math.sin(playerList[id].rotation.y))
        playerList[id].z -= (0.15 * Math.cos(playerList[id].rotation.y));
      } else {
        playerList[id].x += 0;
      }


/*
      if(playerList[id].pressingRight) {
        playerList[id].rotation.y += 0.01;
      } else {
        playerList[id].rotation.y += 0;
      }

      if(playerList[id].pressingLeft) {
        playerList[id].rotation.y -= 0.01;
      } else {
        playerList[id].rotation.y -= 0;
      }
*/
    }
  }



  var lastUpdateTime = (new Date()).getTime();
  setInterval(function() {
    var currentTime = (new Date()).getTime();
    var dt = currentTime - lastUpdateTime;
    
    //updateAll();

    
    
  }, 1000/1000);



})

