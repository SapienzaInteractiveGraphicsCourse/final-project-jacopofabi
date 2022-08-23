function addWallDx(mainScene, shift, window) {
    if (window)
        var wallDx = createWallWindows(0xff00ff);
    else
        var wallDx = createWall(0xff00ff, 120, 80);
    //wallDx.name = "wallDx";
    placeObj(wallDx, [40, 40, 60 - (120 * shift)], [0, - Math.PI / 2, 0]);
    mainScene.wallsA.push(wallDx);
    mainScene.scene.add(wallDx);
}

function addWallSx(mainScene, shift) {
    const wallSx = createWall(0xff000, 120, 80);
    //wallSx.name = "wallSx";
    placeObj(wallSx, [-40, 40, 60 - (120 * shift)], [0, - Math.PI / 2, 0]);
    mainScene.wallsA.push(wallSx);
    mainScene.scene.add(wallSx);
}

function addFloor(mainScene, shift) {
    const floor = createWall(0x808080, 80, 120);
    //floor.name = "floor";
    placeObj(floor, [0, 0, 60 - (120 * shift)], [- Math.PI / 2, 0, 0]);
    mainScene.wallsA.push(floor);
    mainScene.scene.add(floor);
}

function addCeil(mainScene, shift) {
    const ceil = createWall(0xffff00, 80, 120);
    //ceil.name = "ceil";
    placeObj(ceil, [0, 80, 60 - (120 * shift)], [- Math.PI / 2, 0, 0]);
    mainScene.wallsA.push(ceil);
    mainScene.scene.add(ceil);
}

function moveWall(wall, position, elements) {
    const shift = position % 6;
    var i = position - 1;
    if (i == -1 + (shift * 6))
        i = 5 + (shift * 6);
    wall.position.z = elements[i].position.z - 120;
}

function updateScene(mainScene, delta) {
    var i = 0;
    var toMove = [];
    mainScene.wallsA.forEach(function (elem) {
        elem.position.addScaledVector(new THREE.Vector3(0, 0, 1), 100 * delta);
        if (elem.position.z > 70)
            toMove.push([elem, i, mainScene.wallsA]);
        i++;
    })
    toMove.forEach(function (elem) {
        moveWall(elem[0], elem[1], elem[2]);
    });
    mainScene.elementsA.forEach(function (elem) {
        elem.position.addScaledVector(new THREE.Vector3(0, 0, 1), 100 * delta);
        if (elem.name == "lamp" &&  elem.position.z > 51) {
            disposeFromArray(mainScene.scene, elem, mainScene.elementsA);
        }
    });
    mainScene.obstaclesA.forEach(function (obstacle) {
        if (obstacle.obj.position.z > 51)
            disposeFromArrayObstacle(mainScene.scene, obstacle, mainScene.obstaclesA);
    })
}

function createWay(mainScene) {
    for (var i = 0; i < 6; i++) {
        addWallDx(mainScene, i, (i % 3) == 0);
    }
    for (var i = 0; i < 6; i++) {
        addWallSx(mainScene, i);
    }
    for (var i = 0; i < 6; i++) {
        addFloor(mainScene, i);
    }
    for (var i = 0; i < 6; i++) {
        addCeil(mainScene, i);
    }
    var wallBack = createWall(0x000000, 80, 80);
    wallBack.position.y = 40;
    wallBack.position.z = 40;
    var wallFront = createWall(0x000000, 80, 80);
    wallFront.position.z = -500;
    wallFront.position.y = 40;
    mainScene.scene.add(wallBack);
    mainScene.scene.add(wallFront);
}