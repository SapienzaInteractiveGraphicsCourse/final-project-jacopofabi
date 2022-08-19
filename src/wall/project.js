function createWall(wallColor, x, y, z) {
  const geometry = new THREE.PlaneGeometry(10000, 10000);
  const material = new THREE.MeshBasicMaterial({
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
  const material = new THREE.MeshBasicMaterial({
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
