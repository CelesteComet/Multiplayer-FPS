"use strict";
function BulletActor(e) {
    this.bullet = e,
    this.mesh = Meshes.bullet.createInstance(""),
    this.mesh.setEnabled(!1)
}
function loadResources(e) {
    function t() {
        ++n == o.length && e()
    }
    Materials.bullet = new BABYLON.StandardMaterial("bulletMaterial",scene),
    Materials.bullet.emissiveColor = new BABYLON.Color3(1,1,1);
    var a = ["#define RECEIVESHADOWS"];
    engineCaps.textureFloat && a.push("#define SHADOWFULLFLOAT"),
    Materials.standardShadow = new BABYLON.ShaderMaterial("",scene,"./standard",{
        attributes: ["position", "normal", "color", "uv"],
        uniforms: ["world", "view", "viewProjection", "vFogInfos", "vFogColor"],
        defines: a
    }),
    Materials.standardShadow.setTexture("shadowSampler", shadowGen.getShadowMapForRendering()),
    Materials.standardShadow.setMatrix("shadowLightMat", shadowGen.getTransformMatrix()),
    Materials.standardShadow.setVector3("shadowParams", shadowGen.getDarkness(), shadowGen.getShadowMap().getSize().width, shadowGen.bias),
    Materials.standardShadow.onBind = function(e) {
        var t = Materials.standardShadow.getEffect();
        t.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity),
        t.setColor3("vFogColor", scene.fogColor),
        t.setMatrix("worldView", e.getWorldMatrix())
    }
    ,
    a.push("#define DIRT"),
    Materials.map = new BABYLON.ShaderMaterial("",scene,"./standard",{
        attributes: ["position", "normal", "color", "uv"],
        uniforms: ["world", "view", "viewProjection", "vFogInfos", "vFogColor"],
        defines: a
    }),
    Materials.map.setTexture("shadowSampler", shadowGen.getShadowMapForRendering()),
    Materials.map.setMatrix("shadowLightMat", shadowGen.getTransformMatrix()),
    Materials.map.setVector3("shadowParams", shadowGen.getDarkness(), shadowGen.getShadowMap().getSize().width, shadowGen.bias),
    Materials.map.onBind = function(e) {
        var t = Materials.map.getEffect();
        t.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity),
        t.setColor3("vFogColor", scene.fogColor),
        t.setMatrix("worldView", e.getWorldMatrix())
    }
    ,
    Materials.standard = new BABYLON.ShaderMaterial("",scene,"./standard",{
        attributes: ["position", "normal", "color", "uv"],
        uniforms: ["world", "view", "viewProjection", "vFogInfos", "vFogColor"]
    }),
    Materials.standard.onBind = function(e) {
        var t = Materials.standard.getEffect();
        t.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity),
        t.setColor3("vFogColor", scene.fogColor),
        t.setMatrix("worldView", e.getWorldMatrix())
    }
    ,
    Materials.eggShell = new BABYLON.ShaderMaterial("",scene,"./standard",{
        attributes: ["position", "normal", "color", "uv"],
        uniforms: ["world", "view", "viewProjection", "vFogInfos", "vFogColor", "hp"],
        defines: ["#define EGGSHELL"]
    }),
    Materials.eggShell.onBind = function(e) {
        var t = Materials.eggShell.getEffect();
        t.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity),
        t.setColor3("vFogColor", scene.fogColor),
        t.setMatrix("worldView", e.getWorldMatrix()),
        t.setFloat("hp", e.player.hp / 100)
    }
    ,
    Materials.wireframe = new BABYLON.StandardMaterial("",scene),
    Materials.wireframe = !0,
    Materials.normalBackface = new BABYLON.StandardMaterial("",scene),
    Materials.normalBackface.diffuseColor = new BABYLON.Color3(.5,.5,.5),
    Materials.normalBackface.ambientColor = new BABYLON.Color3(.5,.5,.5),
    Materials.normalBackface.specularColor = new BABYLON.Color3(0,0,0),
    Materials.normalBackface.backFaceCulling = !1,
    Materials.normalBackface.twoSidedLighting = !0,
    Materials.muzzleFlash = new BABYLON.StandardMaterial("",scene),
    Materials.muzzleFlash.emissiveColor = BABYLON.Color3.White(),
    Materials.ui = new BABYLON.StandardMaterial("ui",scene),
    Materials.ui.disableLighting = !0,
    Materials.ui.emissiveColor = BABYLON.Color3.White(),
    Materials.ui.fogEnabled = !1,
    Materials.eggWhite = new BABYLON.StandardMaterial("eggWhite",scene),
    Materials.eggWhite.disableLighting = !0,
    Materials.eggWhite.alpha = .8,
    Materials.eggWhite.emissiveColor = BABYLON.Color3.White(),
    Materials.eggYolk = new BABYLON.StandardMaterial("eggYolk",scene),
    Materials.eggYolk.disableLighting = !0,
    Materials.eggYolk.emissiveColor = BABYLON.Color3.White(),
    Meshes.map = [[], [], [], [], []],
    Meshes.map[1].push(null);
    var n = 0
      , o = [loadMeshes(["egg", "eggExplode", "bullet", "tile", "muzzleFlash", "ammo", "reticle", "mountains", "sky"], Meshes, !1, t), loadMeshes(["container", "containerOrange", "containerBlue", "blockWall"], Meshes.map[1], !0, t), loadMeshes(["stairs"], Meshes.map[2], !0, t), loadMeshes(["tree"], Meshes.map[3], !0, t), loadMeshes(["barricade"], Meshes.map[4], !0, t)]
      , i = {
        spatialSound: !0,
        distanceModel: "inverse"
    };
    Sounds.eggk47 = {
        fire: new BABYLON.Sound("fire","sound/eggk47/fire.mp3",scene,null,i),
        dryFire: new BABYLON.Sound("dryFire","sound/eggk47/dry fire.mp3",scene,null,i),
        cycle: new BABYLON.Sound("cycle","sound/eggk47/full cycle.mp3",scene,null,i),
        insertMag: new BABYLON.Sound("insertMag","sound/eggk47/insert mag.mp3",scene,null,i),
        removeMag: new BABYLON.Sound("removeMag","sound/eggk47/remove mag.mp3",scene,null,i)
    },
    Sounds.dozenGauge = {
        fire: new BABYLON.Sound("fire","sound/dozenGauge/fire.mp3",scene,null,i),
        open: new BABYLON.Sound("open","sound/dozenGauge/open.mp3",scene,null,i),
        load: new BABYLON.Sound("load","sound/dozenGauge/load.mp3",scene,null,i),
        close: new BABYLON.Sound("close","sound/dozenGauge/close.mp3",scene,null,i)
    },
    Sounds.csg1 = {
        fire: new BABYLON.Sound("fire","sound/csg1/fire.mp3",scene,null,i),
        pullAction: new BABYLON.Sound("pullAction","sound/csg1/pull action.mp3",scene,null,i),
        releaseAction: new BABYLON.Sound("releaseAction","sound/csg1/release action.mp3",scene,null,i)
    },
    Sounds.cluck9mm = {
        fire: new BABYLON.Sound("fire","sound/cluck9mm/fire.mp3",scene,null,i),
        removeMag: new BABYLON.Sound("removeMag","sound/cluck9mm/remove mag.mp3",scene,null,i),
        insertMag: new BABYLON.Sound("insertMag","sound/cluck9mm/insert mag.mp3",scene,null,i)
    },
    Sounds.hammerClick = new BABYLON.Sound("hammerClick","sound/hammerClick.mp3",scene),
    Sounds.ammo = new BABYLON.Sound("ammo","sound/ammo.mp3",scene),
    Sounds.shellBurst = new BABYLON.Sound("","sound/shellBurst.mp3",scene,null,i),
    Sounds.hit = new BABYLON.Sound("hit","sound/hit.mp3",scene,null,i),
    Sounds.death = [];
    for (var s = 1; s < 11; s++)
        Sounds.death.push(new BABYLON.Sound("","sound/death/scream" + s + ".mp3",scene,null,i))
}
function loadMeshes(e, t, a, n) {
    function o() {
        console.log("Loading: " + e[r]),
        BABYLON.SceneLoader.ImportMesh("", "models/", e[r] + ".babylon", scene, function(e, l, h) {
            for (var c = 0; c < e.length; c++) {
                var d = e[c];
                d.setEnabled(!1),
                d.setMaterial(Materials.standard),
                d.isPickable = !1,
                a ? t.push(d) : t[d.name] = d
            }
            r++,
            0 == --i ? n && n.call(s) : o()
        })
    }
    var i = e.length
      , s = this
      , r = 0;
    o()
}
function setupLights() {
    scene.ambientColor = new BABYLON.Color3(.2,.2,.2),
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP,
    scene.fogColor = new BABYLON.Color4(.5,.7,.9,1),
    scene.fogDensity = .025,
    scene.clearColor = new BABYLON.Color3(.7,.9,1),
    scene.clearColor = BABYLON.Color3.White();
    var e = new BABYLON.DirectionalLight("light1",new BABYLON.Vector3(0,-1,0),scene);
    e.intensity = 1.2,
    e.autoUpdateExtends = !1;
    var t = new BABYLON.HemisphericLight("light2",new BABYLON.Vector3(-.25,1,-.5),scene);
    return t.intensity = .8,
    (t = new BABYLON.HemisphericLight("light3",new BABYLON.Vector3(0,-1,0),scene)).intensity = .25,
    shadowGen = new BABYLON.ShadowGenerator(1024,e),
    shadowGen.frustumEdgeFalloff = 1,
    e.shadowMinZ = .1,
    e.shadowMaxZ = 40,
    e.shadowFrustumSize = 15,
    e
}
function beginAnimation(e, t, a, n, o) {
    scene.beginAnimation(e, t, a, n, o);
    for (var i = e.getChildMeshes(), s = 0; s < i.length; s++)
        scene.beginAnimation(i[s], t, a, n, o)
}
function Game(e, t, a, n, o, i) {
    this.ws = e,
    this.meId = t,
    this.players = {},
    this.keyIsDown = {},
    this.map = GameMap.generateMap(a, n, o, i),
    this.inputTally = "WASDER ",
    respawnTime = 0,
    gameStartTime = Date.now(),
    nextPingSample = Date.now() + 1e3,
    engine.clear(BABYLON.Color3.Black()),
    engine.stopRenderLoop(),
    document.getElementById("GAME").style.display = "block",
    document.getElementById("gameCanvasContainer").appendChild(canvas),
    document.getElementById("homeButton").style.visibility = "visible",
    engine.resize(),
    scene = new BABYLON.Scene(engine),
    this.light = setupLights(),
    this.camera = new BABYLON.TargetCamera("camera",BABYLON.Vector3.Zero(),scene),
    scene.activeCameras.push(this.camera),
    this.camera.maxZ = 1e3,
    this.camera.fov = 1.25,
    this.camera.minZ = .08,
    this.uiCamera = new BABYLON.FreeCamera("uiCamera",new BABYLON.Vector3(0,0,-1),scene),
    this.uiCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA,
    this.uiCamera.layerMask = 536870912,
    scene.activeCameras.push(this.uiCamera);
    var s = this;
    window.addEventListener("resize", function() {
        engine.resize(),
        s.resizeGame()
    }),
    window.onfocus = function() {
        lastTimeStamp = Date.now()
    }
    ,
    window.onblur = function() {
        document.exitPointerLock()
    }
    ,
    loadResources(this.onLoadingComplete.bind(this))
}
function HitIndicator(e) {
    this.game = e,
    this.mesh = new BABYLON.Mesh("hitIndicator",scene),
    this.mesh.updatable = !0,
    this.mesh.hasVertexAlpha = !0,
    this.positions = [0, 0, 0, 0, .5, 0, .5, .5, 0, .5, 0, 0, .5, -.5, 0, 0, -.5, 0, -.5, -.5, 0, -.5, 0, 0, -.5, .5, 0];
    var t = [0, 1, 8, 0, 2, 1, 0, 2, 1, 0, 3, 2, 0, 3, 2, 0, 4, 3, 0, 4, 3, 0, 5, 4, 0, 5, 4, 0, 6, 5, 0, 6, 5, 0, 7, 6, 0, 7, 6, 0, 8, 7, 0, 8, 7, 0, 1, 8];
    this.colors = new Array(48).fill(0);
    for (var a = 0; a < 48; a += 4)
        this.colors[a] = 1,
        this.colors[a + 1] = .9,
        this.colors[a + 2] = 0,
        this.colors[a + 3] = -.5;
    var n = new BABYLON.VertexData;
    n.positions = this.positions,
    n.indices = t,
    n.colors = this.colors,
    n.applyToMesh(this.mesh, !0),
    this.mesh.layerMask = 536870912,
    this.mesh.material = Materials.ui,
    this.resize()
}
function Reticle(e) {
    this.game = e,
    this.mesh = new BABYLON.AbstractMesh("reticle",scene),
    this.lines = [];
    for (var t = 0; t < 4; t++) {
        var a = Meshes.reticle.clone("reticleLine", this.mesh);
        a.parent = this.mesh,
        a.scaling = new BABYLON.Vector3(1,1,1),
        a.rotation.z = t * Math.PI / 2,
        this.lines.push(a)
    }
    this.mesh.setLayerMask(536870912),
    this.mesh.setMaterial(Materials.ui)
}
function Eggk47Actor(e) {
    this.gun = e,
    this.playerActor = e.player.actor,
    this.gunMesh = Meshes.eggk47.clone("eggk47", this.playerActor.gunContainer),
    this.gunMesh.setEnabled(!1),
    this.clipMesh = Meshes.eggk47Mag.clone("eggk47Mag", this.playerActor.gunContainer),
    this.clipMesh.setEnabled(!1),
    this.muzzleFlash = Meshes.muzzleFlash.clone("muzzleFlash", this.playerActor.gunContainer),
    this.muzzleFlash.setEnabled(!1),
    this.muzzleFlash.parent = this.playerActor.gunContainer,
    this.muzzleFlash.position.x = .25,
    this.muzzleFlash.position.z = .6,
    this.gun.player.id == this.gun.game.meId && (this.gunMesh.setRenderingGroupId(2),
    this.clipMesh.renderingGroupId = 2,
    this.muzzleFlash.renderingGroupId = 2),
    this.fireSound = Sounds.eggk47.fire.clone(),
    this.gunMesh.attachSound(this.fireSound),
    this.dryFireSound = Sounds.eggk47.dryFire.clone(),
    this.gunMesh.attachSound(this.dryFireSound),
    this.addSoundEvent(24, Sounds.eggk47.removeMag.clone()),
    this.addSoundEvent(72, Sounds.eggk47.insertMag.clone()),
    this.addSoundEvent(90, Sounds.eggk47.cycle.clone())
}
function DozenGaugeActor(e) {
    this.gun = e,
    this.playerActor = e.player.actor,
    this.gripHandTarget = this.playerActor.gripHand.getChildMeshByName("gripHand.doubleShotgunGrip"),
    this.gunMesh = Meshes.doubleShotgun.clone("doubleShotgun", this.playerActor.gripHand),
    this.gunMesh.attachToParent(this.gripHandTarget),
    this.gunMesh.setEnabled(!1),
    this.barrel = this.gunMesh.getChildMeshByName("doubleShotgun.doubleShotgun.barrel"),
    this.muzzleFlash = Meshes.muzzleFlash.clone("muzzleFlash", this.playerActor.gunContainer),
    this.muzzleFlash.setEnabled(!1),
    this.muzzleFlash.parent = this.playerActor.gunContainer,
    this.muzzleFlash.position.x = .25,
    this.muzzleFlash.position.z = .6,
    this.gun.player.id == this.gun.game.meId && (this.gunMesh.setRenderingGroupId(2),
    this.muzzleFlash.renderingGroupId = 2),
    this.fireSound = Sounds.dozenGauge.fire.clone(),
    this.gunMesh.attachSound(this.fireSound),
    this.dryFireSound = Sounds.eggk47.dryFire.clone(),
    this.gunMesh.attachSound(this.dryFireSound),
    this.addSoundEvent(321, Sounds.dozenGauge.open.clone()),
    this.addSoundEvent(377, Sounds.dozenGauge.load.clone()),
    this.addSoundEvent(397, Sounds.dozenGauge.close.clone())
}
function CSG1Actor(e) {
    this.gun = e,
    this.playerActor = e.player.actor,
    this.gunMesh = Meshes.csg1.clone("csg1", this.playerActor.gunContainer),
    this.gunMesh.setEnabled(!1),
    this.clipMesh = Meshes.csg1Mag.clone("csg1Mag", this.playerActor.gunContainer),
    this.clipMesh.setEnabled(!1),
    this.muzzleFlash = Meshes.muzzleFlash.clone("muzzleFlash", this.playerActor.gunContainer),
    this.muzzleFlash.setEnabled(!1),
    this.muzzleFlash.parent = this.playerActor.gunContainer,
    this.muzzleFlash.position.x = .25,
    this.muzzleFlash.position.z = .6,
    this.gun.player.id == this.gun.game.meId && (this.gunMesh.setRenderingGroupId(2),
    this.clipMesh.renderingGroupId = 2,
    this.muzzleFlash.renderingGroupId = 2),
    this.fireSound = Sounds.csg1.fire.clone(),
    this.gunMesh.attachSound(this.fireSound),
    this.dryFireSound = Sounds.eggk47.dryFire.clone(),
    this.gunMesh.attachSound(this.dryFireSound),
    this.addSoundEvent(881, Sounds.eggk47.removeMag.clone()),
    this.addSoundEvent(947, Sounds.eggk47.insertMag.clone()),
    this.addSoundEvent(1030, Sounds.csg1.pullAction.clone()),
    this.addSoundEvent(1100, Sounds.csg1.releaseAction.clone())
}
function Cluck9mmActor(e) {
    this.gun = e,
    this.playerActor = e.player.actor,
    this.gunMesh = Meshes.cluck9mm.clone("cluck9mm", this.playerActor.gunContainer),
    this.gunMesh.setEnabled(!1),
    this.clipMesh = this.gunMesh.getChildMeshByName("cluck9mm.cluck9mmMag"),
    this.muzzleFlash = Meshes.muzzleFlash.clone("muzzleFlash", this.playerActor.gunContainer),
    this.muzzleFlash.setEnabled(!1),
    this.muzzleFlash.parent = this.playerActor.gunContainer,
    this.muzzleFlash.position.x = .25,
    this.muzzleFlash.position.z = .6,
    this.gun.player.id == this.gun.game.meId && (this.gunMesh.setRenderingGroupId(2),
    this.clipMesh.renderingGroupId = 2,
    this.muzzleFlash.renderingGroupId = 2),
    this.fireSound = Sounds.cluck9mm.fire.clone(),
    this.gunMesh.attachSound(this.fireSound),
    this.dryFireSound = Sounds.eggk47.dryFire.clone(),
    this.gunMesh.attachSound(this.dryFireSound),
    this.addSoundEvent(628, Sounds.cluck9mm.removeMag.clone()),
    this.addSoundEvent(675, Sounds.cluck9mm.insertMag.clone())
}
function ItemActor(e, t) {
    this.game = e,
    this.kind = t
}
function AmmoActor(e) {
    ItemActor.call(this, e, ItemManager.AMMO),
    this.mesh = Meshes.ammo.clone("ammo"),
    this.mesh.setEnabled(!1),
    shadowGen.getShadowMap().renderList.push(this.mesh)
}
function ItemManager(e) {
    this.game = e,
    this.pools = [new Pool(function() {
        return new ItemManager.Constructors[ItemManager.AMMO](e)
    }
    ,100)]
}
function getKeyByValue(e, t) {
    for (var a in e)
        if (e.hasOwnProperty(a) && e[a] === t)
            return a
}
function selectServer(e) {
    localStorage.setItem("defaultServerIdx", e),
    selectedServer = e
}
function onResourcesLoaded() {
    function e() {
        document.getElementById("CLASS_NAME").innerHTML = classes[selectedClass].name;
        var e = '<p style="text-align: center">Weapon: ' + i[selectedClass].weapon.name + "</p><br>";
        for (c in l) {
            var t = (i[selectedClass].weapon[c] + l[c].min) / (l[c].max - Math.abs(l[c].min));
            t = .95 * t + .05,
            e += '<p style="text-align: right; display: inline-block; width: 100px;">' + l[c].name + '</p><div style="background: #efffb0; display: inline-block; margin-left: 10px; width: ' + Math.floor(150 * t) + 'px; height: 12px;"></div><div style="background: var(--egg-brown); display: inline-block; width: ' + Math.ceil(150 * (1 - t)) + 'px; height: 12px;"></div></p>'
        }
        document.getElementById("CLASS_INFO").innerHTML = e
    }
    var t = document.getElementById("username");
    t.value = getStoredString("lastUsername", ""),
    t.addEventListener("keydown", function(e) {
        "Enter" != e.code && 13 != e.keyCode || (t.disabled = !0,
        login())
    });
    var a = classes.length
      , n = new BABYLON.StandardMaterial("groundMat",scene);
    n.diffuseColor = new BABYLON.Color3(.4,.3,.2);
    var o = BABYLON.Mesh.CreatePlane("ground", 100, scene);
    o.position.y = -.32,
    o.rotation.x = Math.PI / 2,
    o.receiveShadows = !0,
    o.material = n,
    light.position.y = 2;
    for (var i = [], s = 0; s < a; s++) {
        var r = new function(e, t, a, n) {
            this.game = {
                meId: 0
            },
            this.id = 1,
            this.name = "",
            this.x = e,
            this.y = t,
            this.z = a,
            this.hp = 100,
            this.actor = new PlayerActor(this),
            this.actor.mesh.setPivotPoint(new BABYLON.Vector3(0,0,-1.6), BABYLON.Space.GLOBAL),
            this.actor.head.rotation.y = 2.5,
            this.weapon = new classes[n].weapon(this),
            this.weapon.equip()
        }
        (0,-.32,1.6,s);
        r.actor.mesh.rotation.y = s * Math.PI / (a / 2),
        i.push(r)
    }
    for (var l = {
        totalDamage: {
            name: "Damage",
            max: -1e3,
            min: 1e3,
            flip: !1
        },
        accuracy: {
            name: "Accuracy",
            max: -1e3,
            min: 1e3,
            flip: !0
        },
        rof: {
            name: "Rate of Fire",
            max: -1e3,
            min: 1e3,
            flip: !0
        },
        range: {
            name: "Range",
            max: -1e3,
            min: 1e3,
            flip: !1
        }
    }, s = 0; s < a; s++) {
        var h = i[s].weapon;
        for (var c in l)
            l[c].flip ? (l[c].max = Math.max(l[c].max, -h[c]),
            l[c].min = Math.min(l[c].min, -h[c])) : (l[c].max = Math.max(l[c].max, h[c]),
            l[c].min = 0)
    }
    var d = -(selectedClass = getStoredNumber("selectedClass", Math.randomInt(0, classes.length)));
    window.selectClass = function(t) {
        selectedClass = Math.mod(selectedClass + t, a),
        d -= t,
        e()
    }
    ,
    e(),
    BABYLON.Engine.audioEngine.setGlobalVolume(settings.volume),
    engine.runRenderLoop(function() {
        scene.render();
        var e = d / 5;
        d -= e;
        for (var t = 0; t < a; t++)
            i[t].actor.mesh.rotation.y += e * (Math.PI / (a / 2))
    })
}
function getRequest(e, t, a) {
    var n = new XMLHttpRequest;
    return !!n && ("function" != typeof t && (t = function() {}
    ),
    "function" != typeof a && (a = function() {}
    ),
    n.onreadystatechange = function() {
        if (4 == n.readyState)
            return 200 === n.status ? t(n.responseText) : a(n.status)
    }
    ,
    n.open("GET", e, !0),
    n.send(null),
    n)
}
function login() {
    document.getElementById("newVersion").style.display = "none",
    document.getElementById("version").style.display = "block",
    localStorage.setItem("lastVersionPlayed", version);
    var e = new WebSocket(servers[selectedServer].address);
    e.binaryType = "arraybuffer",
    0 != (username = document.getElementById("username").value.trim()).length && (document.getElementById("ALERT").focus(),
    openAlertDialog("CONNECTING", "Please wait!", null, null, !0),
    e.onopen = function() {
        localStorage.setItem("lastUsername", username),
        localStorage.setItem("selectedClass", selectedClass),
        ga("send", "event", "play game", "class", classes[selectedClass].name);
        var t = 3 + 2 * username.length + 1;
        facebookId && (t += 2 * facebookId.length + 4);
        var a = new Comm.output(t);
        a.packInt8(Comm.login),
        a.packInt8(selectedClass),
        a.packString(username),
        facebookId && (a.packInt32(gameSession),
        a.packString(facebookId)),
        e.send(a.buffer)
    }
    ,
    e.onclose = function(e) {
        4e3 != e.code && (game ? openAlertDialog("CONNECTION LOST", "Please try a different server,<br> or try again later!", {
            label: "OK",
            onclick: showMainMenu
        }) : openAlertDialog("CANNOT CONNECT", "Please try a different server,<br> or try again later!", {
            label: "OK"
        }))
    }
    ,
    e.onmessage = function(t) {
        var a = new Comm.input(t.data);
        switch (a.unPackInt8U()) {
        case Comm.userData:
            var n = a.unPackInt32U()
              , o = a.unPackInt32U()
              , i = a.unPackInt32U();
            (t = document.getElementById("STATS")).innerHTML = "Kills: " + n + " / Deaths: " + o + " / Ratio: " + Math.floor(n / Math.max(n + o, 1) * 100) + "%<br>Best Kill Streak: " + i;
            break;
        case Comm.loggedIn:
            var s = a.unPackInt8U()
              , r = a.unPackInt8U()
              , l = a.unPackInt8U()
              , h = a.unPackInt8U()
              , c = a.unPackInt16U();
            game = new Game(e,s,r,l,h,c);
            break;
        case Comm.invalidName:
            closeAlertDialog(),
            openAlertDialog("INVALID NAME", "I'm going to guess you know why.", {
                label: "Yes"
            }),
            (t = document.getElementById("username")).value = "",
            t.disabled = !1,
            t.focus(),
            document.getElementById("PLAY_BUTTON").disabled = !1
        }
    }
    )
}
function setVolume(e) {
    settings.volume = e.value,
    localStorage.setItem("volume", settings.volume),
    BABYLON.Engine.audioEngine.setGlobalVolume(settings.volume)
}
function setMouseSensitivity(e) {
    settings.mouseSensitivity = e.value,
    localStorage.setItem("mouseSensitivity", settings.mouseSensitivity)
}
function setMouseInvert(e) {
    settings.mouseInvert = e.checked ? -1 : 1,
    localStorage.setItem("mouseInvert", settings.mouseInvert)
}
function getStoredNumber(e, t) {
    var a = localStorage.getItem(e);
    return a ? Number(a) : t
}
function getStoredString(e, t) {
    var a = localStorage.getItem(e);
    return a || t
}
function refactorConfigKeys(e) {
    document.getElementsByName("config").forEach(function(t) {
        t != e && t.innerText == e.innerText && (delete inputToControlMap[t.innerText],
        t.style.fontWeight = "normal",
        t.style.color = "#aaa",
        t.innerText = "undefined")
    })
}
function setControl(e) {
    refactorConfigKeys(e),
    delete inputToControlMap[e.oldText],
    inputToControlMap[e.innerText] = e.id,
    controlEl = null,
    game && game.captureKeys(),
    window.onkeydown = null,
    window.onkeyup = null,
    localStorage.setItem("controlConfig", JSON.stringify(inputToControlMap))
}
function configKey(e) {
    var t = e.target;
    e = e || window.event,
    t == controlEl ? (1 == e.button && event.preventDefault(),
    t.style.fontWeight = "bold",
    t.style.color = "#fff",
    t.innerText = "MOUSE " + e.button,
    setControl(t)) : (controlEl && (controlEl.style.fontWeight = "bold",
    controlEl.style.color = "#fff",
    controlEl.innerText = controlEl.oldText),
    t.oldText = t.innerText,
    t.style.fontWeight = "normal",
    t.style.color = "#edc",
    t.innerText = "Press key or button",
    controlEl = t,
    t.focus(),
    game && game.releaseKeys(),
    window.onkeydown = function(e) {
        if (27 != (e.which || e.keyCode)) {
            var a = e.key;
            return " " == a && (a = "space",
            e.preventDefault()),
            t.style.fontWeight = "bold",
            t.style.color = "#fff",
            t.innerText = a.toLocaleUpperCase(),
            setControl(t),
            e.stopPropagation(),
            !1
        }
        t.style.fontWeight = "bold",
        t.style.color = "#fff",
        t.innerText = t.oldText,
        controlEl = null
    }
    ,
    window.onkeyup = function(e) {
        return e.stopPropagation(),
        !1
    }
    )
}
function startAlertBar() {
    var e = document.getElementById("ALERT_FOOTER");
    e.style.display = "block",
    alertBarInterval = setInterval(function() {
        e.innerText += "-",
        e.innerText.length > 10 && (e.innerText = "-")
    }, 200)
}
function openAlertDialog(e, t, a, n, o) {
    document.getElementById("OVERLAY").style.display = "block",
    document.getElementById("ALERT_HEADER").innerHTML = e,
    document.getElementById("ALERT_MESSAGE").innerHTML = t;
    i = document.getElementById("alertButton1");
    a ? (i.style.display = "inline-block",
    i.innerHTML = a.label || "OK",
    i.style.width = a.width || "80px",
    i.onclick = a.onclick || closeAlertDialog) : i.style.display = "none";
    var i = document.getElementById("alertButton2");
    n ? (i.style.display = "inline-block",
    i.innerHTML = n.label || "Cancel",
    i.style.width = n.width || "80px",
    i.onclick = n.onclick || closeAlertDialog) : i.style.display = "none",
    o ? startAlertBar() : (document.getElementById("ALERT_FOOTER").style.display = "none",
    clearInterval(alertBarInterval)),
    document.exitPointerLock(),
    window.onkeydown = null,
    window.onkeyup = null
}
function closeAlertDialog() {
    document.getElementById("OVERLAY").style.display = "none",
    document.getElementById("ALERT_FOOTER").style.display = "none",
    document.getElementById("username").disabled = !1,
    clearInterval(alertBarInterval)
}
function resetGameUI() {
    document.getElementById("CHAT_BOX").value = "",
    document.getElementById("BEST_STREAK").innerText = "BEST KILL STREAK: 0",
    document.getElementById("KILL_BOX").style.display = "none",
    document.getElementById("DEATH_BOX").style.display = "none"
}
function showMainMenuConfirm() {
    openAlertDialog("MAIN MENU", "Leave game and return<br>to the main menu?", {
        label: "Yes",
        width: "80px",
        onclick: reloadPage
    }, {
        label: "No",
        width: "80px",
        onclick: closeAlertDialog
    })
}
function reloadPage() {
    window.location.reload()
}
function showMainMenu() {
    openAlertDialog("LOADING", "Just a moment!", null, null, !0),
    document.getElementById("homeButton").style.visibility = "hidden",
    document.getElementById("GAME").style.display = "none",
    resetGameUI(),
    game && (game.ws.close(4e3),
    game.ws = null,
    game.releaseKeys(),
    gameStartTime > 0 && ga("send", "timing", "game", "play time", Date.now() - gameStartTime)),
    game = null,
    (scene = new BABYLON.Scene(engine)).fogMode = BABYLON.Scene.FOGMODE_EXP2,
    scene.fogColor = new BABYLON.Color3(0,0,0),
    scene.fogDensity = .1,
    scene.clearColor = new BABYLON.Color3(0,0,0),
    (light = new BABYLON.SpotLight("light",new BABYLON.Vector3(0,10,.7),new BABYLON.Vector3(0,-1,.33),.75,40,scene)).intensity = 1.5,
    light.autoUpdateExtends = !1;
    var e = new BABYLON.HemisphericLight("light2",new BABYLON.Vector3(-.25,1,-.5),scene);
    e.intensity = .8,
    (e = new BABYLON.HemisphericLight("light3",new BABYLON.Vector3(0,-1,0),scene)).intensity = .5,
    e.diffuse = new BABYLON.Color3(1,.8,.6),
    (shadowGen = new BABYLON.ShadowGenerator(1024,light)).useBlurExponentialShadowMap = !0,
    shadowGen.frustumEdgeFalloff = 1,
    light.shadowMinZ = 1,
    light.shadowMaxZ = 40,
    light.shadowFrustumSize = 10,
    shadowGen.blurScale = 2,
    shadowGen.blurBoxOffset = 1,
    camera = new BABYLON.FreeCamera("camera",new BABYLON.Vector3(0,.2,0),scene),
    scene.activeCameras.push(camera),
    camera.maxZ = 100,
    camera.fov = .5,
    camera.minZ = .1,
    camera.rotation.x = .12,
    loadResources(function() {
        document.getElementById("TITLE").style.display = "block",
        document.getElementById("characterCanvasContainer").appendChild(canvas),
        engine.resize(),
        closeAlertDialog(),
        onResourcesLoaded(),
        document.getElementById("username").disabled = !1
    })
}
function hideMainMenu() {
    document.getElementById("TITLE").style.display = "none"
}
function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
        (t = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen) && t.call(document);
    else {
        var e = document.getElementById("container")
          , t = e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen;
        t && (t.call(e),
        ga("send", "event", "fullscreen"))
    }
}
function onFullscreenChange() {
    engine.resize();
    var e = document.getElementById("container");
    e.style.display = "none",
    setTimeout(function() {
        e.style.display = "block"
    }, 1)
}
function openSettingsMenu() {
    ga("send", "event", "open settings"),
    document.getElementById("settings").style.display = "block",
    document.getElementById("help").style.display = "none",
    document.getElementById("settingsTip").style.display = "none",
    localStorage.setItem("hideHelp", 1)
}
function closeSettingsMenu() {
    document.getElementById("settings").style.display = "none"
}
function showChangelog() {
    ga("send", "event", "view changelog"),
    openAlertDialog("Version " + version, document.getElementById("changelog").innerHTML, {
        label: "OK"
    })
}
function PlayerActor(e) {
    if (this.player = e,
    this.mesh = new BABYLON.AbstractMesh("player",scene),
    this.player == this.player.game.me ? (this.bodyMesh = new BABYLON.AbstractMesh("egg",this.mesh),
    this.bodyMesh.position.y = .32,
    this.bodyMesh.parent = this.mesh,
    this.bodyMesh.player = this.player) : (this.bodyMesh = Meshes.egg.clone("egg", this.mesh),
    this.bodyMesh.position.y = .32,
    this.bodyMesh.parent = this.mesh,
    this.bodyMesh.player = this.player,
    this.bodyMesh.material = Materials.eggShell),
    this.explodeMesh = Meshes.eggExplode.clone("explode", this.mesh),
    this.explodeMesh.position.y = .32,
    this.explodeMesh.parent = this.mesh,
    this.explodeMesh.setMaterial(Materials.normalBackface),
    this.explodeMesh.setEnabled(!1),
    this.whiteMesh = Meshes.eggWhite.clone("white", this.mesh),
    this.whiteMesh.parent = this.explodeMesh,
    this.whiteMesh.setEnabled(!1),
    this.yolkMesh = Meshes.eggYolk.clone("yolk", this.mesh),
    this.yolkMesh.parent = this.explodeMesh,
    this.yolkMesh.setEnabled(!1),
    this.head = new BABYLON.AbstractMesh("head",scene),
    this.head.parent = this.mesh,
    this.head.position.y = .3,
    this.head.position.z = 0,
    this.gunContainer = new BABYLON.AbstractMesh("gunContainer",scene),
    this.gunContainer.parent = this.head,
    this.gunContainer.rotation.y = -.14,
    this.gunContainer.rotation.x = -.035,
    this.eye = new BABYLON.AbstractMesh("eye",scene),
    this.eye.position.y = .1,
    this.eye.position.x = .1,
    this.eye.parent = this.head,
    this.gripHand = Meshes.gripHand.clone("gripHand", this.gunContainer),
    this.gripHand.parent = this.gunContainer,
    this.foreHand = Meshes.foreHand.clone("foreHand", this.gunContainer),
    this.foreHand.parent = this.gunContainer,
    this.recoil = {
        rot: {
            x: 0,
            y: 0
        },
        targetRot: {
            x: 0,
            y: 0
        },
        kick: 0,
        targetKick: 0
    },
    shadowGen.getShadowMap().renderList.push(this.bodyMesh),
    this.player.game)
        if (this.player.id == this.player.game.meId)
            this.gripHand.renderingGroupId = 2,
            this.foreHand.renderingGroupId = 2;
        else {
            this.nameSurface = BABYLON.Mesh.CreatePlane("nameSurface", .5, scene, !1),
            this.nameSurface.material = new BABYLON.StandardMaterial("nameSurfaceMaterial",scene),
            this.nameSurface.material.specularColor = new BABYLON.Color3(0,0,0),
            this.nameSurface.material.emissiveColor = new BABYLON.Color3(1,1,1);
            var t = new BABYLON.DynamicTexture("nameTexture",256,scene,!1,1);
            this.nameSurface.material.diffuseTexture = t,
            this.nameSurface.material.diffuseTexture.hasAlpha = !0,
            this.nameSurface.material.useAlphaFromDiffuseTexture = !0,
            this.nameSurface.material.backFaceCulling = !1,
            t.drawText(this.player.name, 9 * (14 - this.player.name.length), 30, "bold 30px Nunito", "white", "transparent"),
            this.nameSurface.parent = this.mesh,
            this.nameSurface.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL,
            this.nameSurface.position.y = .475
        }
    this.mesh.position.x = this.player.x,
    this.mesh.position.y = this.player.y,
    this.mesh.position.z = this.player.z,
    this.deathSound = Sounds.shellBurst.clone(),
    this.hitSound = Sounds.hit.clone(),
    this.bodyMesh.attachSound(this.hitSound)
}
function Bullet(e) {
    this.game = e,
    this.x = 0,
    this.y = 0,
    this.z = 0,
    this.dx = 0,
    this.dy = 0,
    this.dz = 0,
    this.ttl = 0,
    this.active = !1,
    this.player = null,
    this.damage = 20,
    BulletActor && (this.actor = new BulletActor(this))
}
function Gun(e) {
    this.player = e,
    this.game = e.game,
    this.rofCountdown = 0,
    this.shotsQueued = 0,
    this.reloadCountdown = 0,
    this.triggerPulled = !1,
    this.equipCountdown = 0
}
function Eggk47(e) {
    Gun.call(this, e),
    this.name = "EggK-47",
    this.ammo = {
        rounds: 30,
        capacity: 30,
        reload: 30,
        store: 240,
        storeMax: 240,
        pickup: 30
    },
    this.rof = 6,
    this.automatic = !0,
    this.accuracy = 15,
    this.shotSpreadIncrement = 45,
    this.accuracySettleFactor = .91,
    this.damage = 40,
    this.totalDamage = 40,
    this.ttl = 30,
    this.velocity = .5,
    this.range = this.ttl * this.velocity,
    this.equipTime = 15,
    this.stowWeaponTime = 15,
    this.longReloadTime = 125,
    this.shortReloadTime = 84,
    Eggk47Actor && (this.actor = new Eggk47Actor(this))
}
function DozenGauge(e) {
    Gun.call(this, e),
    this.name = "Worcester Dozen Gauge",
    this.ammo = {
        rounds: 2,
        capacity: 2,
        reload: 2,
        store: 24,
        storeMax: 24,
        pickup: 8
    },
    this.rof = 15,
    this.automatic = !1,
    this.accuracy = 50,
    this.shotSpreadIncrement = 160,
    this.accuracySettleFactor = .9,
    this.damage = 9.5,
    this.totalDamage = 20 * this.damage,
    this.ttl = 15,
    this.velocity = .45,
    this.range = this.ttl * this.velocity,
    this.equipTime = 15,
    this.stowWeaponTime = 15,
    this.longReloadTime = 95,
    this.shortReloadTime = 95,
    DozenGaugeActor && (this.actor = new DozenGaugeActor(this))
}
function CSG1(e) {
    Gun.call(this, e),
    this.name = "CSG-1",
    this.ammo = {
        rounds: 5,
        capacity: 5,
        reload: 5,
        store: 15,
        storeMax: 15,
        pickup: 5
    },
    this.rof = 60,
    this.automatic = !1,
    this.accuracy = 0,
    this.shotSpreadIncrement = 160,
    this.accuracySettleFactor = .97,
    this.damage = 250,
    this.totalDamage = 250,
    this.ttl = 80,
    this.velocity = .6,
    this.range = this.ttl * this.velocity,
    this.equipTime = 15,
    this.stowWeaponTime = 15,
    this.longReloadTime = 237,
    this.shortReloadTime = 140,
    CSG1Actor && (this.actor = new CSG1Actor(this))
}
function Cluck9mm(e) {
    Gun.call(this, e),
    this.name = "Cluck 9mm",
    this.ammo = {
        rounds: 15,
        capacity: 15,
        reload: 15,
        store: 60,
        storeMax: 60,
        pickup: 15
    },
    this.rof = 6,
    this.automatic = !1,
    this.accuracy = 30,
    this.shotSpreadIncrement = 100,
    this.accuracySettleFactor = .82,
    this.damage = 35,
    this.totalDamage = 35,
    this.ttl = 100,
    this.velocity = .45,
    this.range = this.ttl * this.velocity,
    this.equipTime = 15,
    this.stowWeaponTime = 15,
    this.longReloadTime = 113,
    this.shortReloadTime = 113,
    Cluck9mmActor && (this.actor = new Cluck9mmActor(this))
}
function MunitionsManager(e) {
    this.game = e,
    this.bulletPool = new Pool(function() {
        return new Bullet(e)
    }
    ,1e3)
}
function Player(e, t) {
    this.game = e,
    this.id = t.id,
    this.name = t.name,
    this.charClass = t.charClass,
    this.x = t.x,
    this.y = t.y,
    this.z = t.z,
    this.dx = t.dx,
    this.dy = t.dy,
    this.dz = t.dz,
    this.viewYaw = t.viewYaw,
    this.controlKeys = t.controlKeys,
    this.moveYaw = t.moveYaw,
    this.pitch = t.pitch,
    this.totalKills = t.totalKills,
    this.totalDeaths = t.totalDeaths,
    this.killStreak = t.killStreak,
    this.bestKillStreak = t.bestKillStreak,
    this.hp = t.hp,
    this.weaponIdx = t.weaponIdx,
    this.equipWeaponIdx = 0,
    this.stowWeaponCountdown = 0,
    this.shotSpread = 0,
    this.jumping = !1,
    this.stateIdx = 0,
    this.previousStates = Array(256).fill({
        delta: 0,
        moveYaw: 0,
        fire: !1,
        jump: !1,
        x: t.x,
        y: t.y,
        z: t.z,
        dx: 0,
        dy: 0,
        dz: 0,
        controlKeys: 0
    }),
    PlayerActor && (this.actor = new PlayerActor(this)),
    this.weapons = [new Cluck9mm(this), new classes[this.charClass].weapon(this)],
    this.weapon = this.weapons[0]
}
function Pool(e, t) {
    this.size = 0,
    this.originalSize = t,
    this.constructorFn = e,
    this.objects = [],
    this.idx = 0,
    this.numActive = 0,
    this.expand(t)
}
BulletActor.prototype.fire = function() {
    this.mesh.setEnabled(!0),
    this.mesh.position.x = this.bullet.x,
    this.mesh.position.y = this.bullet.y,
    this.mesh.position.z = this.bullet.z,
    this.mesh.lookAt(new BABYLON.Vector3(this.bullet.x + this.bullet.dx,this.bullet.y + this.bullet.dy,this.bullet.z + this.bullet.dz)),
    this.mesh.rotation.x += .015,
    this.mesh.rotation.y -= .015,
    this.mesh.scaling.z = .5
}
,
BulletActor.prototype.update = function() {
    this.mesh.position.x = this.bullet.x,
    this.mesh.position.y = this.bullet.y,
    this.mesh.position.z = this.bullet.z,
    this.mesh.scaling.z = Math.min(this.mesh.scaling.z + .05, 3)
}
,
BulletActor.prototype.remove = function() {
    this.mesh.setEnabled(!1)
}
;
var Meshes = {}
  , Materials = {}
  , Sounds = {};
