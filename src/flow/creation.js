function createWay(mainScene) {
    
    var room;

    for (var i = 0; i < 6; i++) {
        room = createRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
        room.populate(mainScene.scene);
        room.obj.position.z = mainScene.depthRoom / 2 - (mainScene.depthRoom * i);
        mainScene.wallsA.push(room);
        mainScene.scene.add(room.obj);
    }

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
