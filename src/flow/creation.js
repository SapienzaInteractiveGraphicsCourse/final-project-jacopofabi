function createAllObject(mainScene, roomA, obstacleA, decorationA) {
    const width = mainScene.widthRoom;
    const height = mainScene.heightRoom;
    const depth = mainScene.depthRoom;

    for (var i = 0; i < 20; i++) {
        roomA.push(createRoom(width, height, depth));
    }
    roomA.push(createTransitionRoomBack(width, height, depth));
    roomA.push(createTransitionRoomRight(width, height, depth));
    roomA.push(createTransitionRoomLeft(width, height, depth));
    roomA.push(createTransitionRoomLeftRight(width, height, depth));

    for (var i = 0; i < 6; i++) {
        obstacleA.push(obstaclesCreate("Table"));
    }

    for (var i = 0; i < 3; i++) {
        obstacleA.push(obstaclesCreate("Turnstile"));
    }

    for (var i = 0; i < 6; i++) {
        decorationA.push(createCeilingLamp());
    }
}

function createWay(mainScene, memory) {
    
    var room;

    for (var i = 0; i < 6; i++) {
        room = takeElement(memory, "Room");
        room.available = false;
        if (i > 2)
            room.populate(memory);
        room.obj.position.z = mainScene.depthRoom / 2 - (mainScene.depthRoom * i);
        mainScene.wallsA.push(room);
        mainScene.scene.add(room.obj);
    }

    mainScene.lastObj = [mainScene.wallsA[5]];

    var gardenGeometry = new THREE.PlaneGeometry(1000, 1000);
    const gardenMaterial = new THREE.MeshBasicMaterial( {color: 0x228B22, side: THREE.DoubleSide} );
    const garden = new THREE.Mesh( gardenGeometry, gardenMaterial );
    garden.position.set(500 + 80, 0, -500);
    garden.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    mainScene.scene.add( garden );

    var wallFront = createWall(
        new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
        }),
        mainScene.widthRoom,
        mainScene.heightRoom);
    wallFront.position.y = mainScene.heightRoom / 2;
    wallFront.position.z = -600;
    mainScene.scene.add(wallFront);
}
