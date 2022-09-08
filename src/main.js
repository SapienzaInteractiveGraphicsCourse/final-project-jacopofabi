
function main() {

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 50);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(1.0, 1.0, 1.0);

  var mainScene = {
    scene: scene,
    cat: null,
    camera: camera,
    deltaX: 0,
    deltaY: 0,
    deltaZ: 0,
  };

  setControl(document, window, renderer, mainScene);

  const light = new THREE.DirectionalLight(0xffffff, 1); // soft white light
  light.position.set(0, 20, 20);
  light.target.position.set(-10, 0, 0);
  scene.add(light);
  scene.add(light.target);

  const mixers = [];
  const clock = new THREE.Clock();

  /*const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  loadCatTexture(loader);

  loadManager.onLoad = () => {
    var cat = createCat();
    //scene.add(cat.obj);
    mainScene.cat = cat;
    cat.mixers.forEach((mixer) => {
      mixers.push(mixer);
    });
    cat.playAnimation("slip", false);
  };*/

  //var obj = createCeilingLamp(5, 5, 2);
  //var obj = createWindow(10, 20, 1, 1);
  var obj = createTurnstile();
  scene.add(obj.obj);

  console.log(obj.obj.position);

  function render() {
    const delta = clock.getDelta();
    mixers.forEach((mixer) => {
      mixer.update(delta);
    });

    obj.obj.rotation.x = mainScene.deltaX * THREE.MathUtils.DEG2RAD;
    obj.obj.rotation.y = mainScene.deltaY * THREE.MathUtils.DEG2RAD;
    obj.obj.rotation.z = mainScene.deltaZ * THREE.MathUtils.DEG2RAD;
  
    if (mainScene.cat != null) {
      mainScene.cat.obj.obj.rotation.x = mainScene.deltaX * THREE.MathUtils.DEG2RAD;
      mainScene.cat.obj.obj.rotation.y = mainScene.deltaY * THREE.MathUtils.DEG2RAD;
      mainScene.cat.obj.obj.rotation.z = mainScene.deltaZ * THREE.MathUtils.DEG2RAD;
    }

    //table.rotation.x = mainScene.deltaX * THREE.MathUtils.DEG2RAD;
    //table.rotation.y = mainScene.deltaY * THREE.MathUtils.DEG2RAD;
    //table.rotation.z = mainScene.deltaZ * THREE.MathUtils.DEG2RAD;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
