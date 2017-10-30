var socket = io();
var verbose = true;

var Meshes = {},
    Materials = {},
    Sounds = {}

var canvas;
var engine;
var scene;
var camera;

var BulletConstructor = new BulletConstructor();
var BoxManager = new BoxManager();
var PlayerManager = new PlayerConstructor();

function Game() {
  canvas = document.getElementById("renderCanvas"); // Get the canvas element 
  engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
  scene = new BABYLON.Scene(engine);

  camera = new BABYLON.UniversalCamera('Camera', new BABYLON.Vector3(0, 200, 0), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  //camera.attachControl(canvas, true);
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(2, 10, 2);
  camera.checkCollisions = true;

  // Enable physics in the scene
  var gravityVector = new BABYLON.Vector3(0, 0, 0);
  var physicsPlugin = new BABYLON.OimoJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);    

  this.loadResources(this.onLoadingComplete.bind(this));

}

Game.prototype.captureKeys = function() {
  document.onkeydown = this.onKeyDown.bind(this),
  document.onkeyup = this.onKeyUp.bind(this)
}

Game.prototype.onKeyDown = function(e) {

  var inputToControlMap = {
    87: "W",
    68: "D",
    83: "S",
    65: "A",
    80: "P",
    39: "right",
    37: "left"
  }

  var keyPressed = inputToControlMap[e.keyCode];

  switch(keyPressed) {
    case "W":
      this.player.vZ = 0.4 * 0.98
      break;
    case "D":
      this.player.vX = 0.4 * 0.98
      break;
    case "S":
      this.player.vZ = -0.4 * 0.98
      break;
    case "A":
      this.player.vX = -0.4 * 0.98
      break;
    case "right":
      console.log("RIGHT")
      this.player.rotation.y += 0.1;
      break;
    case "left":
      this.player.rotation.y -= 0.1;
      break;
    case "P":
      camera = new BABYLON.UniversalCamera('Camera', new BABYLON.Vector3(0, 200, 0), scene);
      camera.setTarget(new BABYLON.Vector3(0,0,0));
      break;
    case "L":
      camera.parent = this.player;
      camera.rotation.x = 0;
      break;
    default:
      break;
  }
}

Game.prototype.onKeyUp = function() {
  this.player.vX = 0;
  this.player.vZ = 0;
  this.player.vY = 0;
}



function BoxManager() {

  this.list = {};

  this.create = function() {

    var size = 2;


    // create the box into the scene    
    var box = BABYLON.MeshBuilder.CreateBox('box', {
      height: size,
      width: size,
      depth: size 
    }, scene);

    box.id = Math.random();

    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 100000, restitution: 0.9 }, scene);


    box.material = Materials.woodenCrate;
    box.position = new BABYLON.Vector3(30, 0, 0);

    box.update = function() {
    }

    this.list[box.id] = box;
    return box;
  }

  this.update = function() {
    for(var id in this.list) {
      this.list[id].update();
    }
  }

}

Game.prototype.onLoadingComplete = function() {
  this.buildMap();
  EnemyManager.create(1);
  EnemyManager.list[1].position = new BABYLON.Vector3(1, 0, 5);
  var id = Math.random();
  this.player = PlayerManager.create(id);
  camera.parent = this.player;
  camera.position = new BABYLON.Vector3(0,0,0);
  camera.rotation.x = 0;
  

  socket.on("playerResponse", function(data) {

    for(var id in data) {
      if(!PlayerManager.list[id] && !EnemyManager.list[id]) {
        // if it is not a player, and enemy has not been created yet, create an enemy at position
        EnemyManager.create(id)
      } else if(EnemyManager.list[id]) {
        EnemyManager.list[id].position.x = data[id].x;
        EnemyManager.list[id].position.y = data[id].y;
        EnemyManager.list[id].position.z = data[id].z;
      }
    }
  })


  
  engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene    
    this.captureKeys();
    BulletConstructor.update();
    PlayerManager.update();
    scene.render();
  }.bind(this));
  window.addEventListener("resize", function () { // Watch for browser/canvas resize events
    engine.resize();
  });
  var decalSize = new BABYLON.Vector3(0.1, 0.1, 0.1);
  window.addEventListener("click", function(e) {
    var bullet = BulletConstructor.create(scene);


  })
}

