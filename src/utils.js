
function newScale(obj, scale) {
    obj.obj.scale.set(scale[0], scale[1], scale[2]);
    obj.width *= scale[0];
    obj.height *= scale[1];
    obj.depth *= scale[2];
    obj.intersectionLimit[0] *= scale[1];
    obj.intersectionLimit[1] *= scale[1];
}

function createCube(width, height, depth, material) {
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMesh = new THREE.Mesh(cubeGeometry, material);
    return cubeMesh;
}

function createPlane(width, height, material) {
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    return planeMesh;
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