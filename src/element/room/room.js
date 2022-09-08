var wallTexture;

class Room extends Element {
    enabled =  false;
    obstacles = [];
    elements = [];
    connectionPoints = [4, 5, 6];
    orientationPoints =  [7, 8, 9];
    constructor (obj, w, h, d) {
        super(obj, w, h, d);
        this.type = "Room";
    };
    getConnectionPoints () {
        return getConnectionPoints(this.obj, this.connectionPoints);
    };
    getOrientationPoints () {
        return getConnectionPoints(this.obj, this.orientationPoints)[0];
    };
    connect (obj) {
        connect(this.obj, obj, this.getOrientationPoints(), this.depth);
    };
    isIn (cat) {
        //const backC = cat.obj.position.z + cat.depth / 2;
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        if (backR > frontC && frontR < frontC)
            return true;
        return false;
    };
    populate (memory) {
        var flagLightFlag = getRandomInt(3);
        var obsatcleFlag = getRandomInt(6);
        var cLight;
        var obstacle;

        if (flagLightFlag == 2) {
            cLight = takeElement(memory, "CeilingLight");
            if (cLight) {  
                cLight.obj.position.y = 78.5;
                cLight.obj.rotation.x = Math.PI / 2;
                cLight.available = false;
                this.obj.add(cLight.obj);
                this.toDispose.push(cLight);
            }
        }
        if (obsatcleFlag == 2 || obsatcleFlag == 3) {
            obstacle = takeElement(memory, "Table");
            if (obstacle) {
                obstacle.available = false;
                this.obj.add(obstacle.obj);
                this.toDispose.push(obstacle);
                this.obstacles.push(obstacle);
            }
        }
        if (obsatcleFlag == 4) {
            obstacle = takeElement(memory, "Turnstile");
            if (obstacle) {
                obstacle[0].available = false;
                this.obj.add(obstacle[0].obj);
                this.obj.add(obstacle[1].obj);
                this.toDispose.push(obstacle[0]);
                this.obstacles.push(obstacle[0]);
                this.toDispose.push(obstacle[1]);
                this.obstacles.push(obstacle[1]);
            }
        }
    };
    rePopulate (memory) {
        this.empty();
        this.populate(memory);
    };
    empty () {
        for (var i = 0; i < this.toDispose.length; i++) {
            this.toDispose[i].available = true;
            this.obj.remove(this.toDispose[i].obj);
        }
        this.toDispose = [];
        this.elements = [];
        this.obstacles = [];
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

    obj.add(createWallDx(width, height, depth, flagWindow));    //0 //penso che non venga eliminata
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

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);                   //7
    obj.add(oPoint2);                   //8
    obj.add(oPoint3);                   //9

    const ret = new Room(obj, width, height, depth);
    return ret;
}
