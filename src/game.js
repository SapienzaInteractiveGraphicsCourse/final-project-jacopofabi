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

  camera.position.set(0, 40, 50);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(1, 1, 1);

  var mainScene = {
    scene: scene,
    cat: null,
    camera: camera,
    catspeed: 0,
    pause: false,
    limit: [20, -20, 100, -100, 100, -100],
  };

  const light = new THREE.DirectionalLight(0xffffff, 1); // soft white light
  light.position.set(0, 20, 20);
  light.target.position.set(-10, 0, 0);
  scene.add(light);
  scene.add(light.target);

  var lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(lightAmbient);

  const mixers = [];
  var clock = new THREE.Clock();

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  loadCatTexture(loader);

  loadManager.onLoad = () => {
    var cat = createCat();
    cat.obj.rotation.y += 180 * THREE.MathUtils.DEG2RAD;
    cat.obj.position.y += cat.height / 2;
    cat.obj.position.z -= 10;
    scene.add(cat.obj);
    mainScene.cat = cat;
    cat.mixers.forEach((mixer) => {
      mixers.push(mixer);
    });
  };

  setControl(document, window, renderer, mainScene);

  // pavimento
  const floor = createFloor(0x555555, 0, 0, 0);
  scene.add(floor);
  // ceiling
  const ceil = createFloor(0xffff00, 0, 80, 0);
  scene.add(ceil);
  // muro dx
  const wallDx = createWall(0xff00ff, 40, 0, 0);
  scene.add(wallDx);
  // muro sx
  const wallSx = createWall(0xff0000, -40, 0, 0);
  scene.add(wallSx);

  var obstacles = [];
  var elements = [];
  var time = 0;
  var nextSpawn = 1;
  var delta = 0;
  var direction = new THREE.Vector3(0, 0, 1);
  var catdirection = new THREE.Vector3(1, 0, 0);
  var speed = 100; // units a second - 2 seconds
  //var pause = false;

  // loop that runs every frame to render scene and camera
  function update() {
    requestAnimationFrame(update);
    delta = clock.getDelta(); //deve stare fuori dalla pausa
    if (mainScene.cat != null && mainScene.pause == false) {
      mixers.forEach((mixer) => {
        mixer.update(delta);
      });

      time += delta;
      if (time > nextSpawn) {
        cLight = createCeilingLamp();
        cLight.position.y = 78.5;
        cLight.position.z = -1500;
        cLight.rotation.x = 90 * THREE.MathUtils.DEG2RAD;

        windowE = createWindow(30, 50, 1, 2);
        windowE.position.set(39.5, 40, -1200);
        windowE.rotation.y = -90 * THREE.MathUtils.DEG2RAD;

        obj = obstaclesCreate("table");
        scene.add(obj.obj);
        scene.add(cLight);
        scene.add(windowE);
        obstacles.push(obj);
        elements.push(cLight);
        elements.push(windowE);
        nextSpawn += 10;
      }
      changePosition(mainScene.cat.obj.position, catdirection, mainScene.catspeed * delta, mainScene.limit);
      if (mainScene.catspeed > 0.0)
        mainScene.catspeed -= 5.0;
      else if (mainScene.catspeed < 0.0)
        mainScene.catspeed += 5.0;
      obstacles.forEach(function (cube) {
        cube.obj.position.addScaledVector(direction, speed * delta);
        if (checkIntersection(cube, mainScene.cat))
          mainScene.pause = true;
        if (cube.obj.position.z > 51)
          for (var i = 0; i < obstacles.length; i++) {
            if (obstacles[i] == cube) {
              obstacles.splice(i, 1);
              scene.remove(cube.obj);
              obstaclesDispose(cube);
            }
          }
      });
      elements.forEach(function (elem) {
        elem.position.addScaledVector(direction, speed * delta);
        if (elem.position.z > 51)
            scene.remove(elem);
      })
    }
    renderer.render(scene, camera);
  }
  update();
}

main();
