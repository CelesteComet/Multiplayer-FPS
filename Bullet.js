function BulletConstructor() {
  this.list = {};

  this.create = function() {
    var size = 0.2;


    // create the box into the scene    
    var bullet = BABYLON.MeshBuilder.CreateBox('bullet', {
      height: size,
      width: size,
      depth: size
    }, scene);
    var camera = scene.cameras[0];
    var decalSize = new BABYLON.Vector3(0.4,0.4,0.4);

    var ray = new BABYLON.Ray(camera.globalPosition, camera.getTarget().subtract(camera.globalPosition).normalize());
    var pickInfo = scene.pickWithRay(ray);
    
    if(pickInfo.pickedPoint && pickInfo.pickedMesh.name != 'bullet') {
      var decal = BABYLON.MeshBuilder.CreateDecal("decal", pickInfo.pickedMesh, {position: pickInfo.pickedPoint, normal: pickInfo.getNormal(true), size: decalSize});
      decal.material = Materials.bulletHoleMaterial;
    }

    // give the bullet a position
    
    var origin = scene.cameras[0].position.clone();
    bullet.position = origin;
    var ray = new BABYLON.Ray(camera.globalPosition, camera.getTarget().subtract(camera.globalPosition).normalize());
    var pickInfo = scene.pickWithRay(ray);
    var direction = camera._transformedReferencePoint;
    bullet.id = Math.random();
    bullet.vX = direction.x;
    bullet.vY = direction.y;
    bullet.vZ = direction.z;

    bullet.speed = 10;

    // give the bullet a black color
    bullet.material = Materials.blackMaterial;
    bullet.wireframe = true;
    // Register physics with crates

    bullet.update = function() {
      for(var i in BoxManager.list) {
        var box = BoxManager.list[i];
        
        if(bullet.intersectsMesh(box)) {



          box.material = new BABYLON.StandardMaterial("color", scene);
          box.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        }
      }
      bullet.position.x += bullet.vX * bullet.speed;
      bullet.position.y += bullet.vY * bullet.speed;
      bullet.position.z += bullet.vZ * bullet.speed;

    }

    this.list[bullet.id] = bullet;
  }

  this.update = function() {
    for(var id in this.list) {
      this.list[id].update();
    }
  }
}

var BulletManager = new BulletConstructor();