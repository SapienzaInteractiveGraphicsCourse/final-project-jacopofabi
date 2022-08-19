
function createCube(width, height, depth, material) {
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMesh = new THREE.Mesh(cubeGeometry, material);
    return cubeMesh;
}

//** To Remove *//
function resumePosition(obj, startObj) {
    obj.position.copy(startObj.position);
    obj.rotation.copy(startObj.rotation);
}

function rotateOnPoint(obj, point, axis, angle) {
    var newObj = obj.clone();
    newObj.position.sub(point);
    newObj.position.applyAxisAngle(axis, angle);
    newObj.position.add(point);
    newObj.rotateOnAxis(axis, angle);
    return ([newObj.position, newObj.quaternion]);
}