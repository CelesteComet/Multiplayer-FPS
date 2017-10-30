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

    //debugger;
    



    // collisions
    player.checkCollisions = false;
    player.applyGravity = false;

    player.camera = camera;

    

    player.update = function() {
      var camPosition = camera.position.clone();
      camPosition.y -= 10;
      player.position = camPosition;
    }

    // give the player an id
    player.id = id;


    //player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, restitution: 0.9 }, scene);
    // Put player into the list of players 
    this.list[player.id] = player;

    return player;
  }

  this.update = function() {
    for(var i in this.list) {
      this.list[i].update();
      socket.emit('playerUpdate', {
        id: i,
        vector3: this.list[i].camera.position
      })
    }

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