var BoxConstructor = function() {
  this.list = {};


  var size = 2;
  this.create = function(scene) {

    // create the box into the scene    
    var newBox = BABYLON.MeshBuilder.CreateBox('box', {
      height: size,
      width: size,
      depth: size
    }, scene);

    // give the box an id
    newBox.id = Math.random();

    
    

    // Apply material to box
    newBox.material = Materials.woodenCrate;

    newBox.physicsImpostor = new BABYLON.PhysicsImpostor(newBox, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1, restitution: 0.9 }, scene);
    // Put newBox into the list of boxes
    this.list[newBox.id] = newBox;

    return newBox;
  }

  this.update = function() {




    
    for(var id in BulletConstructor.list) {
      var bullet = BulletConstructor.list[id];
      for(var id in BoxConstructor.list) {
        var box = BoxConstructor.list[id];
        if(bullet.intersectsMesh(box)) {
          var decal = BABYLON.MeshBuilder.CreateDecal("decal", box, {position: bullet.position, size: decalSize});
          decal.material = decalMaterial;
          bullet.dispose();
        }
      }
    }
    
  }
}

var BoxConstructor = new BoxConstructor();