BABYLON.Mesh.prototype.attachToParent = function(e) {
    this.parent = e,
    this.position = BABYLON.Vector3.Zero(),
    this.rotation = BABYLON.Vector3.Zero(),
    this.rotationQuaternion = BABYLON.Quaternion.Identity()
}
,
BABYLON.AbstractMesh.prototype.getChildMeshByName = function(e) {
    for (var t = this.getChildMeshes(), a = 0; a < t.length; a++)
        if (t[a].name == e)
            return t[a];
    return null
}
,
BABYLON.AbstractMesh.prototype.setLayerMask = function(e) {
    this.layerMask = e;
    for (var t = this.getChildMeshes(), a = 0; a < t.length; a++)
        t[a].setLayerMask(e)
}
,
BABYLON.AbstractMesh.prototype.setRenderingGroupId = function(e) {
    this.renderingGroupId = e;
    for (var t = this.getChildMeshes(), a = 0; a < t.length; a++)
        t[a].setRenderingGroupId(e)
}
,
BABYLON.AbstractMesh.prototype.setMaterial = function(e) {
    this.material = e;
    for (var t = this.getChildMeshes(), a = 0; a < t.length; a++)
        t[a].setMaterial(e)
}
,
BABYLON.AbstractMesh.prototype.attachSound = function(e) {
    this.attachedSounds || (this.attachedSounds = []),
    e.attachToMesh(this),
    this.attachedSounds.push(e)
}
,
BABYLON.AbstractMesh.prototype.disposeOfSounds = function() {
    if (this.attachedSounds)
        for (var e in this.attachedSounds)
            this.attachedSounds[e].detachFromMesh(),
            this.attachedSounds[e].dispose();
    for (var t = this.getChildMeshes(), a = 0; a < t.length; a++)
        t[a].disposeOfSounds()
}
;
var bulletHoleManager, respawnTime;
Game.prototype.resizeGame = function() {
    this.hitIndicator.resize()
}
,
Game.prototype.onLoadingComplete = function() {
    var e = this;
    this.hitIndicator = new HitIndicator(this),
    this.reticle = new Reticle(this),
    Meshes.muzzleFlash.material = Materials.muzzleFlash,
    Meshes.bullet.material = Materials.bullet,
    Meshes.egg.material = Materials.eggShell,
    Meshes.eggWhite.material = Materials.eggWhite,
    Meshes.eggYolk.material = Materials.eggYolk,
    this.munitionsManager = new MunitionsManager(this),
    this.itemManager = new ItemManager(this),
    this.buildMapMesh(),
    (bulletHoleManager = new BABYLON.SpriteManager("bulletHoleManager","img/bulletHoles.png",1e3,32,scene)).fogEnabled = !0,
    bulletHoleManager.idx = 0,
    bulletHoleManager.addHole = function(e, t, a, n) {
        var o = bulletHoleManager.sprites[this.idx] || new BABYLON.Sprite("",this);
        o.position.x = t,
        o.position.y = a,
        o.position.z = n,
        o.width = .03,
        o.height = .03,
        o.angle = 6.282 * Math.random(),
        o.cellIndex = e,
        this.idx = (this.idx + 1) % 1e3
    }
    ,
    document.getElementById("TITLE").style.display = "none",
    document.getElementById("OVERLAY").style.display = "none",
    document.getElementById("GAME").style.visibility = "visible",
    canvas.addEventListener("click", function() {
        if (this.requestPointerLock(),
        e.me && e.me.isDead() && respawnTime < 0) {
            var t = new Comm.output(1);
            t.packInt8(Comm.requestRespawn),
            e.ws.send(t.buffer),
            respawnTime = 1e5
        }
    }, !1),
    canvas.addEventListener("mousedown", function(t) {
        e.inputDown("MOUSE " + t.button),
        1 == t.button && t.preventDefault()
    }),
    canvas.addEventListener("mouseup", function(t) {
        e.inputUp("MOUSE " + t.button)
    }),
    canvas.addEventListener("mousemove", function(t) {
        if (document.pointerLockElement && e.me && e.me.hp > 0) {
            var a = 5e-4 * settings.mouseSensitivity + .001;
            e.me.viewYaw = Math.radAdd(e.me.viewYaw, t.movementX * a),
            e.me.pitch = Math.max(Math.min(e.me.pitch + t.movementY * settings.mouseInvert * a, 1.5), -1.5)
        }
    }),
    this.resizeGame(),
    this.captureKeys(),
    this.setUpSocket(),
    closeAlertDialog(),
    scene.registerBeforeRender(function() {
        e.update(),
        e.me && (e.light.position.x = e.me.x,
        e.light.position.y = e.me.y + 10,
        e.light.position.z = e.me.z)
    }),
    engine.runRenderLoop(function() {
        scene.render()
    });
    var t = new Comm.output(1);
    t.packInt8(Comm.clientReady),
    this.ws.send(t.buffer)
}
;
var killDisplayTimeout;
Game.prototype.setUpSocket = function() {
    var e = this;
    this.ws.onmessage = function(t) {
        for (var a, n = new Comm.input(t.data); a = n.unPackInt8U(); )
            switch (a) {
            case Comm.addPlayer:
                var o = {
                    id: n.unPackInt8U(),
                    name: n.unPackString(),
                    charClass: n.unPackInt8U(),
                    x: n.unPackFloat(),
                    y: n.unPackFloat(),
                    z: n.unPackFloat(),
                    dx: n.unPackFloat(),
                    dy: n.unPackFloat(),
                    dz: n.unPackFloat(),
                    viewYaw: n.unPackRadU(),
                    moveYaw: n.unPackRadU(),
                    pitch: n.unPackRad(),
                    totalKills: n.unPackInt16U(),
                    killStreak: n.unPackInt16U(),
                    bestKillStreak: n.unPackInt16U(),
                    hp: n.unPackInt8U(),
                    weaponIdx: n.unPackInt8U(),
                    controlKeys: n.unPackInt8U()
                };
                e.players[o.id] || (e.meId == o.id && e.addChat("Welcome, " + o.name + "!"),
                e.addPlayer(o));
                break;
            case Comm.removePlayer:
                c = n.unPackInt8U();
                e.removePlayer(c);
                break;
            case Comm.spawnItem:
                var i = n.unPackInt16U()
                  , s = n.unPackInt8U()
                  , r = n.unPackFloat()
                  , l = n.unPackFloat()
                  , h = n.unPackFloat();
                e.itemManager.spawnItem(i, s, r, l, h);
                break;
            case Comm.collectItem:
                var c = n.unPackInt8U()
                  , s = n.unPackInt8U()
                  , i = n.unPackInt16U();
                e.itemManager.collectItem(s, i),
                c == e.meId && (e.players[c].collectItem(s),
                e.updateAmmoUi());
                break;
            case Comm.keyDown:
                var c = n.unPackInt8U()
                  , d = n.unPackInt8U();
                (K = e.players[c]) && (K.controlKeys |= d);
                break;
            case Comm.keyUp:
                var c = n.unPackInt8U()
                  , d = n.unPackInt8U();
                (K = e.players[c]) && (K.controlKeys ^= d);
                break;
            case Comm.jump:
                c = n.unPackInt8U();
                (K = e.players[c]) && e.players[c].jump();
                break;
            case Comm.die:
                var u = n.unPackInt8U()
                  , m = n.unPackInt8U()
                  , p = n.unPackInt8U()
                  , g = e.players[u]
                  , y = e.players[m];
                y.totalKills++,
                y.killStreak++,
                y.bestKillStreak = Math.max(y.bestKillStreak, y.killStreak);
                var f = new BABYLON.Vector3(g.x,g.y + .32,g.z);
                g.actor.deathSound.setPosition(f),
                g.actor.deathSound.play();
                var w = Math.randomInt(0, Sounds.death.length);
                if (Sounds.death[w].setPosition(f),
                Sounds.death[w].play(),
                u != e.meId) {
                    if (m == e.meId) {
                        var M = document.getElementById("KILL_BOX");
                        M.style.display = "block",
                        document.getElementById("KILLED_NAME").innerText = g.name;
                        var v = document.getElementById("KILL_STREAK");
                        e.me.killStreak > 1 ? v.innerText = e.me.killStreak + "-KILL STREAK" : v.innerText = "";
                        var S = 1.5
                          , k = setInterval(function() {
                            M.style.transform = "scale(" + S + "," + S + ")",
                            (S -= .025) <= 1 && clearInterval(k)
                        }, 15);
                        clearTimeout(killDisplayTimeout),
                        killDisplayTimeout = setTimeout(function() {
                            M.style.display = "none"
                        }, 4e3)
                    }
                } else {
                    e.camera.parent = null,
                    e.camera.position = new BABYLON.Vector3(e.me.actor.mesh.position.x,e.me.actor.mesh.position.y + .2,e.me.actor.mesh.position.z),
                    e.camera.lockedTarget = y.actor.bodyMesh,
                    document.exitPointerLock(),
                    respawnTime = p;
                    var B = document.getElementById("DEATH_BOX");
                    B.style.display = "block",
                    document.getElementById("KILLED_BY_NAME").innerText = y.name;
                    var S = 2
                      , k = setInterval(function() {
                        B.style.transform = "scale(" + S + "," + S + ")",
                        (S -= .025) <= 1 && clearInterval(k)
                    }, 15)
                      , A = document.getElementById("RESPAWN");
                    A.innerText = "";
                    var I = setInterval(function() {
                        A.innerText = "You may respawn in " + respawnTime,
                        --respawnTime < 0 && (clearInterval(I),
                        A.innerHTML = "<b>CLICK TO RESPAWN!</b>")
                    }, 1e3)
                }
                g.actor.explodeMesh.setEnabled(!0),
                g.actor.whiteMesh.setEnabled(!0),
                g.actor.yolkMesh.setEnabled(!0),
                beginAnimation(g.actor.explodeMesh, 0, 50, !1, 1),
                scene.beginAnimation(g.actor.whiteMesh, 0, 50, !1, 1),
                scene.beginAnimation(g.actor.yolkMesh, 0, 56, !1, 1),
                e.shellFragBurst(g.actor.mesh, 200, 1),
                g.die(),
                g.previousStates.fill({
                    delta: 0,
                    moveYaw: 0,
                    fire: !1,
                    jump: !1,
                    x: g.x,
                    y: g.y,
                    z: g.z,
                    dx: 0,
                    dy: 0,
                    dz: 0,
                    controlKeys: 0
                }),
                g.actor.mesh.position.x = g.x,
                g.actor.mesh.position.y = g.y,
                g.actor.mesh.position.z = g.z,
                e.rebuildPlayerList(),
                e.updateBestStreakUi();
                break;
            case Comm.chat:
                var b = n.unPackString();
                e.addChat(b);
                break;
            case Comm.sync:
                var i = n.unPackInt8U()
                  , C = n.unPackInt8U()
                  , r = n.unPackFloat()
                  , l = n.unPackFloat()
                  , h = n.unPackFloat()
                  , x = n.unPackRadU()
                  , E = n.unPackRad();
                if (!(K = e.players[i]))
                    break;
                if (i == e.me.id) {
                    if (Date.now() >= nextPingSample) {
                        nextPingSample = Date.now() + 1e3;
                        var z = Date.now() - e.pingStartTime;
                        pingTotal += z,
                        pingSamples++;
                        var L = document.getElementById("PING");
                        L.style.color = z < 100 ? "#0f0" : z < 150 ? "#ff0" : z < 200 ? "#f90" : "#f00",
                        document.getElementById("PING").innerText = z + "ms"
                    }
                    for (var P = C, O = 1e6, T = C; T != K.stateIdx; ) {
                        var N = K.previousStates[T]
                          , F = Math.sqrt(Math.pow(r - N.x, 2) + Math.pow(l - N.y, 2) + Math.pow(h - N.z, 2));
                        F < O && (P = T,
                        O = F),
                        T = (T + 1) % 256
                    }
                    var T = P
                      , Y = (K.previousStates[T],
                    r - K.previousStates[T].x)
                      , G = l - K.previousStates[T].y
                      , R = h - K.previousStates[T].z;
                    K.x += Y;
                    for (T = 0; K.collidesWithMap() && (K.x -= Y,
                    Y *= .5,
                    K.x += Y,
                    !(++T > 100)); )
                        ;
                    for (K.z += R,
                    T = 0; K.collidesWithMap() && (K.z -= R,
                    R *= .5,
                    K.z += R,
                    !(++T > 100)); )
                        ;
                    G >= .9 && (K.y = l)
                } else
                    K.x = r,
                    K.y = l,
                    K.z = h,
                    K.viewYaw = x,
                    K.moveYaw = x,
                    K.pitch = E;
                break;
            case Comm.fireBullet:
                var i = n.unPackInt8U()
                  , r = n.unPackFloat()
                  , l = n.unPackFloat()
                  , h = n.unPackFloat()
                  , D = n.unPackFloat()
                  , U = n.unPackFloat()
                  , W = n.unPackFloat();
                if (!(K = e.players[i]))
                    break;
                i != e.meId && (K.dx *= .5,
                K.dz *= .5,
                K.actor.head.rotation.x = K.pitch,
                K.actor.mesh.rotation.y = K.viewYaw,
                K.actor.fire(),
                K.weapon.actor.fire()),
                e.munitionsManager.fireBullet(K, {
                    x: r,
                    y: l,
                    z: h
                }, {
                    x: D,
                    y: U,
                    z: W
                }, K.weapon.damage, K.weapon.ttl, K.weapon.velocity);
                break;
            case Comm.fireShot:
                var i = n.unPackInt8U()
                  , r = n.unPackFloat()
                  , l = n.unPackFloat()
                  , h = n.unPackFloat()
                  , D = n.unPackFloat()
                  , U = n.unPackFloat()
                  , W = n.unPackFloat()
                  , H = n.unPackInt8U()
                  , K = e.players[i];
                i != e.me.id && (K.dx *= .5,
                K.dz *= .5,
                K.actor.head.rotation.x = K.pitch,
                K.actor.mesh.rotation.y = K.viewYaw,
                K.actor.fire(),
                K.weapon.actor.fire()),
                Math.seed = H;
                for (T = 0; T < 20; T++) {
                    var q = Math.normalize3({
                        x: D + Math.seededRandom(-.15, .15),
                        y: U + Math.seededRandom(-.1, .1),
                        z: W + Math.seededRandom(-.15, .15)
                    });
                    e.munitionsManager.fireBullet(K, {
                        x: r,
                        y: l,
                        z: h
                    }, q, K.weapon.damage, K.weapon.ttl, K.weapon.velocity * Math.seededRandom(.9, 1.1))
                }
                break;
            case Comm.startReload:
                i = n.unPackInt8U();
                e.players[i].weapon.actor.reload();
                break;
            case Comm.reload:
                e.me.weapon.reload();
                break;
            case Comm.stowWeapon:
                i = n.unPackInt8U();
                (K = e.players[i]) && K.weapon.actor.stow();
                break;
            case Comm.equipWeapon:
                var i = n.unPackInt8U()
                  , _ = n.unPackInt8U();
                if (!(K = e.players[i]))
                    break;
                e.players[i].equipWeapon(_);
                break;
            case Comm.hitMe:
                var j = n.unPackInt8U()
                  , Y = n.unPackFloat()
                  , R = n.unPackFloat();
                e.me.hp = j,
                e.me.actor.hitSound.play(),
                e.hitIndicator.hit(Y, R);
                break;
            case Comm.hitThem:
                var i = n.unPackInt8U()
                  , j = n.unPackInt8U();
                (K = e.players[i]).hp = j,
                K.actor.hitSound.play(),
                j > 0 && e.shellFragBurst(K.actor.mesh, 100, 1);
                break;
            case Comm.respawn:
                var i = n.unPackInt8U()
                  , r = n.unPackFloat()
                  , l = n.unPackFloat()
                  , h = n.unPackFloat();
                (K = e.players[i]).respawn(r, l, h),
                i == e.meId && (document.getElementById("DEATH_BOX").style.display = "none",
                e.camera.position = BABYLON.Vector3.Zero(),
                e.camera.rotation = BABYLON.Vector3.Zero(),
                e.camera.rotationQuaternion = BABYLON.Quaternion.Zero(),
                e.camera.parent = e.me.actor.eye,
                e.camera.lockedTarget = null)
            }
    }
}
,
Game.prototype.shellFragBurst = function(e, t, a) {
    var n = new BABYLON.ParticleSystem("particles",t,scene);
    n.targetStopDuration = .2,
    n.disposeOnStop = !0,
    n.particleTexture = new BABYLON.Texture("./img/shellfrag.png",scene),
    n.emitter = e,
    n.minEmitBox = new BABYLON.Vector3(-.2,.2,-.2),
    n.maxEmitBox = new BABYLON.Vector3(.2,.4,.2),
    n.color1 = new BABYLON.Color4(1,1,1,4),
    n.color2 = new BABYLON.Color4(1,1,1,4),
    n.colorDead = new BABYLON.Color4(1,1,1,0),
    n.minSize = .01,
    n.maxSize = .04,
    n.minLifeTime = .1,
    n.maxLifeTime = .3,
    n.emitRate = t,
    n.manualEmitCount = t,
    n.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD,
    n.gravity = new BABYLON.Vector3(0,-10,0),
    n.direction1 = new BABYLON.Vector3(-2,-1,-2),
    n.direction2 = new BABYLON.Vector3(2,3,2),
    n.minAngularSpeed = 10 * -Math.PI,
    n.maxAngularSpeed = 10 * Math.PI,
    n.minEmitPower = 1 * a,
    n.maxEmitPower = 2 * a,
    n.updateSpeed = .01,
    n.start()
}
;
var SPS;
Game.prototype.buildMapMesh = function() {
    (SPS = new BABYLON.SolidParticleSystem("SPS",scene,{
        updatable: !1
    })).computeParticleColor = !1,
    SPS.computeParticleTexture = !1,
    SPS.computeParticleRotation = !1;
    var e = this
      , t = Math.PI / 2;
    Object.keys(this.map.min.data).forEach(function(a) {
        var n = e.map.min.data[a];
        Object.keys(n).forEach(function(o) {
            if (a > 1 || o > 0) {
                var i = n[o]
                  , s = 0;
                SPS.addShape(Meshes.map[a][o], i.length, {
                    positionFunction: function(n, r, l) {
                        n.position.x = i[s].x + .5,
                        n.position.y = i[s].y,
                        n.position.z = i[s].z + .5,
                        n.rotation.x = .5 * -Math.PI,
                        n.rotation.y = i[s].dir * t,
                        n.alive = !1,
                        e.map.data[i[s].x][i[s].y][i[s].z] = {
                            cat: a,
                            dec: o,
                            dir: i[s].dir
                        },
                        s++
                    }
                })
            }
        })
    });
    var a = 0
      , n = 0;
    SPS.addShape(Meshes.tile, this.map.width * this.map.depth, {
        positionFunction: function(o, i, s) {
            o.position.x = a + .5,
            o.position.y = 0,
            o.position.z = n + .5,
            o.rotation.x = .5 * -Math.PI,
            o.rotation.y = t * Math.randomInt(0, 3),
            o.scaling.x = .5,
            o.scaling.y = .5,
            o.scaling.z = .5,
            o.alive = !1,
            ++a >= e.map.width && (a = 0,
            n++)
        }
    });
    var o = SPS.buildMesh();
    o.receiveShadows = !0,
    o.material = Materials.map,
    o.freezeWorldMatrix();
    var i = new BABYLON.StandardMaterial("water material",scene);
    i.diffuseColor = new BABYLON.Color3(.05,.1,.2),
    i.specularColor = new BABYLON.Color3(0,0,0);
    var s = BABYLON.MeshBuilder.CreatePlane("plane", {
        size: 1e3
    }, scene);
    s.rotation.x = Math.PI / 2,
    s.position.y = -1,
    s.material = i;
    var r = new BABYLON.SkyMaterial("skyMaterial",scene);
    r.backFaceCulling = !1;
    var l = BABYLON.Mesh.CreateBox("skyBox", 1e3, scene);
    l.material = r,
    l.position.x = this.map.width / 2,
    l.position.z = this.map.depth / 2,
    r.fogEnabled = !1,
    r.useSunPosition = !0,
    r.sunPosition = new BABYLON.Vector3(-.25,1,-.5),
    r.turbidity = 1.5,
    r.luminance = .5,
    r.rayleigh = 2;
    var h = Meshes.sky.clone("sky");
    h.scaling.x = 490,
    h.scaling.y = 100,
    h.scaling.z = 490,
    h.position.x = this.map.width / 2,
    h.position.z = this.map.depth / 2;
    var c = new BABYLON.CloudProceduralTexture("cloud",512,scene);
    c.cloudColor = new BABYLON.Color3(0,0,0),
    c.skyColor = new BABYLON.Color3(1,1,1),
    c.uScale = 1,
    c.vScale = 1;
    var d = new BABYLON.StandardMaterial("cloudMat",scene);
    d.fogEnabled = !1,
    d.alphaMode = BABYLON.Engine.ALPHA_MAXIMIZED,
    d.alpha = .9999,
    d.emissiveTexture = c,
    d.diffuseTexture = c,
    d.backFaceCulling = !1,
    h.material = d;
    var u = Meshes.mountains.clone("");
    u.scaling.x = 80,
    u.scaling.y = 50,
    u.scaling.z = 80,
    u.position.x = this.map.width / 2,
    u.position.z = this.map.depth / 2,
    (u = Meshes.mountains.clone("")).scaling.x = 45,
    u.scaling.y = 25,
    u.scaling.z = 45,
    u.position.x = this.map.width / 2,
    u.position.z = this.map.depth / 2,
    u.rotation.y = 1.5,
    (u = Meshes.mountains.clone("")).scaling.x = 30,
    u.scaling.y = 10,
    u.scaling.z = 30,
    u.position.x = this.map.width / 2,
    u.position.z = this.map.depth / 2,
    u.rotation.y = 3
}
;
var lastTimeStamp = Date.now()
  , lastDelta = 0
  , fps = Array(60).fill(0)
  , fpsSum = 0
  , fpsIdx = 0;
