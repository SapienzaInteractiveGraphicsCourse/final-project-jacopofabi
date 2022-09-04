var wallTexture;

class Room {
    obj = null;
    width = 0;
    height = 0;
    depth = 0;
    enabled =  false;
    toDispose = [];
    obstacles = [];
    connectionPoints = [4, 5, 6];
    constructor (obj, w, h, d) {
        this.obj = obj;
        this.width = w;
        this.height = h;
        this.depth = d;
    };
    getConnectionPoints () {
        return getConnectionPoints(this.obj, this.connectionPoints[0], this.connectionPoints[1], this.connectionPoints[2]);
    };
    connect (objToCon) {
        connect(this.obj, objToCon, this.depth);
    };
    dispose () {
        for (var i = 0; i < this.toDispose.length; i++)
            objDispose(this.obj.children[i]);
        objDispose(this.obj);
    };
    isIn (cat) {
        //const backC = cat.obj.position.z + cat.depth / 2;
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        console.log("Il backR: ", backR, "\nIl frontC: ", frontC, "\nIl frontR: ", frontR);
        if (backR > frontC && frontR < frontC)
            return true;
        return false;
    };
    populate () {
        var flagLightFlag = getRandomInt(3);
        var tableFlag = getRandomInt(3);
        var cLight;
        var obstacle;

        if (flagLightFlag == 2) {
            cLight = createCeilingLamp();
            cLight.obj.position.y = 78.5;
            cLight.obj.rotation.x = Math.PI / 2;
            this.obj.add(cLight.obj);
            this.toDispose.push(this.obj.children.length - 1);
        }
        if (tableFlag == 2) {
            obstacle = obstaclesCreate("table");
            this.obj.add(obstacle.obj);
            this.toDispose.push(this.obj.children.length - 1);
            this.obstacles.push(obstacle);
        }
    };
}

function loadWallTexture(loader) {
    const texture1 = loader.load("flow/texture/woodTexture.jpeg");
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(4, 6);
    //texture1.offset.x = 0.6;
    //texture1.repeat = new THREE.Vector2(20, 30);
    wallTexture = [
        texture1,
    ];
}

function createWallDx(width, height, depth, window) {
    if (window)
        var wallDx = createWallWindows(0xffffff);
    else
        var wallDx = createWall(
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            }),
          depth,
          height);
    //wallDx.name = "wallDx";
    placeObj(wallDx, [width / 2, height / 2, 0], [0, - Math.PI / 2, 0]);

    return wallDx;
}

function createWallSx(width, height, depth) {
    const wallSx = createWall(
        new THREE.MeshPhongMaterial({
            color: 0xD7D7D7,
            side: THREE.DoubleSide,
        }),
        depth,
        height);
    //wallSx.name = "wallSx";
    placeObj(wallSx, [-(width / 2), height / 2, 0], [0, - Math.PI / 2, 0]);

    return wallSx;
}

function createFloor(width, depth) {
    const floor = createWall(new THREE.MeshPhongMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
        }),
        width,
        depth);
    //floor.name = "floor";
    placeObj(floor, [0, 0, 0], [- Math.PI / 2, 0, 0]);

    return floor;
}

function createCeil(width, height, depth) {
    const ceil = createWall(new THREE.MeshPhongMaterial({
            map: wallTexture[0],
            side: THREE.DoubleSide,
        }),
        width,
        depth);
    //ceil.name = "ceil";
    placeObj(ceil, [0, height, 0], [- Math.PI / 2, 0, 0]);

    return ceil;
}

function createRoom(width, height, depth)
{
    const obj = new THREE.Object3D();

    const flagWindow = getRandomInt(2);

    obj.add(createWallDx(width, height, depth, flagWindow));    //0
    obj.add(createWallSx(width, height, depth));                //1
    obj.add(createCeil(width, height, depth));                  //2
    obj.add(createFloor(width, depth));                         //3

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-width / 2, 0, -depth / 2);
    cPoint2.position.set(0, 0, -depth / 2);
    cPoint3.position.set(0, height, -depth / 2);

    obj.add(cPoint1);                   //4
    obj.add(cPoint2);                   //5
    obj.add(cPoint3);                   //6

    const ret = new Room(obj, width, height, depth);
    return ret;
}
