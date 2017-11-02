function PlayerConstructor() {
  this.list = {}
  this.create = function(id) {
    console.log("Creating player " + id);
    // create the box into the scene    
    var player = BABYLON.MeshBuilder.CreateBox('player', {
      height: 2,
      width: 2,
      depth: 2
    }, scene);

    player.vX = 0.1;
    player.vY = 0.1;
    player.vZ = 0.1;

    player._position = {
      x: 0,
      y: 0,
      z: 0
    }


    // collisions
    player.checkCollisions = false;
    player.applyGravity = false;

    player.camera = camera;

  

    player.update = function() {
      if(this.pressingW) {
        player._position.z += player.vZ;
      }

      if(this.pressingS) {
        player._position.z -= player.vZ;
      }

      if(this.pressingA) {
        player._position.x -= player.vX;
      }

      if(this.pressingD) {
        player._position.x += player.vX;
      }

      if(this.pressingRight) {
        player._rotation.y += 0.01;
      }

      if(this.pressingLeft) {
        player._rotation.y -= 0.01;
      }

      socket.emit('playerUpdate', {
        id: player.id,
        vector3: player._position,
        rotation: player._rotation
      })
      //player.position.y += player.vY;
      //player.position.z += player.vZ;
    }

    // give the player an id
    player.id = id;

    socket.emit('playerCreate', {
      id: player.id
      //vector3: player.position,
      //rotation: player.rotation
    })


    //player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, restitution: 0.9 }, scene);
    // Put player into the list of players 
    this.list[player.id] = player;
    this.mainPlayer = player;
    return player;
  }

  this.update = function() {

  }
}

function EnemyManager() {
  this.list = {};

  this.create = function(id) {
    // Create an enemy
    var enemy = BABYLON.MeshBuilder.CreateBox('enemy', {
      height: 2,
      width: 2,
      depth: 2
    }, scene);

    // Give the enemy an ID
    enemy.id = id;

    this.list[enemy.id] = enemy;
    return enemy;
  }
}

var PlayerManager = new BulletConstructor();
var EnemyManager = new EnemyManager();