Game.prototype.update = function() {
    var e = this
      , t = document.getElementById("FPS");
    fps[fpsIdx] = engine.getFps(),
    fpsSum += fps[fpsIdx],
    fpsSum -= fps[(fpsIdx + 1) % 60],
    fpsIdx = (fpsIdx + 1) % 60;
    var a = Math.ceil(fpsSum / 60);
    fpsSamples++,
    fpsTotal += a,
    t.innerHTML = "FPS: " + a;
    var n = Date.now() - lastTimeStamp;
    lastTimeStamp += n,
    n /= 17,
    Object.keys(this.players).forEach(function(t) {
        var a = e.players[t];
        a && (a.update(n),
        a.actor && a.actor.update())
    }),
    this.me && (this.me.stateIdx % 10 == 0 && this.ws.readyState == this.ws.OPEN && this.me.hp > 0 && this.serverSync(),
    this.me.stateIdx = (this.me.stateIdx + 1) % 256,
    this.me.previousStates[this.me.stateIdx] = {
        delta: n,
        moveYaw: this.me.moveYaw,
        fire: !1,
        jump: !1,
        x: this.me.x,
        y: this.me.y,
        z: this.me.z,
        dx: this.me.dx,
        dy: this.me.dy,
        dz: this.me.dz,
        controlKeys: this.me.controlKeys
    },
    this.hitIndicator.update(n),
    this.reticle.update(n),
    this.me.weapon && 0 == this.me.weapon.ammo.rounds && (this.me.stateIdx % 20 == 0 ? document.getElementById("AMMO").style.color = "#f00" : this.me.stateIdx % 20 == 10 && (document.getElementById("AMMO").style.color = "#fff"))),
    this.munitionsManager.update(n),
    this.itemManager.update(n)
}
,
Game.prototype.hitPlayer = function(e, t) {
    t.actor.remove()
}
,
Game.prototype.serverSync = function() {
    if (this.me) {
        this.pingStartTime = Date.now(),
        this.me.moveYaw = this.me.viewYaw,
        this.me.previousStates[this.me.stateIdx].moveYaw = this.me.moveYaw;
        var e = new Comm.output(6);
        e.packInt8(Comm.sync),
        e.packInt8(this.me.stateIdx),
        e.packRadU(this.me.moveYaw),
        e.packRad(this.me.pitch),
        this.ws.send(e.buffer)
    }
}
,
Game.prototype.addPlayer = function(e) {
    var t = new Player(this,e);
    t.id == this.meId ? (this.me = t,
    this.me.ws = this.ws,
    this.camera.parent = this.me.actor.eye) : (t.equipWeapon(t.weaponIdx),
    t.isDead() && t.actor.die()),
    this.players[e.id] = t,
    this.rebuildPlayerList()
}
,
Game.prototype.removePlayer = function(e) {
    this.players[e].actor.remove(),
    delete this.players[e],
    this.rebuildPlayerList()
}
,
Game.prototype.reloadWeapon = function() {
    if (this.me.weapon.startReload()) {
        var e = new Comm.output(1);
        e.packInt8(Comm.startReload),
        this.ws.send(e.buffer)
    }
}
,
Game.prototype.rebuildPlayerList = function() {
    var e = this
      , t = Object.keys(this.players).sort(function(t, a) {
        return e.players[a].killStreak - e.players[t].killStreak
    })
      , a = document.getElementById("playerList").children
      , n = 0;
    for (t.forEach(function(t) {
        a[n].style.display = "block",
        a[n].children[0].innerText = e.players[t].name,
        a[n].children[1].innerText = e.players[t].killStreak,
        t == e.meId ? a[n].className = "thisPlayer" : a[n].className = "otherPlayer",
        n++
    }); n < 20; )
        a[n].style.display = "none",
        n++
}
,
Game.prototype.updateBestStreakUi = function() {
    var e = this.players[this.meId];
    document.getElementById("BEST_STREAK").innerText = "BEST KILL STREAK: " + e.bestKillStreak
}
,
Game.prototype.updateAmmoUi = function() {
    var e = this.players[this.meId]
      , t = document.getElementById("WEAPON_NAME");
    t.innerHTML = e.weapon.name,
    (t = document.getElementById("AMMO")).style.color = "#fff",
    t.innerHTML = e.weapon.ammo.rounds + "/" + e.weapon.ammo.store
}
,
Game.prototype.addChat = function(e) {
    var t = document.getElementById("CHAT_BOX");
    t.value += "\n" + e,
    t.scrollTop = t.scrollHeight
}
,
Game.prototype.captureKeys = function() {
    document.onkeydown = this.onKeyDown.bind(this),
    document.onkeyup = this.onKeyUp.bind(this)
}
,
Game.prototype.releaseKeys = function() {
    document.onkeydown = null,
    document.onkeyup = null
}
;
var controlToBitmask = {
    up: 1,
    down: 2,
    left: 4,
    right: 8
};
Game.prototype.inputDown = function(e) {
    if (!this.me.isDead()) {
        var t = inputToControlMap[e];
        switch (t) {
        case "up":
        case "down":
        case "left":
        case "right":
            var a = controlToBitmask[t];
            (n = new Comm.output(2)).packInt8(Comm.keyDown),
            n.packInt8(a),
            this.ws.send(n.buffer),
            this.me.controlKeys |= a,
            this.me.previousStates[this.me.stateIdx].controlKeys |= a;
            break;
        case "jump":
            var n = new Comm.output(1);
            n.packInt8(Comm.jump),
            this.ws.send(n.buffer),
            this.me.jump(),
            this.me.previousStates[this.me.stateIdx].jump = !0,
            this.me.previousStates[this.me.stateIdx].dy = this.me.dy;
            break;
        case "fire":
            document.pointerLockElement && this.me && (this.me.previousStates[this.me.stateIdx].fire = !0,
            this.me.weapon && (this.me.weapon.triggerPulled = !0),
            this.me.queueShot(),
            0 == this.me.weapon.ammo.rounds && this.reloadWeapon());
            break;
        case "reload":
            this.reloadWeapon();
            break;
        case "weapon":
            this.me.stowWeapon(0 == this.me.weaponIdx ? 1 : 0)
        }
    }
}
,
Game.prototype.inputUp = function(e) {
    if (!this.me.isDead()) {
        var t = inputToControlMap[e];
        switch (t) {
        case "fire":
            this.me.weapon && (this.me.weapon.triggerPulled = !1);
            break;
        case "up":
        case "down":
        case "left":
        case "right":
            var a = controlToBitmask[t]
              , n = new Comm.output(2);
            n.packInt8(Comm.keyUp),
            n.packInt8(a),
            this.ws.send(n.buffer),
            this.me.controlKeys ^= a,
            this.me.previousStates[this.me.stateIdx].controlKeys |= a
        }
    }
}
,
Game.prototype.onKeyDown = function(e) {
    if (!this.keyIsDown[e.keyCode]) {
        this.keyIsDown[e.keyCode] = !0;
        var t = e.key.toLocaleUpperCase();
        "" != this.inputTally && (this.inputTally = this.inputTally.replace(t, ""),
        "" == this.inputTally && (document.getElementById("help").style.display = "none",
        localStorage.setItem("hideHelp", 1))),
        " " == t && (t = "SPACE",
        e.preventDefault()),
        this.inputDown(t)
    }
}
,
Game.prototype.onKeyUp = function(e) {
    if (this.keyIsDown[e.keyCode]) {
        this.keyIsDown[e.keyCode] = !1;
        var t = e.key.toLocaleUpperCase();
        " " == t && (t = "SPACE",
        e.preventDefault()),
        this.inputUp(t)
    }
}
,
HitIndicator.prototype.resize = function() {
    this.mesh.scaling.x = window.innerWidth,
    this.mesh.scaling.y = window.innerHeight
}
,
HitIndicator.prototype.update = function(e) {
    for (var t = 7; t < 48; t += 4)
        this.colors[t] -= (this.colors[t] + .5) / 10 * e;
    var a = Math.pow(.9, e);
    this.me && !this.me.isDead() && (this.game.camera.position.x *= a,
    this.game.camera.position.z *= a),
    this.mesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, this.colors, !0),
    document.getElementById("HEALTH_BAR").style.width = 3.02 * this.game.me.hp + "px"
}
,
HitIndicator.prototype.hit = function(e, t) {
    var a = Math.radRange(-Math.atan2(e, -t) - this.game.me.viewYaw + .393);
    a = Math.floor(a / Math.PI2 * 8);
    var n = new BABYLON.Vector2(-this.positions[3 * a + 3],-this.positions[3 * a + 4]).normalize();
    this.game.camera.position.x = .03 * n.x,
    this.game.camera.position.z = .03 * n.y,
    this.colors[4 * a + 7] = 2
}
,
Reticle.prototype.update = function(e) {
    if (this.game.me.weapon)
        for (var t = 0; t < 4; t++) {
            var a = t * Math.PI / 2
              , n = this.game.me.shotSpread + this.game.me.weapon.accuracy;
            this.lines[t].position.x = -Math.sin(a) * n,
            this.lines[t].position.y = Math.cos(a) * n
        }
}
,
Eggk47Actor.prototype.addSoundEvent = function(e, t) {
    var a = new BABYLON.AnimationEvent(e,function() {
        t.play()
    }
    );
    this.playerActor.gripHand.animations[0].addEvent(a),
    this.gunMesh.attachSound(t)
}
,
Eggk47Actor.prototype.animate = function(e, t, a) {
    scene.beginAnimation(this.playerActor.gripHand, e, t, !1, 1, a),
    scene.beginAnimation(this.playerActor.foreHand, e, t, !1, 1),
    scene.beginAnimation(this.gunMesh, e, t, !1, 1),
    scene.beginAnimation(this.clipMesh, e, t, !1, 1)
}
,
Eggk47Actor.prototype.dryFire = function() {
    this.dryFireSound.play()
}
,
Eggk47Actor.prototype.fire = function() {
    this.fireSound.play(),
    this.muzzleFlash.rotation.z = 3.141 * Math.random(),
    this.muzzleFlash.setEnabled(!0);
    var e = this;
    setTimeout(function() {
        e.muzzleFlash.setEnabled(!1)
    }, 40),
    this.animate(0, 6)
}
,
Eggk47Actor.prototype.reload = function() {
    var e = this;
    this.animate(7, 74, function() {
        e.gun.ammo.rounds > 0 ? e.animate(133, 154, function() {
            e.gun.reloadCountdown = 0
        }) : e.animate(74, 132, function() {
            e.gun.reloadCountdown = 0
        })
    })
}
,
Eggk47Actor.prototype.stow = function() {
    var e = this;
    this.animate(154, 168, function() {
        e.gunMesh.setEnabled(!1),
        e.clipMesh.setEnabled(!1),
        e.gun.player.stowWeaponCountdown = 0
    })
}
,
Eggk47Actor.prototype.equip = function() {
    var e = this;
    this.gunMesh.setEnabled(!0),
    this.clipMesh.setEnabled(!0),
    this.animate(168, 182, function() {
        e.gun.equipCountdown = 0
    })
}
,
Eggk47Actor.prototype.update = function() {}
,
DozenGaugeActor.prototype.addSoundEvent = function(e, t) {
    var a = new BABYLON.AnimationEvent(e,function() {
        t.play()
    }
    );
    this.playerActor.gripHand.animations[0].addEvent(a),
    this.gunMesh.attachSound(t)
}
,
DozenGaugeActor.prototype.animate = function(e, t, a) {
    scene.beginAnimation(this.playerActor.gripHand, e, t, !1, 1, a),
    scene.beginAnimation(this.playerActor.foreHand, e, t, !1, 1),
    scene.beginAnimation(this.gunMesh, e, t, !1, 1),
    scene.beginAnimation(this.barrel, e, t, !1, 1)
}
,
DozenGaugeActor.prototype.dryFire = function() {
    this.dryFireSound.play()
}
,
DozenGaugeActor.prototype.fire = function() {
    this.fireSound.play(),
    this.muzzleFlash.rotation.z = 3.141 * Math.random(),
    this.muzzleFlash.setEnabled(!0);
    var e = this;
    setTimeout(function() {
        e.muzzleFlash.setEnabled(!1)
    }, 40),
    this.animate(300, 320)
}
,
DozenGaugeActor.prototype.reload = function() {
    var e = this;
    this.animate(320, 415, function() {
        e.gun.reloadCountdown = 0
    })
}
,
DozenGaugeActor.prototype.stow = function() {
    var e = this;
    this.animate(416, 433, function() {
        e.gunMesh.setEnabled(!1),
        e.gun.player.stowWeaponCountdown = 0
    })
}
,
DozenGaugeActor.prototype.equip = function() {
    var e = this;
    this.gunMesh.setEnabled(!0),
    this.animate(433, 449, function() {
        e.gun.equipCountdown = 0
    })
}
,
DozenGaugeActor.prototype.update = function() {}
,
CSG1Actor.prototype.addSoundEvent = function(e, t) {
    var a = new BABYLON.AnimationEvent(e,function() {
        t.play()
    }
    );
    this.playerActor.gripHand.animations[0].addEvent(a),
    this.gunMesh.attachSound(t)
}
,
CSG1Actor.prototype.animate = function(e, t, a) {
    scene.beginAnimation(this.playerActor.gripHand, e, t, !1, 1, a),
    scene.beginAnimation(this.playerActor.foreHand, e, t, !1, 1),
    scene.beginAnimation(this.gunMesh, e, t, !1, 1),
    scene.beginAnimation(this.clipMesh, e, t, !1, 1)
}
,
CSG1Actor.prototype.dryFire = function() {
    this.dryFireSound.play()
}
,
CSG1Actor.prototype.fire = function() {
    this.fireSound.play(),
    this.muzzleFlash.rotation.z = 3.141 * Math.random(),
    this.muzzleFlash.setEnabled(!0);
    var e = this;
    setTimeout(function() {
        e.muzzleFlash.setEnabled(!1)
    }, 40),
    this.animate(800, 860)
}
,
CSG1Actor.prototype.reload = function() {
    var e = this;
    e.gun.ammo.rounds > 0 ? this.animate(860, 1e3, function() {
        e.gun.reloadCountdown = 0
    }) : this.animate(1001, 1080, function() {
        e.animate(880, 952, function() {
            e.animate(1081, 1165, function() {
                e.gun.reloadCountdown = 0
            })
        })
    })
}
,
CSG1Actor.prototype.stow = function() {
    var e = this;
    this.animate(1166, 1181, function() {
        e.gunMesh.setEnabled(!1),
        e.clipMesh.setEnabled(!1),
        e.gun.player.stowWeaponCountdown = 0
    })
}
,
CSG1Actor.prototype.equip = function() {
    var e = this;
    this.gunMesh.setEnabled(!0),
    this.clipMesh.setEnabled(!0),
    this.animate(1181, 1196, function() {
        e.gun.equipCountdown = 0
    })
}
,
CSG1Actor.prototype.update = function() {}
,
Cluck9mmActor.prototype.addSoundEvent = function(e, t) {
    var a = new BABYLON.AnimationEvent(e,function() {
        t.play()
    }
    );
    this.playerActor.gripHand.animations[0].addEvent(a),
    this.gunMesh.attachSound(t)
}
,
Cluck9mmActor.prototype.animate = function(e, t, a) {
    scene.beginAnimation(this.playerActor.gripHand, e, t, !1, 1, a),
    scene.beginAnimation(this.playerActor.foreHand, e, t, !1, 1),
    scene.beginAnimation(this.gunMesh, e, t, !1, 1),
    scene.beginAnimation(this.clipMesh, e, t, !1, 1)
}
,
Cluck9mmActor.prototype.dryFire = function() {
    this.dryFireSound.play()
}
,
Cluck9mmActor.prototype.fire = function() {
    this.fireSound.play(),
    this.muzzleFlash.rotation.z = 3.141 * Math.random(),
    this.muzzleFlash.setEnabled(!0);
    var e = this;
    setTimeout(function() {
        e.muzzleFlash.setEnabled(!1)
    }, 40),
    this.animate(600, 606)
}
,
Cluck9mmActor.prototype.reload = function() {
    var e = this;
    this.animate(607, 720, function() {
        e.gun.reloadCountdown = 0
    })
}
,
Cluck9mmActor.prototype.stow = function() {
    var e = this;
    this.animate(721, 735, function() {
        e.gunMesh.setEnabled(!1),
        e.gun.player.stowWeaponCountdown = 0
    })
}
,
Cluck9mmActor.prototype.equip = function() {
    var e = this;
    this.gunMesh.setEnabled(!0),
    this.animate(735, 750, function() {
        e.gun.equipCountdown = 0
    })
}
,
Cluck9mmActor.prototype.update = function() {}
,
ItemActor.prototype.update = function(e) {
    this.mesh.rotation.y += .03 * e
}
,
ItemActor.prototype.remove = function() {
    this.mesh.setEnabled(!1)
}
,
AmmoActor.prototype = Object.create(ItemActor.prototype),
AmmoActor.prototype.constructor = ItemActor,
ItemManager.AMMO = 0,
ItemManager.Constructors = [AmmoActor],
ItemManager.prototype.update = function(e) {
    for (var t = 0; t < this.pools.length; t++)
        this.pools[t].forEachActive(function(t) {
            t.update(e)
        })
}
,
ItemManager.prototype.spawnItem = function(e, t, a, n, o) {
    var i = this.pools[t].retrieve(e);
    i.mesh.setEnabled(!0),
    i.mesh.position.x = a,
    i.mesh.position.y = n,
    i.mesh.position.z = o
}
,
ItemManager.prototype.collectItem = function(e, t) {
    this.pools[e].recycle(this.pools[e].objects[t]),
    this.pools[e].objects[t].remove()
}
,
"undefined" != typeof module && (module.exports = ItemManager);
var fbAppId = "503435033333554", engine, scene, canvas, shadowGen, camera, light, engineCaps, selectedClass, selectedServer, game, socket, username, gameSession, facebookId, gameStartTime, pingTotal, pingSamples, fpsTotal, fpsSamples, nextPingSample, settings = {}, inputToControlMap = {
    W: "up",
    S: "down",
    A: "left",
    D: "right",
    SPACE: "jump",
    "MOUSE 0": "fire",
    R: "reload",
    E: "weapon"
}, ga;
!function(e, t, a, n, o, i, s) {
    e.GoogleAnalyticsObject = o,
    e[o] = e[o] || function() {
        (e[o].q = e[o].q || []).push(arguments)
    }
    ,
    e[o].l = 1 * new Date,
    i = t.createElement(a),
    s = t.getElementsByTagName(a)[0],
    i.async = 1,
    i.src = "https://www.google-analytics.com/analytics.js",
    s.parentNode.insertBefore(i, s)
}(window, document, "script", 0, "ga"),
ga("create", "UA-105800112-1", "auto"),
ga("send", "pageview");
var languageToServer = {
    af: 1,
    sq: 1,
    ar: 1,
    hy: 1,
    as: 1,
    ast: 1,
    az: 1,
    eu: 1,
    bg: 1,
    be: 1,
    bn: 1,
    bs: 1,
    br: 1,
    bg: 1,
    my: 1,
    ca: 1,
    ch: 1,
    ce: 1,
    zh: 1,
    cv: 1,
    co: 1,
    cr: 0,
    hr: 1,
    cs: 1,
    da: 1,
    nl: 1,
    "en-au": 1,
    "en-bz": 0,
    "en-ca": 0,
    "en-le": 1,
    "en-jm": 0,
    "en-nz": 1,
    "en-ph": 1,
    "en-za": 1,
    "en-tt": 0,
    "en-gb": 1,
    "en-us": 0,
    "en-zw": 1,
    eo: 1,
    et: 1,
    fo: 1,
    fa: 1,
    fj: 1,
    fi: 1,
    "fr-ca": 0,
    fr: 1,
    fy: 1,
    fur: 1,
    gd: 1,
    gl: 1,
    ka: 1,
    de: 1,
    el: 1,
    gu: 1,
    ht: 0,
    he: 1,
    hi: 1,
    hu: 1,
    is: 1,
    id: 1,
    iu: 0,
    ga: 1,
    it: 1,
    ja: 1,
    kn: 1,
    ks: 1,
    kk: 1,
    km: 1,
    ky: 1,
    tlh: 0,
    ko: 1,
    la: 0,
    lv: 1,
    lt: 1,
    lb: 1,
    mk: 1,
    ms: 1,
    ml: 1,
    mt: 1,
    mi: 1,
    mr: 1,
    mo: 1,
    nv: 0,
    ng: 1,
    ne: 1,
    no: 1,
    nb: 1,
    nn: 1,
    oc: 1,
    or: 1,
    om: 1,
    fa: 1,
    pl: 1,
    pt: 1,
    "pt-br": 0,
    pa: 1,
    qu: 0,
    rm: 1,
    ro: 1,
    ru: 1,
    sz: 1,
    sg: 1,
    sa: 1,
    sc: 1,
    gd: 1,
    sd: 1,
    si: 1,
    sr: 1,
    sk: 1,
    sl: 1,
    so: 1,
    sb: 1,
    es: 1,
    "es-ar": 0,
    "es-bo": 0,
    "es-cl": 0,
    "es-co": 0,
    "es-cr": 0,
    "es-do": 0,
    "es-ec": 0,
    "es-sv": 0,
    "es-gt": 0,
    "es-hn": 0,
    "es-mx": 0,
    "es-nl": 0,
    "es-pa": 0,
    "es-py": 0,
    "es-pe": 0,
    "es-pr": 0,
    "es-es": 1,
    "es-uy": 0,
    "es-ve": 0,
    sx: 1,
    sw: 1,
    sv: 1,
    ta: 1,
    tt: 1,
    te: 1,
    th: 1,
    tig: 1,
    ts: 1,
    tn: 1,
    tr: 1,
    tk: 1,
    uk: 1,
    hsb: 1,
    ur: 1,
    ve: 1,
    vi: 1,
    vo: 1,
    wa: 1,
    cy: 1,
    xh: 1,
    ji: 1,
    zu: 1
};
window.onmessage = function(e) {
    var t = e.data;
    "function" == typeof window[t.func] && window[t.func].call(null, t.message)
}
,
window.addEventListener("contextmenu", function(e) {
    e.preventDefault()
}, !1),
window.onload = function() {
    function e(e) {
        facebookId = null,
        gameSession = null,
        p = e;
        var t = document.getElementById("ritekit-alerts");
        t && (t.style.visibility = "hidden"),
        "connected" === e.status ? (document.getElementById("stats").innerHTML = "Retrieving your stats...",
        facebookId = e.authResponse.userID,
        getRequest("!host_specific/requestUserData.php?id=" + e.authResponse.userID + "&token=" + e.authResponse.accessToken, function(e) {
            try {
                var t = JSON.parse(e);
                if (t.error)
                    document.getElementById("stats").innerText = "DB error: " + t.error;
                else {
                    var a = Math.floor(t.kills / Math.max(t.kills + t.deaths, 1) * 100);
                    document.getElementById("stats").innerHTML = "Kills: " + t.kills.toLocaleString() + " / Deaths: " + t.deaths.toLocaleString() + " / Ratio: " + a + "%<br>Best Kill Streak: " + t.streak.toLocaleString(),
                    gameSession = t.session
                }
            } catch (t) {
                document.getElementById("stats").innerHTML = e
            }
        })) : (p = {
            status: null
        },
        document.getElementById("stats").innerHTML = "Log in with Facebook to track your stats!")
    }
    if (BABYLON.Engine.isSupported()) {
        var t = [{
            image: "Slayaway_banner_01.jpg",
            link: "http://store.steampowered.com/app/530390/Slayaway_Camp/"
        }, {
            image: "Slayaway_banner_02.jpg",
            link: "http://store.steampowered.com/app/530390/Slayaway_Camp/"
        }, {
            image: "Slayaway_banner_03.jpg",
            link: "http://store.steampowered.com/app/530390/Slayaway_Camp/"
        }, {
            image: "Slayaway_banner_01.jpg",
            link: "http://store.steampowered.com/app/530390/Slayaway_Camp/"
        }, {
            image: "Slayaway_banner_02.jpg",
            link: "http://store.steampowered.com/app/530390/Slayaway_Camp/"
        }, {
            image: "ST_banner_00.png",
            link: "http://store.steampowered.com/app/562230/Space_Tyrant/"
        }, {
            image: "ST_banner_01.jpg",
            link: "http://store.steampowered.com/app/562230/Space_Tyrant/"
        }, {
            image: "ST_banner_02.jpg",
            link: "http://store.steampowered.com/app/562230/Space_Tyrant/"
        }, {
            image: "ST_banner_03.jpg",
            link: "http://store.steampowered.com/app/562230/Space_Tyrant/"
        }, {
            image: "ST_banner_04.jpg",
            link: "http://store.steampowered.com/app/562230/Space_Tyrant/"
        }]
          , a = Math.randomInt(0, t.length);
        document.getElementById("bannerAdImage").src = "img/banner_ads/" + t[a].image,
        document.getElementById("bannerAdLink").href = t[a].link;
        for (var n = document.getElementById("serverSelect"), o = 0; o < servers.length; o++) {
            var i = servers[o];
            (c = document.createElement("option")).textContent = i.name,
            n.appendChild(c)
        }
        var s = 1
          , r = navigator.language.toLowerCase();
        r && ((s = languageToServer[r]) || (s = languageToServer[r.substring(0, 2)]),
        s || (s = 1)),
        selectedServer = localStorage.getItem("defaultServerIdx") || s,
        n.selectedIndex = selectedServer,
        settings.volume = getStoredNumber("volume", 1),
        settings.mouseInvert = getStoredNumber("mouseInvert", 1),
        settings.mouseSensitivity = getStoredNumber("mouseSensitivity", 5),
        inputToControlMap = JSON.parse(localStorage.getItem("controlConfig")) || inputToControlMap;
        for (var l in inputToControlMap)
            inputToControlMap.hasOwnProperty(l) && l != l.toLocaleUpperCase() && (inputToControlMap[l.toLocaleUpperCase()] = inputToControlMap[l],
            delete inputToControlMap[l]);
        for (var h in inputToControlMap) {
            var c = document.getElementById(inputToControlMap[h]);
            c.innerText = h.toLocaleUpperCase(),
            c.style.fontWeight = "bold",
            c.style.color = "#fff"
        }
        document.getElementById("volume").value = settings.volume,
        document.getElementById("mouseSensitivity").value = settings.mouseSensitivity,
        document.getElementById("mouseInvert").checked = -1 == settings.mouseInvert;
        for (var d = document.getElementById("playerList"), u = document.getElementById("playerSlot"), o = 0; o < 20; o++) {
            var m = u.cloneNode(!0);
            d.appendChild(m)
        }
        getStoredString("lastVersionPlayed", version) != version && (document.getElementById("newVersion").style.display = "block",
        document.getElementById("version").style.display = "none"),
        getStoredNumber("hideHelp", null) && (document.getElementById("help").style.display = "none",
        document.getElementById("settingsTip").style.display = "none");
        var p = {
            status: null
        };
        window.checkLoginState = function() {
            FB.getLoginStatus(function(t) {
                e(t)
            })
        }
        ,
        window.fbAsyncInit = function() {
            FB.init({
                appId: fbAppId,
                cookie: !0,
                xfbml: !0,
                version: "v2.8"
            }),
            FB.AppEvents.logPageView(),
            FB.getLoginStatus(function(t) {
                e(t)
            }),
            FB.Event.subscribe("auth.login", function(t) {
                e(t)
            })
        }
        ,
        function(e, t, a) {
            var n, o = e.getElementsByTagName(t)[0];
            e.getElementById(a) || ((n = e.createElement(t)).id = a,
            n.src = "//connect.facebook.net/en_US/sdk.js",
            o.parentNode.insertBefore(n, o))
        }(document, "script", "facebook-jssdk"),
        pingTotal = 0,
        pingSamples = 0,
        gameStartTime = 0,
        (canvas = document.createElement("canvas")).style.width = "100%",
        canvas.style.height = "100%",
        document.getElementById("offCanvasContainer").append(canvas),
        engine = new BABYLON.Engine(canvas,!0,null,!1),
        engineCaps = engine.getCaps(),
        showMainMenu(),
        "?openSettings" == window.location.search && openSettingsMenu()
    } else
        openAlertDialog("OH, NO!", 'Shell Shockers requires WebGL, but your<br>browser is not configured to support it.<br><br><a style="text-decoration: underline" target="_window" href="http://shellshock.io/faq.html#webgl">Click here to learn more</a>')
}
,
window.onbeforeunload = function(e) {
    gameStartTime > 0 && ga("send", "timing", "game", "play time", Date.now() - gameStartTime),
    pingSamples > 4 && (ga("send", "timing", "game", "ping", Math.floor(pingTotal / pingSamples), servers[selectedServer].name),
    ga("send", "event", "game", "stats", "fps", Math.ceil(fpsTotal / fpsSamples)),
    ga("send", "event", "game", "settings", "volume", settings.volume),
    ga("send", "event", "game", "settings", "mouse sensitivity", settings.mouseSensitivity),
    ga("send", "event", "game", "settings", "mouse invert", settings.mouseInvert))
}
;
var controlEl, alertBarInterval;
if (document.onfullscreenchange = onFullscreenChange,
document.onmsfullscreenchange = onFullscreenChange,
document.onmozfullscreenchange = onFullscreenChange,
document.onwebkitfullscreenchange = onFullscreenChange,
PlayerActor.prototype.update = function() {
    var e = this.player.x - this.mesh.position.x
      , t = this.player.y - this.mesh.position.y
      , a = this.player.z - this.mesh.position.z;
    Math.length3(e, t, a) < .9 ? (this.mesh.position.x += e / 6,
    this.mesh.position.y += t / 2,
    this.mesh.position.z += a / 6) : (this.mesh.position.x = this.player.x,
    this.mesh.position.y = this.player.y,
    this.mesh.position.z = this.player.z);
    var n = .9;
    this.player.id != this.player.game.meId && (n = .5);
    var o = Math.radDifference(this.player.viewYaw, this.mesh.rotation.y)
      , i = Math.radDifference(this.player.pitch, this.head.rotation.x);
    this.player.addRotationShotSpread(o, i),
    this.mesh.rotation.y += o * n,
    this.head.rotation.x += i * n,
    this.bodyMesh.rotation.x = this.head.rotation.x / 4,
    this.recoil.rot.x += (this.recoil.targetRot.x - this.recoil.rot.x) / 4,
    this.recoil.rot.y += (this.recoil.targetRot.y - this.recoil.rot.y) / 4,
    this.recoil.kick += (this.recoil.targetKick - this.recoil.kick) / 4,
    this.recoil.targetRot.x *= .5,
    this.recoil.targetRot.y *= .5,
    this.recoil.targetKick *= .5
}
,
PlayerActor.prototype.die = function() {
    this.bodyMesh.setEnabled(!1),
    this.head.setEnabled(!1),
    this.eye.setEnabled(!1),
    this.nameSurface && this.nameSurface.setEnabled(!1)
}
,
PlayerActor.prototype.respawn = function() {
    this.bodyMesh.setEnabled(!0),
    this.head.setEnabled(!0),
    this.eye.setEnabled(!0),
    this.nameSurface && this.nameSurface.setEnabled(!0),
    this.explodeMesh.setEnabled(!1),
    this.whiteMesh.setEnabled(!1),
    this.yolkMesh.setEnabled(!1)
}
,
PlayerActor.prototype.remove = function() {
    this.mesh.disposeOfSounds(),
    this.mesh.dispose()
}
,
PlayerActor.prototype.fire = function() {
    this.recoil.targetRot.x = -.05 * Math.random() - .07,
    this.recoil.targetRot.y = .1 * Math.random() - .05,
    this.recoil.targetKick = .1 * Math.random() + .2
}
,
"undefined" != typeof require)
    var BulletActor = null
      , bulletHoleManager = null;
