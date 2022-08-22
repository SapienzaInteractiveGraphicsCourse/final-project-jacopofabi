function createWall(wallColor, x, y, z) {
  const geometry = new THREE.PlaneGeometry(10000, 10000);
  const material = new THREE.MeshPhongMaterial({
    color: wallColor,
    side: THREE.DoubleSide,
  });
  const wall = new THREE.Mesh(geometry, material);
  wall.position.x = x;
  wall.position.y += y;
  wall.position.z += z;
  wall.rotation.y += 90 * THREE.MathUtils.DEG2RAD;
  return wall;
}

function createFloor(wallColor, x, y, z) {
  const geometry = new THREE.PlaneGeometry(10000, 10000);
  const material = new THREE.MeshPhongMaterial({
    color: wallColor,
    side: THREE.DoubleSide,
  });
  const wall = new THREE.Mesh(geometry, material);
  wall.position.x = x;
  wall.position.y += y;
  wall.position.z += z;
  wall.rotation.x += 90 * THREE.MathUtils.DEG2RAD;
  return wall;
}

function createWall2(wallColor) {

  const ret = new THREE.Object3D();

  const wallShape = new THREE.Shape()
  .moveTo(-60, -30)
  .lineTo(60, -30)
  .lineTo(60, 30)
  .lineTo(-60, 30)

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

  ret.scale.set(0.1, 0.1, 0.1);
  ret.add(meshWall);

  return ret;


}
