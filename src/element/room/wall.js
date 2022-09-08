
function createWall(material, width, height) {
  const geometryWall = new THREE.PlaneGeometry(width, height);
  const materialWall = material;
  const wall = new THREE.Mesh(geometryWall, materialWall);
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
  .moveTo(32.5, -20)
  .lineTo(32.5, 30)
  .lineTo(57.5, 30)
  .lineTo(57.5, -20)

  const holeWindow2 = new THREE.Path()
  .moveTo(2.5, -20)
  .lineTo(2.5, 30)
  .lineTo(27.5, 30)
  .lineTo(27.5, -20)

  const holeWindow3 = new THREE.Path()
  .moveTo(-27.5, -20)
  .lineTo(-27.5, 30)
  .lineTo(-2.5, 30)
  .lineTo(-2.5, -20)

  const holeWindow4 = new THREE.Path()
  .moveTo(-57.5, -20)
  .lineTo(-57.5, 30)
  .lineTo(-32.5, 30)
  .lineTo(-32.5, -20)

  wallShape.holes.push(holeWindow1);
  wallShape.holes.push(holeWindow2);
  wallShape.holes.push(holeWindow3);
  wallShape.holes.push(holeWindow4);

  const geometryWall = new THREE.ShapeGeometry(wallShape);
    const materialWall = new THREE.MeshPhysicalMaterial({
      color: wallColor,
      side: THREE.DoubleSide,
  });
  const meshWall = new THREE.Mesh(geometryWall, materialWall);

  var w1 = createWindow(25, 50, 2, 1.5);
  var w2 = createWindow(25, 50, 2, 1.5);
  var w3 = createWindow(25, 50, 2, 1.5);
  var w4 = createWindow(25, 50, 2, 1.5);

  w1.position.set(45, 5, 0);
  w2.position.set(15, 5, 0);
  w3.position.set(-15, 5, 0);
  w4.position.set(-45, 5, 0);

  meshWall.add(w1);
  meshWall.add(w2);
  meshWall.add(w3);
  meshWall.add(w4);

  ret.add(meshWall);

  return ret;
}

function createWallWindowsV2(wallColor) {

  const ret = new THREE.Object3D();

  const wallShape = new THREE.Shape()
  .moveTo(-60, -40)
  .lineTo(60, -40)
  .lineTo(60, 40)
  .lineTo(-60, 40)

  const holeWindow1 = new THREE.Path()
  .moveTo(32.5, -20)
  .lineTo(32.5, 30)
  .lineTo(57.5, 30)
  .lineTo(57.5, -20)

  const holeWindow2 = new THREE.Path()
  .moveTo(2.5, -20)
  .lineTo(2.5, 30)
  .lineTo(27.5, 30)
  .lineTo(27.5, -20)

  const holeWindow3 = new THREE.Path()
  .moveTo(-27.5, -20)
  .lineTo(-27.5, 30)
  .lineTo(-2.5, 30)
  .lineTo(-2.5, -20)

  const holeWindow4 = new THREE.Path()
  .moveTo(-57.5, -20)
  .lineTo(-57.5, 30)
  .lineTo(-32.5, 30)
  .lineTo(-32.5, -20)

  wallShape.holes.push(holeWindow1);
  wallShape.holes.push(holeWindow2);
  wallShape.holes.push(holeWindow3);
  wallShape.holes.push(holeWindow4);

  const geometryWall = new THREE.ShapeGeometry(wallShape);
    const materialWall = new THREE.MeshPhysicalMaterial({
      color: wallColor,
  });
  const meshWall = new THREE.Mesh(geometryWall, materialWall);

  var w1 = createWindow(25, 50, 2, 1.5);
  var w2 = createWindow(25, 50, 2, 1.5);
  var w3 = createWindow(25, 50, 2, 1.5);
  var w4 = createWindow(25, 50, 2, 1.5);

  w1.position.set(45, 5, 0);
  w2.position.set(15, 5, 0);
  w3.position.set(-15, 5, 0);
  w4.position.set(-45, 5, 0);

  meshWall.add(w1);
  meshWall.add(w2);
  meshWall.add(w3);
  meshWall.add(w4);

  ret.add(meshWall);

  return ret;
}
