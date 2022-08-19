// we need three things: scene, camera and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);
// PerspectiveCamera(FieldOfView, aspectRatio, near, far)
// near and far set what we don't want to render
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);
const catTexture = [
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/lateralBody.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/frontFace.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/lateralFace.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/lateralFace2.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/eye.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/nose.png"),
  }),
  new THREE.MeshBasicMaterial({
    map: loader.load("cat/texture/ear.png"),
  }),
];

const cat = createCat(catTexture);
cat.obj.rotation.y += 180 * THREE.MathUtils.DEG2RAD;
cat.obj.position.y += 7.5;
cat.obj.position.z -= 0;
scene.add(cat.obj);

// pavimento
const floor = createFloor(0x555555, 0, 0, 0);
scene.add(floor);
// ceiling
const ceil = createFloor(0x00ffff, 0, 80, 0);
scene.add(ceil);
// muro dx
const wallDx = createWall(0x00ff00, 40, 0, 0);
scene.add(wallDx);
// muro sx
const wallSx = createWall(0xff0000, -40, 0, 0);
scene.add(wallSx);

camera.position.z = 50;
camera.position.y = 40;

var obstacles = [];

// loop that runs every frame to render scene and camera
var clock = new THREE.Clock();
var time = 0;
var nextSpawn = 1;
var delta = 0;
var direction = new THREE.Vector3(0, 0, 1);
var catdirection = new THREE.Vector3(1, 0, 0);
var speed = 20; // units a second - 2 seconds
var catspeed = 0;
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onKeyPress(key) {
  if (key == "a" && cat != null) {
    catspeed -= 5;
  }
  if (key == "d" && cat != null) {
    catspeed += 5;
  }
}
document.addEventListener(
  "keypress",
  (e) => {
    onKeyPress(e.key, scene);
  },
  false
);
window.addEventListener("resize", onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);

  delta = clock.getDelta();
  time += delta;
  // if (time > nextSpawn) {
  //   obj = obstaclesCreate(
  //     "#" + Math.floor(Math.random() * 16777215).toString(16)
  //   );
  //   scene.add(obj);
  //   obstacles.push(obj);
  //   nextSpawn += 1;
  // }
  if (catspeed >= -0.5 && catspeed <= 0) catspeed = 0;
  else if (catspeed < 0) catspeed += 0.5;
  else if (catspeed <= 0.5) catspeed = 0;
  else if (catspeed >= 0.5) catspeed -= 0.5;
  console.log(catspeed);
  cat.obj.position.addScaledVector(catdirection, catspeed * delta);
  obstacles.forEach(function (cube) {
    cube.position.addScaledVector(direction, speed * delta);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (cube.position.z > 51)
      for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i] === cube) {
          obstacles.splice(i, 1);
          scene.remove(cube);
        }
      }
  });
  // cat.obj.rotation.x += 0.01;
  // cat.obj.rotation.y += 0.01;
  // cat.obj.rotation.z += 0.01;
  // colorHex += 0;
  // cube.material.color.setHex(colorHex);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // let colorHex = 0xff0000;
  // let material = new THREE.MeshBasicMaterial({ color: colorHex });
  // const cube = new THREE.Mesh(geometry, material);
  // // console.log(cube);
  // scene.add(cube);
  // obstacles.append(cube);
  renderer.render(scene, camera);
}

animate();
