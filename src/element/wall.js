
function createWall(wallColor, width, height) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshPhongMaterial({
    color: wallColor,
    side: THREE.DoubleSide,
  });
  const wall = new THREE.Mesh(geometry, material);
  return wall;
}

function createWallWindows(wallColor) {

  const ret = new THREE.Object3D();

  const wallShape = new THREE.Shape()
  .moveTo(-60, -40)
  .lineTo(60, -40)
  .lineTo(60, 40)
  .lineTo(-60, 40)

  const holeWindow1 = new THREE.Path()
  .moveTo(30, -20)
  .lineTo(30, 20)
  .lineTo(50, 20)
  .lineTo(50, -20)

  const holeWindow2 = new THREE.Path()
  .moveTo(-10, -20)
  .lineTo(-10, 20)
  .lineTo(10, 20)
  .lineTo(10, -20)

  const holeWindow3 = new THREE.Path()
  .moveTo(-50, -20)
  .lineTo(-50, 20)
  .lineTo(-30, 20)
  .lineTo(-30, -20)

  wallShape.holes.push(holeWindow1);
  wallShape.holes.push(holeWindow2);
  wallShape.holes.push(holeWindow3);

  const geometryWall = new THREE.ShapeGeometry(wallShape);
    const materialWall = new THREE.MeshPhysicalMaterial({
      color: wallColor,
  });
  const meshWall = new THREE.Mesh(geometryWall, materialWall);

  var w1 = createWindow(20, 40, 1, 1);
  var w2 = createWindow(20, 40, 1, 1);
  var w3 = createWindow(20, 40, 1, 1);

  w1.position.set(-40, 0, 0);
  w2.position.set(0, 0, 0);
  w3.position.set(40, 0, 0);

  meshWall.add(w1);
  meshWall.add(w2);
  meshWall.add(w3);

  ret.add(meshWall);

  return ret;
}
