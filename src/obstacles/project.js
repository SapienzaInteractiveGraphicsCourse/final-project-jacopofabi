function obstaclesCreate(obColor) {
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: obColor });

  cube = new THREE.Mesh(geometry, material);

  return cube;
}
