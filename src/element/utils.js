function createConnectRooms(mainScene, obj) {
    mainScene.pause = true;
    var room1;
    var room2;

    room1 = createRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
    room1.populate(mainScene.scene);
    room1.connect(obj);
    mainScene.wallsA.push(room1);
    mainScene.scene.add(room1.obj);

    for (var i = 0; i < 5; i++) {   //da capire perche con un numero maggiore di 4 impazzisce
       room2 = createRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
       room2.populate(mainScene.scene)
       room2.connect(room1);
       mainScene.wallsA.push(room2);
       mainScene.scene.add(room2.obj);
       room1 = room2;
    }
    mainScene.pause = false;
}

function connect(obj, objToCon, depth) {
    const array = objToCon.getConnectionPoints();

    const p1 = array[0].toArray();
    const p2 = array[1].toArray();
    const p3 = array[2].toArray();

    const vec1 = sub(p1, p2);
    const vec2 = sub(p3, p2);
    const normal = vectProd(vec1, vec2);
    var normalized = normalize(normal);
    normalized[0] = Math.round(normalized[0]);
    normalized[1] = Math.round(normalized[1]);
    normalized[2] = Math.round(normalized[2]);

    var angle = dot(normalized, [0, 0, 1]);
    if (angle == Math.PI / 2)
        angle *= Math.round(normalized[0]); //se è 1 rimane 90, se è -1 diventa -90

    const a = takeAxis(normalized);
    const a2 = (a == 0) ? 2 : 0; //prendo l'altro asse
    obj.position.setComponent(a, array[1].getComponent(a) + ((depth / 2) * normalized[a])); //in normal[a] c'è il segno
    obj.position.setComponent(a2, array[1].getComponent(a2));

    obj.rotateY(angle - Math.PI);
}

function getConnectionPoints(obj, i1, i2, i3) {
    const array = [];

    const p1 = new THREE.Vector3();
    obj.children[i1].getWorldPosition(p1);
    const p2 = new THREE.Vector3();
    obj.children[i2].getWorldPosition(p2);
    const p3 = new THREE.Vector3();
    obj.children[i3].getWorldPosition(p3);

    array.push(p1);
    array.push(p2);
    array.push(p3);

    return array;
}

function takeAxis(axis)
{
    if (Math.round(axis[0]) == 1 || Math.round(axis[0]) == -1)
        return 0;
    //if (axis[1] == 1)
    //    return 1;
    else if (Math.round(axis[2]) == 1 || Math.round(axis[2]) == -1)
        return 2;
}