Bullet.prototype.update = function(e) {
    if (this.ttl <= 0 || this.collidesWithMap())
        return this.game.munitionsManager.bulletPool.recycle(this),
        void (this.actor && this.actor.remove());
    this.x += this.dx * e,
    this.y += this.dy * e,
    this.z += this.dz * e,
    this.ttl -= e,
    this.actor && this.actor.update()
}
,
Bullet.prototype.fire = function(e, t, a, n, o, i) {
    this.player = e,
    this.x = t.x,
    this.y = t.y,
    this.z = t.z,
    this.dx = a.x * i,
    this.dy = a.y * i,
    this.dz = a.z * i,
    this.ttl = o,
    this.damage = n,
    this.active = !0,
    this.actor && this.actor.fire()
}
,
Bullet.prototype.collidesWithCell = function() {
    var e = Math.floor(this.x)
      , t = Math.floor(this.y)
      , a = Math.floor(this.z);
    if (e < 0 || a < 0 || e >= this.game.map.width || a >= this.game.map.depth || t < 0 || t >= this.game.map.height)
        return !1;
    try {
        var n = this.game.map.data[e][t][a]
    } catch (n) {
        log.err("Seriously, bullet?? fx: " + e + " fy: " + t + " fz: " + a)
    }
    if (n.cat) {
        if (2 == n.cat)
            switch (n.dir) {
            case 0:
                if (this.y - t > this.z - a)
                    return !1;
                break;
            case 2:
                if (this.y - t > 1 - (this.z - a))
                    return !1;
                break;
            case 1:
                if (this.y - t > this.x - e)
                    return !1;
                break;
            case 3:
                if (this.y - t > 1 - (this.x - e))
                    return !1
            }
        else if (4 == n.cat) {
            var o = this.x - e
              , i = this.y - t
              , s = this.z - a;
            if (o > .7 || o < .3 || s > .7 || s < .3 || i > .5)
                return !1
        }
        return !0
    }
}
,
Bullet.prototype.collidesWithMap = function() {
    if (this.y < 0)
        return bulletHoleManager && this.x > 0 && this.z > 0 && this.x < this.game.map.width && this.z < this.game.map.depth && bulletHoleManager.addHole(1, this.x, .01, this.z),
        !0;
    if (this.y >= this.game.map.height)
        return !1;
    if (this.x < 0 || this.x >= this.game.map.width || this.z < 0 || this.z >= this.game.map.depth)
        return !1;
    if (this.collidesWithCell()) {
        if (bulletHoleManager) {
            for (; this.collidesWithCell(); )
                this.x -= .02 * this.dx,
                this.y -= .02 * this.dy,
                this.z -= .02 * this.dz;
            bulletHoleManager.addHole(0, this.x, this.y, this.z)
        }
        return !0
    }
}
,
"undefined" != typeof module && (module.exports = Bullet);
var Comm = {
    loggedIn: 0,
    addPlayer: 1,
    removePlayer: 2,
    chat: 3,
    keyDown: 4,
    keyUp: 5,
    sync: 6,
    fire: 7,
    jump: 8,
    die: 9,
    hitThem: 10,
    hitMe: 11,
    collectItem: 12,
    spawnItem: 13,
    respawn: 14,
    startReload: 15,
    reload: 16,
    stowWeapon: 17,
    equipWeapon: 18,
    fireBullet: 19,
    fireShot: 20,
    login: 21,
    invalidName: 22,
    ping: 23,
    pong: 24,
    clientReady: 25,
    requestRespawn: 26,
    status: 27,
    output: function(e) {
        this.buffer = new Uint8Array(e),
        this.idx = 0,
        this.packInt8 = function(e) {
            this.buffer[this.idx] = 255 & e,
            this.idx++
        }
        ,
        this.packInt16 = function(e) {
            this.buffer[this.idx] = 255 & e,
            this.buffer[this.idx + 1] = e >> 8 & 255,
            this.idx += 2
        }
        ,
        this.packInt32 = function(e) {
            this.buffer[this.idx] = 255 & e,
            this.buffer[this.idx + 1] = e >> 8 & 255,
            this.buffer[this.idx + 2] = e >> 16 & 255,
            this.buffer[this.idx + 3] = e >> 24 & 255,
            this.idx += 4
        }
        ,
        this.packRadU = function(e) {
            this.packInt16(1e4 * e)
        }
        ,
        this.packRad = function(e) {
            this.packInt16(1e4 * (e + Math.PI))
        }
        ,
        this.packFloat = function(e) {
            this.packInt16(100 * e)
        }
        ,
        this.packString = function(e) {
            this.packInt8(e.length);
            for (var t = 0; t < e.length; t++)
                this.packInt16(e.charCodeAt(t))
        }
    },
    input: function(e) {
        this.buffer = new Uint8Array(e),
        this.idx = 0,
        this.isMoreDataAvailable = function() {
            return this.idx < this.buffer.length
        }
        ,
        this.unPackInt8U = function() {
            var e = this.idx;
            return this.idx++,
            this.buffer[e]
        }
        ,
        this.unPackInt8 = function() {
            return (this.unPackInt8U() + 128) % 256 - 128
        }
        ,
        this.unPackInt16U = function() {
            var e = this.idx;
            return this.idx += 2,
            this.buffer[e] + (this.buffer[e + 1] << 8)
        }
        ,
        this.unPackInt32U = function() {
            var e = this.idx;
            return this.idx += 4,
            this.buffer[e] + 256 * this.buffer[e + 1] + 65536 * this.buffer[e + 2] + 16777216 * this.buffer[e + 3]
        }
        ,
        this.unPackInt16 = function() {
            return (this.unPackInt16U() + 32768) % 65536 - 32768
        }
        ,
        this.unPackRadU = function() {
            return this.unPackInt16U() / 1e4
        }
        ,
        this.unPackRad = function() {
            return this.unPackRadU() - Math.PI
        }
        ,
        this.unPackFloat = function() {
            return this.unPackInt16() / 100
        }
        ,
        this.unPackString = function(e) {
            e = e || 1e3;
            for (var t = Math.min(this.unPackInt8U(), e), a = new String, n = 0; n < t; n++) {
                var o = this.unPackInt16U();
                o > 0 && (a += String.fromCharCode(o))
            }
            return a
        }
    }
};
"undefined" != typeof module && (module.exports = Comm);
var GameMap = {
    makeMinMap: function(e) {
        e.min = {},
        e.min.width = e.width,
        e.min.depth = e.depth,
        e.min.height = e.height,
        e.min.data = {};
        for (var t = 0; t < e.width; t++)
            for (var a = 0; a < e.height; a++)
                for (var n = 0; n < e.depth; n++) {
                    var o = e.data[t][a][n];
                    o.cat && (e.min.data[o.cat] || (e.min.data[o.cat] = {}),
                    e.min.data[o.cat][o.dec] || (e.min.data[o.cat][o.dec] = []),
                    e.min.data[o.cat][o.dec].push({
                        x: t,
                        y: a,
                        z: n,
                        dir: o.dir
                    }))
                }
    },
    generateMap: function(e, t, a, n) {
        Math.seed = n;
        var o = {};
        o.width = e,
        o.depth = t,
        o.height = a,
        o.seed = n,
        o.data = Array(o.width);
        for (h = 0; h < o.width; h++) {
            o.data[h] = Array(o.height);
            for (g = 0; g < o.height; g++)
                o.data[h][g] = Array(o.depth).fill({})
        }
        for (p = 0; p < o.width * o.depth; )
            for (var i = Math.min(Math.ceil((o.width + o.depth) / 8), 5), s = Math.seededRandomInt(1, i), r = Math.seededRandomInt(1, i), l = Math.seededRandomInt(1, p % o.height), h = Math.seededRandomInt(1, o.width - 1 - s), c = Math.seededRandomInt(1, o.depth - 1 - r), d = (Math.seededRandomInt(1, 4),
            h); d < h + s; d++)
                for (var u = c; u < c + r; u++)
                    for (var m = 0; m < l; m++)
                        try {
                            o.data[d][m][u].cat || (o.data[d][m][u] = {
                                cat: 1,
                                dec: 4,
                                dir: Math.seededRandomInt(0, 4)
                            },
                            p++)
                        } catch (e) {
                            console.log(d, m, u)
                        }
        for (var p = 0; p < o.width * o.depth / 10; ) {
            var h = Math.seededRandomInt(1, o.width - 1)
              , g = Math.floor(o.height - 1 - Math.pow(Math.seededRandom(0, 1), 2) * (o.height - 1))
              , c = Math.seededRandomInt(1, o.depth - 1);
            o.data[h][g][c].cat || 0 != g && 1 != o.data[h][g - 1][c].cat || (1 != o.data[h][g][c + 1].cat || o.data[h][g + 1][c + 1].cat || o.data[h][g][c - 1].cat || 0 != g && 1 != o.data[h][g - 1][c - 1].cat ? 1 != o.data[h + 1][g][c].cat || o.data[h + 1][g + 1][c].cat || o.data[h - 1][g][c].cat || 0 != g && 1 != o.data[h - 1][g - 1][c].cat ? 1 != o.data[h][g][c - 1].cat || o.data[h][g + 1][c - 1].cat || o.data[h][g][c + 1].cat || 0 != g && 1 != o.data[h][g - 1][c + 1].cat ? 1 != o.data[h - 1][g][c].cat || o.data[h - 1][g + 1][c].cat || o.data[h + 1][g][c].cat || 0 != g && 1 != o.data[h + 1][g - 1][c].cat || (o.data[h][g][c] = {
                cat: 2,
                dec: 0,
                dir: 3
            },
            p++) : (o.data[h][g][c] = {
                cat: 2,
                dec: 0,
                dir: 2
            },
            p++) : (o.data[h][g][c] = {
                cat: 2,
                dec: 0,
                dir: 1
            },
            p++) : (o.data[h][g][c] = {
                cat: 2,
                dec: 0,
                dir: 0
            },
            p++))
        }
        for (var y = 0; y < o.width * o.depth; y++) {
            var h = Math.seededRandomInt(1, o.width - 1)
              , g = Math.seededRandomInt(0, o.height - 1)
              , c = Math.seededRandomInt(1, o.depth - 1);
            o.data[h][g][c].cat || 0 != g && 1 != o.data[h][g - 1][c].cat || (o.data[h][g][c] = {
                cat: 4,
                dec: 0,
                dir: 0
            })
        }
        for (h = 0; h < o.width; h++)
            for (c = 0; c < o.depth; c++)
                for (g = 0; g < o.height - 1; g++)
                    !o.data[h][g][c].cat && this.numNeighbors6(o, h, g, c) >= 4 && !o.data[h][g + 1][c].cat && (o.data[h][g][c] = {
                        cat: 1,
                        dec: this.firstNeighborDec(o, h, g, c),
                        dir: Math.seededRandomInt(0, 4)
                    });
        for (h = 0; h < o.width; h++)
            for (g = 0; g < o.height; g++)
                for (c = 0; c < o.depth; c++)
                    o.data[h][g][c].cat && 6 == GameMap.numNeighbors6(o, h, g, c) && (o.data[h][g][c].cat = 1,
                    o.data[h][g][c].dec = 0);
        return GameMap.makeMinMap(o),
        o
    },
    firstNeighborDec: function(e, t, a, n) {
        for (var o = Math.max(1, t - 1); o <= Math.min(e.width - 2, t + 1); o++)
            for (var i = Math.max(0, a - 1); i <= Math.min(e.height - 1, a + 1); i++)
                for (var s = Math.max(1, n - 1); s <= Math.min(e.depth - 2, n + 1); s++)
                    if ((t != o || a != i || n != s) && 1 == e.data[o][i][s].cat)
                        return e.data[o][i][s].dec;
        return 0
    },
    numNeighbors6: function(e, t, a, n) {
        for (var o = 0, i = Math.max(1, t - 1); i <= Math.min(e.width - 2, t + 1); i++)
            for (var s = Math.max(0, a - 1); s <= Math.min(e.height - 1, a + 1); s++)
                for (var r = Math.max(1, n - 1); r <= Math.min(e.depth - 2, n + 1); r++)
                    Math.abs(i - t) + Math.abs(s - a) + Math.abs(r - n) == 1 && 1 == e.data[i][s][r].cat && o++;
        return 0 == a && o++,
        o
    },
    numNeighbors26: function(e, t, a, n) {
        for (var o = 0, i = Math.max(1, t - 1); i <= Math.min(e.width - 2, t + 1); i++)
            for (var s = Math.max(0, a - 1); s <= Math.min(e.height - 1, a + 1); s++)
                for (var r = Math.max(1, n - 1); r <= Math.min(e.depth - 2, n + 1); r++)
                    t == i && a == s && n == r || 1 == e.data[i][s][r].cat && o++;
        return 0 == a && o++,
        o
    }
};
if ("undefined" != typeof module && (module.exports = GameMap),
"undefined" != typeof require)
    var GunActor = null
      , Eggk47Actor = null
      , DozenGaugeActor = null
      , CSG1Actor = null
      , Cluck9mmActor = null;
