
function moveWall(wall, position, elements) {
    var i = position - 1;
    if (i == -1)
        i = 5;
    wall.connect(elements[i]);
}

function addTransitionRoom(mainScene, wallsArray, position, elementsArray) {
    var i = position - 1;
    if (i == -1)
        i = 5;

    const tRoom = createTransitionRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
    tRoom.connect(wallsArray[i]);

    mainScene.scene.add(tRoom.obj);
    elementsArray.push(tRoom);

    disposeFromArray(mainScene.scene, wallsArray[position], wallsArray);

    tRoom.addRooms(mainScene);
}

function updateScene(mainScene, delta) {
    var i = 0;
    var transitionPosition = 0;
    var toMove = [];
    var toDelete = [];
    mainScene.wallsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 71) {
            if (mainScene.wallsA.length < 7) {
                toMove.push([elem, i, mainScene.wallsA]);
                mainScene.distance += 1;
                transitionPosition = i;
            }
            else {
                toDelete.push(elem);
            }
        }
        i++;
    })
    toMove.forEach(function (elem) {
        moveWall(elem[0], elem[1], elem[2]);
    });
    toDelete.forEach(function (elem) {
        disposeFromArray(mainScene.scene, elem, mainScene.wallsA);
    })
    mainScene.elementsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 71) {
            disposeFromArray(mainScene.scene, elem, mainScene.elementsA);
        }
    });
    if (mainScene.distance > mainScene.limitDistance) {
        addTransitionRoom(mainScene, mainScene.wallsA, transitionPosition, mainScene.elementsA);
        mainScene.distance = 0;
    }
}
