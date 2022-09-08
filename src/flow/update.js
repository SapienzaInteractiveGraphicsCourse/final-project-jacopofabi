
var flag = true;

function addRoom(scene, memory, lastObj, wallsA) {
    const toRet = [];
    var conPoiA;
    var wall;

    for (var i = 0; i < lastObj.length; i++) {
        conPoiA = lastObj[i].getConnectionPoints();
        for (var j = 0; j < conPoiA.length; j++) {
            wall = takeElement(memory, "Room");
            wall.available = false;
            wall.populate(memory);
            scene.add(wall.obj);
            wall.connect(conPoiA[j]);
            wallsA.push(wall);
            toRet.push(wall);
        }
    }
    return (toRet);
}

function addTransitionRoom(mainScene, memory, elementsArray) {

    const toRet = [];

    const tRoom = createTransitionRoom(memory);
    tRoom.available = false;
    tRoom.connect(mainScene.lastObj[0].getConnectionPoints()[0]);

    mainScene.scene.add(tRoom.obj);
    elementsArray.push(tRoom);

    toRet.push(tRoom);
    return(toRet);
}

function updateScene(mainScene, memory, delta) {
    //console.log(memory);
    //console.log(mainScene.wallsA);
    //console.log(mainScene.elementsA);
    var toMove = [];
    mainScene.wallsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 71) {
            for (var i = 0; i < mainScene.lastObj.length; i++) {
                if (mainScene.lastObj[i] == elem) {
                    mainScene.lastObj.splice(i, 1);
                    i--;
                }
            }
            toMove.push(elem);
            if (flag)
                mainScene.distance += 1;
        }
    })
    mainScene.elementsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 71) {
            removeFromArray(mainScene.scene, elem, mainScene.elementsA);
            flag = true;
            if (elem.type != "TB")
                elem.enabled = true;
        }
    });
    toMove.forEach(function (elem) {
        elem.empty();
        removeFromArray(mainScene.scene, elem, mainScene.wallsA);
        if (mainScene.wallsA.length <= (6 * mainScene.lastObj.length)) {
            mainScene.lastObj = addRoom(mainScene.scene, memory, mainScene.lastObj, mainScene.wallsA);
        }
    });
    if (mainScene.distance > mainScene.limitDistance) {
        mainScene.lastObj = addTransitionRoom(mainScene, memory, mainScene.elementsA);
        flag = false;
        mainScene.distance = 0;
    }
}