if (Gun.prototype.update = function(e) {
    this.actor && (this.actor.update(e),
    this.triggerPulled && this.queueShot()),
    this.shotsQueued > 0 && 0 == this.equipCountdown && (this.actor ? (this.fire(),
    this.shotsQueued = 0) : 0 == this.rofCountdown && (this.fire(),
    this.rofCountdown = .8 * this.rof,
    this.shotsQueued--)),
    this.rofCountdown > 0 && (this.rofCountdown = Math.max(0, this.rofCountdown - e)),
    this.actor || (this.equipCountdown > 0 && (this.equipCountdown = Math.max(0, this.equipCountdown - e)),
    this.reloadCountdown > 0 && (this.reloadCountdown -= e,
    this.reloadCountdown <= 0 && (this.reloadCountdown = 0,
    this.reload())))
}
,
Gun.prototype.collectAmmo = function() {
    return this.ammo.store < this.ammo.storeMax && (this.ammo.store = Math.min(this.ammo.storeMax, this.ammo.store + this.ammo.pickup),
    !0)
}
,
Gun.prototype.queueShot = function() {
    if (this.ammo.rounds > 0) {
        if (this.isAtReady())
            if (this.actor) {
                if (0 == this.rofCountdown) {
                    this.shotsQueued++,
                    this.rofCountdown = this.rof;
                    var e = new Comm.output(6);
                    e.packInt8(Comm.fire),
                    e.packInt8(this.player.id),
                    e.packRad(this.player.pitch),
                    e.packRadU(this.player.viewYaw),
                    this.game.ws.send(e.buffer),
                    0 == this.automatic && (this.triggerPulled = !1)
                }
            } else
                this.shotsQueued++
    } else
        this.actor && this.actor.dryFire(),
        this.triggerPulled = !1
}
,
Gun.prototype.fire = function() {
    if (this.ammo.rounds--,
    this.actor)
        this.actor.fire(),
        this.player.actor.fire(),
        this.player.id == this.game.meId && this.game.updateAmmoUi();
    else {
        var e = BABYLON.Matrix.RotationYawPitchRoll(this.player.viewYaw, this.player.pitch, 0)
          , t = BABYLON.Matrix.Translation(0, 0, 1).multiply(e)
          , a = .002 * (this.player.shotSpread + this.player.weapon.accuracy)
          , n = BABYLON.Matrix.RotationYawPitchRoll((Math.random() - .5) * a, (Math.random() - .5) * a, (Math.random() - .5) * a)
          , o = (t = t.multiply(n)).getTranslation()
          , i = BABYLON.Matrix.Translation(.1, .1, .6)
          , s = (i = (i = i.multiply(e)).add(BABYLON.Matrix.Translation(this.player.x, this.player.y + .3, this.player.z))).getTranslation();
        this.fireMunitions(s, o)
    }
    this.player.dx *= .5,
    this.player.dz *= .5,
    this.player.shotSpread += this.shotSpreadIncrement,
    0 == this.ammo.rounds && (this.actor && Sounds.hammerClick.play(),
    this.triggerPulled = !1)
}
,
Gun.prototype.startReload = function() {
    return 0 != this.ammo.store && 0 != this.isAtReady() && !this.triggerPulled && (this.ammo.rounds != this.ammo.capacity && (0 == this.ammo.rounds ? this.reloadCountdown = this.longReloadTime : this.reloadCountdown = this.shortReloadTime,
    this.actor && this.actor.reload(),
    !0))
}
,
Gun.prototype.reload = function() {
    var e = Math.min(Math.min(this.ammo.capacity, this.ammo.reload) - this.ammo.rounds, this.ammo.store);
    if (this.ammo.rounds += e,
    this.ammo.store -= e,
    this.actor)
        this.reloadCountdown = 0,
        this.player.id == this.game.meId && this.game.updateAmmoUi();
    else {
        var t = new Comm.output(1);
        t.packInt8(Comm.reload),
        this.player.ws.safeSend(t.buffer)
    }
}
,
Gun.prototype.equip = function() {
    this.equipCountdown = this.equipTime,
    this.shotsQueued = 0,
    this.triggerPulled = !1,
    this.player.shotSpread += this.shotSpreadIncrement,
    this.actor && this.actor.equip()
}
,
Gun.prototype.stow = function() {
    return 0 != this.isAtReady() && !this.triggerPulled && (this.player.stowWeaponCountdown = this.stowWeaponTime,
    this.actor && this.actor.stow(),
    !0)
}
,
Gun.prototype.isAtReady = function() {
    return 0 == this.shotsQueued && 0 == this.reloadCountdown && 0 == this.equipCountdown && 0 == this.player.stowWeaponCountdown && !this.player.isDead()
}
,
Eggk47.prototype = Object.create(Gun.prototype),
Eggk47.prototype.constructor = Gun,
Eggk47.prototype.fireMunitions = function(e, t) {
    this.game.munitionsManager.fireBullet(this.player, e, t, this.damage, this.ttl, this.velocity);
    var a = new Comm.output(14);
    a.packInt8(Comm.fireBullet),
    a.packInt8(this.player.id),
    a.packFloat(e.x),
    a.packFloat(e.y),
    a.packFloat(e.z),
    a.packFloat(t.x),
    a.packFloat(t.y),
    a.packFloat(t.z),
    this.game.send(a.buffer)
}
,
DozenGauge.prototype = Object.create(Gun.prototype),
DozenGauge.prototype.constructor = Gun,
DozenGauge.prototype.fireMunitions = function(e, t) {
    var a = Date.now() % 256;
    Math.seed = a;
    for (var n = 0; n < 20; n++) {
        var o = Math.normalize3({
            x: t.x + Math.seededRandom(-.15, .15),
            y: t.y + Math.seededRandom(-.1, .1),
            z: t.z + Math.seededRandom(-.15, .15)
        });
        this.game.munitionsManager.fireBullet(this.player, e, o, this.damage, this.ttl, this.velocity)
    }
    var i = new Comm.output(15);
    i.packInt8(Comm.fireShot),
    i.packInt8(this.player.id),
    i.packFloat(e.x),
    i.packFloat(e.y),
    i.packFloat(e.z),
    i.packFloat(t.x),
    i.packFloat(t.y),
    i.packFloat(t.z),
    i.packInt8(a),
    this.game.send(i.buffer)
}
,
CSG1.prototype = Object.create(Gun.prototype),
CSG1.prototype.constructor = Gun,
CSG1.prototype.fireMunitions = function(e, t) {
    this.game.munitionsManager.fireBullet(this.player, e, t, this.damage, this.ttl, this.velocity);
    var a = new Comm.output(14);
    a.packInt8(Comm.fireBullet),
    a.packInt8(this.player.id),
    a.packFloat(e.x),
    a.packFloat(e.y),
    a.packFloat(e.z),
    a.packFloat(t.x),
    a.packFloat(t.y),
    a.packFloat(t.z),
    this.game.send(a.buffer)
}
,
Cluck9mm.prototype = Object.create(Gun.prototype),
Cluck9mm.prototype.constructor = Gun,
Cluck9mm.prototype.fireMunitions = function(e, t) {
    this.game.munitionsManager.fireBullet(this.player, e, t, this.damage, this.ttl, this.velocity);
    var a = new Comm.output(14);
    a.packInt8(Comm.fireBullet),
    a.packInt8(this.player.id),
    a.packFloat(e.x),
    a.packFloat(e.y),
    a.packFloat(e.z),
    a.packFloat(t.x),
    a.packFloat(t.y),
    a.packFloat(t.z),
    this.game.send(a.buffer)
}
,
"undefined" != typeof module && (module.exports = {
    Eggk47: Eggk47,
    DozenGauge: DozenGauge,
    CSG1: CSG1,
    Cluck9mm: Cluck9mm
}),
Math.PI2 = 2 * Math.PI,
Math.mod = function(e, t) {
    var a = e % t;
    return a >= 0 ? a : a + t
}
,
Math.length2 = function(e, t) {
    return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2))
}
,
Math.length3 = function(e, t, a) {
    return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2) + Math.pow(a, 2))
}
,
Math.normalize3 = function(e) {
    var t = Math.length3(e.x, e.y, e.z);
    return e.x *= 1 / t,
    e.y *= 1 / t,
    e.z *= 1 / t,
    e
}
,
Math.radAdd = function(e, t) {
    return Math.mod(e + t, Math.PI2)
}
,
Math.radSub = function(e, t) {
    return Math.mod(e - t, Math.PI2)
}
,
Math.radRange = function(e) {
    return Math.mod(e, Math.PI2)
}
,
Math.radDifference = function(e, t) {
    var a = (e - t + Math.PI) % Math.PI2 - Math.PI;
    return a = a < -Math.PI ? a + Math.PI2 : a
}
,
Math.randomInt = function(e, t) {
    return Math.floor(Math.random() * (t - e) + e)
}
,
Math.seed = 100,
Math.seededRandom = function(e, t) {
    return e = e || 0,
    t = t || 1,
    Math.seed = (9301 * Math.seed + 49297) % 233280,
    e + Math.seed / 233280 * (t - e)
}
,
Math.seededRandomInt = function(e, t) {
    return Math.floor(Math.seededRandom(e, t))
}
,
MunitionsManager.prototype.update = function(e) {
    for (var t = this, a = 0; a < 4; a++)
        this.bulletPool.forEachActive(function(a) {
            a.update(.25 * e),
            Object.keys(t.game.players).forEach(function(e) {
                var n = t.game.players[e];
                n && !n.isDead() && Math.abs(a.x - n.x) < .3 && Math.abs(a.y - (n.y + .3)) < .3 && Math.abs(a.z - n.z) < .3 && (t.game.hitPlayer(n, a),
                t.bulletPool.recycle(a))
            })
        })
}
,
MunitionsManager.prototype.fireBullet = function(e, t, a, n, o, i) {
    this.bulletPool.retrieve().fire(e, t, a, n, o, i)
}
,
"undefined" != typeof module && (module.exports = MunitionsManager),
"undefined" != typeof require)
    var PlayerActor = null;