Game.prototype.loadResources = function(e) {
  // Wooden Crate
  Materials.woodenCrate = new BABYLON.StandardMaterial("woodenCrate", scene);
  Materials.woodenCrate.diffuseTexture = new BABYLON.Texture("./textures/woodenCrate.jpg", scene);
  // Red Material
  Materials.redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
  Materials.redMaterial.diffuseColor = new BABYLON.Color3(255, 0, 0);
  // Blue Material
  Materials.blueMaterial = new BABYLON.StandardMaterial("blueMaterial", scene);
  Materials.blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 255);
  // Green Material 
  Materials.greenMaterial = new BABYLON.StandardMaterial("greenMaterial", scene);
  Materials.greenMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  // Black Material 
  Materials.blackMaterial = new BABYLON.StandardMaterial("blackMaterial", scene);
  Materials.blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  // Bullet Hole Material
  Materials.bulletHoleMaterial = new BABYLON.StandardMaterial("bulletHoleMaterial", scene);
  Materials.bulletHoleMaterial.diffuseTexture = new BABYLON.Texture("./textures/impact.png", scene);
  Materials.bulletHoleMaterial.diffuseTexture.hasAlpha = true; 
  Materials.bulletHoleMaterial.zOffset = -2;
  // Brick Material
  Materials.brickMaterial = new BABYLON.StandardMaterial(name, scene);
  var brickTexture = new BABYLON.BrickProceduralTexture(name + "text", 512, scene);
  brickTexture.numberOfBricksHeight = 60;
  brickTexture.numberOfBricksWidth = 100;
  Materials.brickMaterial.diffuseTexture = brickTexture;
  // Grass Material
  Materials.grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
  var grassTexture = new BABYLON.GrassProceduralTexture(name + "textbawl", 256, scene);
  Materials.grassMaterial.ambientTexture = grassTexture;

  e();
}

Game.prototype.buildMap = function() {
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

  // Create World Axis
  // world axis visualization
  var size = 10;
  var worldOrigin = BABYLON.Vector3.Zero();
  var xAxis = BABYLON.Mesh.CreateLines("x", [worldOrigin, (BABYLON.Axis.X).scale(size)], scene);
  var yAxis = BABYLON.Mesh.CreateLines("y", [worldOrigin, (BABYLON.Axis.Y).scale(size)], scene);
  var zAxis = BABYLON.Mesh.CreateLines("z", [worldOrigin, (BABYLON.Axis.Z).scale(size)], scene);
  xAxis.color = BABYLON.Color3.Red();
  yAxis.color = BABYLON.Color3.Green();
  zAxis.color = BABYLON.Color3.Blue();

  // Create the ground plane
  var o = BABYLON.Mesh.CreatePlane("ground", 100, scene);
  o.position.y = -1;
  o.rotation.x = Math.PI / 2;
  o.physicsImposter = new BABYLON.PhysicsImpostor(o, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  o.checkCollisions = true;
  o.material = Materials.grassMaterial;

  // Create a big wall

  var wall1 = BABYLON.MeshBuilder.CreateBox('box', {
    height: 10,
    width: 100,
    depth: 1 
  }, scene);

  wall1.position.z -= 50;
  wall1.material = Materials.brickMaterial;
  wall1.checkCollisions = true;

  var wall2 = BABYLON.MeshBuilder.CreateBox('box', {
    height: 10,
    width: 100,
    depth: 1 
  }, scene);
  wall2.checkCollisions = true;

  wall2.rotation.y = Math.PI / 2;
  wall2.position.x -= 50;
  wall2.material = Materials.brickMaterial;

  var wall3 = BABYLON.MeshBuilder.CreateBox('box', {
    height: 10,
    width: 100,
    depth: 1 
  }, scene);
  wall3.checkCollisions = true;

  wall3.rotation.y = Math.PI / 2;
  wall3.position.x += 50;
  wall3.material = Materials.brickMaterial;

  var wall4 = BABYLON.MeshBuilder.CreateBox('box', {
    height: 10,
    width: 100,
    depth: 1 
  }, scene);
  wall4.checkCollisions = true;
  wall4.position.z += 50;
  wall4.material = Materials.brickMaterial;


  

  // Create a box
  for(var i = 0; i < 5; i++) {
    var box = BoxManager.create();
    box.position.x += (i * 30);
  }

    //Using a procedural texture to create the sky
    var boxCloud = BABYLON.Mesh.CreateSphere("boxCloud", 100, 1000, scene);
    boxCloud.position = new BABYLON.Vector3(0, 0, 12);
    var cloudMaterial = new BABYLON.StandardMaterial("cloudMat", scene);
    var cloudProcText = new BABYLON.CloudProceduralTexture("cloud", 1024, scene);
    cloudMaterial.emissiveTexture = cloudProcText;
    cloudMaterial.backFaceCulling = false;
    cloudMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    boxCloud.material = cloudMaterial;
  
}


var game = new Game;
