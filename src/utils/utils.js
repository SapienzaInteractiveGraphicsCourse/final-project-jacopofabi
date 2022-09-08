
function placeObj(obj, pos, rot, scale) {
    if (pos != null)
        obj.position.set(pos[0], pos[1], pos[2]);
    if (rot != null)
        obj.rotation.set(rot[0], rot[1], rot[2]); //da verificare che rotation.set esista
    if (scale != null)
        obj.scale.set(scale[0], scale[1], scale[0]);
}

function disposeFromArray(scene, obj, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) {
          array.splice(i, 1);
          scene.remove(obj.obj);
          obj.dispose();
          break ;
        }
    }
}

function removeFromArray(scene, obj, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) {
          array.splice(i, 1);
          scene.remove(obj.obj);
          obj.available = true;
          break ;
        }
    } 
}

function objDispose(obj) {
    obj.children.forEach((child) => {
        if (child.geometry != null)  //probabile che si possa levare
            child.geometry.dispose();
        if (child.material != null)  //probabile che si possa levare
            child.material.dispose();
    });
  }

function newScale(obj, scale) {
    obj.obj.scale.set(scale[0], scale[1], scale[2]);
    obj.width *= scale[0];
    obj.height *= scale[1];
    obj.depth *= scale[2];
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

function rotateOnPointV2(obj, point, axis, angle) {
    obj.position.sub(point);
    obj.position.applyAxisAngle(axis, angle);
    obj.position.add(point);
    obj.rotateOnAxis(axis, angle);
}

function rotateOnPoint(obj, point, axis, angle) {
    var newObj = obj.clone();
    newObj.position.sub(point);
    newObj.position.applyAxisAngle(axis, angle);
    newObj.position.add(point);
    newObj.rotateOnAxis(axis, angle);
    return ([newObj.position, newObj.quaternion]);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}