var CONTROL = {
    up: 1,
    down: 2,
    left: 4,
    right: 8
}
  , classes = [{
    name: "Soldier",
    weapon: Eggk47
}, {
    name: "Scrambler",
    weapon: DozenGauge
}, {
    name: "Free Ranger",
    weapon: CSG1
}];
Player.prototype.update = function(e) {
    var t = 0
      , a = 0;
    this.controlKeys & CONTROL.left && (t -= Math.cos(this.moveYaw),
    a += Math.sin(this.moveYaw)),
    this.controlKeys & CONTROL.right && (t += Math.cos(this.moveYaw),
    a -= Math.sin(this.moveYaw)),
    this.controlKeys & CONTROL.up && (t += Math.sin(this.moveYaw),
    a += Math.cos(this.moveYaw)),
    this.controlKeys & CONTROL.down && (t -= Math.sin(this.moveYaw),
    a -= Math.cos(this.moveYaw));
    var n = new BABYLON.Vector2(t,a).normalize()
      , o = this.dx
      , i = this.dy
      , s = this.dz;
    this.dx += .007 * n.x * e,
    this.dz += .007 * n.y * e,
    this.dy -= .003 * e;
    var r = .5 * (this.dx + o) * e
      , l = .5 * (this.dy + i) * e
      , h = .5 * (this.dz + s) * e;
    if (this.x += r,
    this.collidesWithMap()) {
        c = this.y;
        this.y += Math.abs(r),
        this.collidesWithMap() && (this.x -= r,
        this.dx *= Math.pow(.5, e),
        this.y = c)
    }
    if (this.z += h,
    this.collidesWithMap()) {
        var c = this.y;
        this.y += Math.abs(h),
        this.collidesWithMap() && (this.z -= h,
        this.dz *= Math.pow(.5, e),
        this.y = c)
    }
    this.y += l,
    this.collidesWithMap() ? (l < 0 && (this.jumping = !1),
    this.y -= l,
    this.dy *= Math.pow(.5, e)) : 0 == this.jumping && (this.jumping = !0);
    var d = Math.length3(this.dx, this.dy, this.dz);
    this.shotSpread += Math.floor(150 * d),
    this.shotSpread *= this.weapon.accuracySettleFactor,
    this.dx *= Math.pow(.8, e),
    this.dz *= Math.pow(.8, e),
    this.weapon && this.weapon.update(e),
    this.hp > 0 && (this.hp = Math.min(100, this.hp + .05 * e)),
    !this.actor && this.stowWeaponCountdown > 0 && (this.stowWeaponCountdown -= e,
    this.stowWeaponCountdown <= 0 && (this.stowWeaponCountdown = 0,
    this.equipWeapon(this.equipWeaponIdx))),
    this.isAI && this.doAI()
}
,
Player.prototype.doAI = function() {
    (Math.random() < .004 || playerTotal > botGoal && Math.random() < .01) && removePlayer(this.ws),
    Math.random() < .01 && (this.viewYaw = 6.282 * Math.random() - 3.141)
}
,
Player.prototype.jump = function() {
    var e = !this.jumping;
    e || (this.y -= .2,
    this.collidesWithMap() && (e = !0),
    this.y += .2),
    e && (this.dy = .06,
    this.jumping = !0)
}
,
Player.prototype.equipWeapon = function(e) {
    if (this.weaponIdx = e,
    this.weapon = this.weapons[e],
    this.weapons[e].equip(),
    this.actor)
        this.id == this.game.meId && this.game.updateAmmoUi();
    else {
        var t = new Comm.output(3);
        t.packInt8(Comm.equipWeapon),
        t.packInt8(this.id),
        t.packInt8(this.equipWeaponIdx),
        this.game.send(t.buffer)
    }
}
,
Player.prototype.stowWeapon = function(e) {
    if (this.equipWeaponIdx = e,
    this.weapon.stow())
        if (this.actor)
            (t = new Comm.output(2)).packInt8(Comm.stowWeapon),
            t.packInt8(e),
            this.ws.send(t.buffer);
        else {
            var t = new Comm.output(2);
            t.packInt8(Comm.stowWeapon),
            t.packInt8(this.id),
            this.game.sendToOthers(t.buffer, this.id)
        }
}
,
Player.prototype.addRotationShotSpread = function(e, t) {
    this.shotSpread += Math.sqrt(Math.pow(60 * e, 2) + Math.pow(60 * t, 2))
}
,
Player.prototype.collectItem = function(e) {
    switch (e) {
    case ItemManager.AMMO:
        return !!this.weapon.collectAmmo() && (this.actor && (Sounds.ammo.play(),
        this.game.updateAmmoUi()),
        !0)
    }
}
,
Player.prototype.queueShot = function() {
    if (this.hp > 0 && this.weapon)
        return this.weapon.queueShot()
}
,
Player.prototype.die = function() {
    this.hp = 0,
    this.killStreak = 0,
    this.controlKeys = 0,
    this.shotSpread = 0,
    this.jumping = !1,
    this.actor ? this.actor.die() : this.resetWeaponState()
}
,
Player.prototype.respawn = function(e, t, a) {
    this.x = e,
    this.y = t,
    this.z = a,
    this.hp = 100,
    this.actor && (this.actor.mesh.position.x = e,
    this.actor.mesh.position.y = t,
    this.actor.mesh.position.z = a,
    this.actor.respawn(),
    this.weapon.equip(),
    this.resetWeaponState(),
    this.id == this.game.meId && this.game.updateAmmoUi())
}
,
Player.prototype.resetWeaponState = function() {
    this.stowWeaponCountdown = 0;
    for (var e = 0; e < this.weapons.length; e++)
        this.weapons[e] && (this.weapons[e].ammo.rounds = this.weapons[e].ammo.capacity,
        this.weapons[e].reloadCountdown = 0,
        this.weapons[e].rofCountdown = 0,
        this.weapons[e].shotsQueued = 0,
        this.weapons[e].triggerPulled = !1,
        this.weapons[e].equipCountdown = 0)
}
,
Player.prototype.isDead = function() {
    return 0 == this.hp
}
,
Player.prototype.collidesWithMap = function() {
    var e = this.x - .5
      , t = this.y
      , a = this.z - .5;
    if (t > this.game.map.height - 1)
        return !1;
    if (t < 0)
        return !0;
    if (e < -.25 || a < -.25 || e > this.game.map.width - .75 || a > this.game.map.depth - .75)
        return !0;
    for (var n = .25; n <= .75; n += .25)
        for (var o = 0; o <= .6; o += .3)
            for (var i = .25; i <= .75; i += .25) {
                var s = e + n
                  , r = t + o
                  , l = a + i
                  , h = Math.floor(s)
                  , c = Math.floor(r)
                  , d = Math.floor(l);
                try {
                    var u = this.game.map.data[h][c][d];
                    if (1 == u.cat)
                        return u;
                    if (2 == u.cat) {
                        var m = s - h
                          , p = r - c
                          , g = l - d;
                        switch (u.dir) {
                        case 0:
                            if (p < g)
                                return u;
                            break;
                        case 2:
                            if (p < 1 - g)
                                return u;
                            break;
                        case 1:
                            if (p < m)
                                return u;
                            break;
                        case 3:
                            if (p < 1 - m)
                                return u
                        }
                    } else if (4 == u.cat) {
                        var p = r - c
                          , g = l - d;
                        if ((m = s - h) < .7 && m > .3 && g < .7 && g > .3 && p < .5)
                            return u
                    }
                } catch (e) {}
            }
    return !1
}
,
"undefined" != typeof module && (module.exports = Player),
Pool.prototype.expand = function(e) {
    for (var t = 0; t < e; t++) {
        var a = this.constructorFn();
        a.id = t + this.size,
        a.active = !1,
        this.objects.push(a)
    }
    this.size += e
}
,
Pool.prototype.retrieve = function(e) {
    if (void 0 != e)
        return this.numActive++,
        this.objects[e].active = !0,
        this.objects[e];
    var t = this.idx;
    do {
        t = (t + 1) % this.size;
        var a = this.objects[t];
        if (!a.active)
            return this.idx = t,
            this.numActive++,
            a.active = !0,
            a
    } while (t != this.idx);return this.expand(this.originalSize),
    log.out("Expanding pool for: " + this.objects[0].constructor.name + " to: " + this.size),
    this.retrieve()
}
,
Pool.prototype.recycle = function(e) {
    e.active = !1,
    this.numActive--
}
,
Pool.prototype.forEachActive = function(e) {
    for (var t = 0; t < this.size; t++) {
        var a = this.objects[t];
        !0 === a.active && e(a, t)
    }
}
,
"undefined" != typeof module && (module.exports = Pool);
