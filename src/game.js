
function changePosition(position, catdirection, speed, limit) {
  position.addScaledVector(catdirection, speed);
  if (position.x >= limit[0])
    position.x = limit[0];
  else if (position.x <= limit[1])
    position.x = limit[1];
  //if (position.y >= limit[2])
  //  position.y = limit[2];
  //else if (position.y <= limit[3])
  //  position.y = limit[3];
  //if (position.z >= limit[4])
  //  position.z = limit[4];
  //if (position.z <= limit[5])
  //  position.z = limit[5];
}

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1, 
  1000
);

function main() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 40, 40);

  const scene = new THREE.Scene(); 
  scene.background = new THREE.Color("rgb(255, 255, 255)");

  var mainScene = {
    scene: scene,
    cat: null,
    camera: camera,
    catspeed: 0,
    ambientSpeed: 100,
    pause: false,
    room: null,
    elementsA: [],
    wallsA: [],
    obstaclesA: [],
    tweenGA: [],
    limit: [20, -20, 100, -100, 100, -100],
    distance: 0,
    limitDistance: 6,
    widthRoom: 80,
    heightRoom: 80,
    depthRoom: 120,
    mixers: [],
  };

  const light = new THREE.DirectionalLight(0xffffff, 0.7); // soft white light
  light.position.set(150, 50, -100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);
  scene.add(light.target);

  var lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(lightAmbient);

  var clock = new THREE.Clock();

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  loadCatTexture(loader);
  loadWallTexture(loader);

  loadManager.onLoad = () => {
    var cat = createCat();
    cat.obj.rotation.y += 180 * THREE.MathUtils.DEG2RAD;
    cat.obj.position.y += cat.height / 2;
    cat.obj.position.z -= 10;
    scene.add(cat.obj);
    mainScene.cat = cat;
    cat.mixers.forEach((mixer) => {
      mainScene.mixers.push(mixer);
    });
    createWay(mainScene);
  };

  setControl(document, window, renderer, mainScene);

  var delta = 0;
  var catdirection = new THREE.Vector3(1, 0, 0);
  //var pause = false;

  // loop that runs every frame to render scene and camera
  function update() {
    requestAnimationFrame(update);
    delta = clock.getDelta(); //deve stare fuori dalla pausa
    mainScene.tweenGA.forEach(group => {
      group.update();
    });
    if (mainScene.cat != null && mainScene.pause == false) {
      mainScene.mixers.forEach((mixer) => {
        mixer.update(delta);
      });
      changePosition(mainScene.cat.obj.position, catdirection, mainScene.catspeed * delta, mainScene.limit);
      if (mainScene.catspeed > 0.0)
        mainScene.catspeed -= 5.0;
      else if (mainScene.catspeed < 0.0)
        mainScene.catspeed += 5.0;
      updateScene(mainScene, delta);
      mainScene.room = checkIn(mainScene.cat, mainScene.elementsA, mainScene.wallsA);
      if (mainScene.room && checkIntersection(mainScene.room.obstacles, mainScene.cat))
        mainScene.pause = true;
      mainScene.pause = true;
      console.log("La room in cui è dentro:", mainScene.room);
    }
    renderer.render(scene, camera);
  }
  update();
}

main();
