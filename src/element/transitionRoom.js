
class TransitionRoom extends Room {
    constructor(obj, w, h, d) {
        super(obj, w, h, d);
        this.connectionPoints = [6, 7, 8];
    };
    isIn (cat) {
        const backC = cat.obj.position.z + cat.depth / 2;
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        if (backR > backC && frontR < frontC)
            return true;
        return false;
    };
    addRooms (mainScene) {
        createConnectRooms(mainScene, this);
    };
    populate () {
        var flagLightFlag = getRandomInt(3);
        var cLight;

        if (flagLightFlag == 2) {
            cLight = createCeilingLamp();
            this.add(cLight);
            this.toDispose.push(this.obj.children.length - 1);
        }
    };
}

function createDoorWall(width, height, depth)
{
    const ret = new THREE.Object3D();

    const wallShape = new THREE.Shape()
    .moveTo(-width / 2, -(height / 2), 0)
    .lineTo(-15, -(height / 2), 0)
    .lineTo(-15, 20, 0)
    .lineTo(15, 20, 0)
    .lineTo(15, -(height / 2), 0)
    .lineTo(width / 2, -(height / 2), 0)
    .lineTo(width / 2, height / 2, 0)
    .lineTo(-width / 2, height / 2, 0)

    const extrudeSettings = {
        depth: depth,
    };
  
    const geometry = new THREE.ExtrudeBufferGeometry(wallShape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff35B8,
        side: THREE.DoubleSide,
    });
    const wall = new THREE.Mesh(geometry, material);

    wall.position.z = -depth / 2;

    ret.add(wall);

    return ret;
}

function createTransitionRoomLeft(width, height, depth)
{
    const obj = new THREE.Object3D();
    const depthWall = 2;

    const frontWall = createDoorWall(width, height, depthWall);

    const backWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        height);

    const leftWall = createDoorWall(depth, height, depthWall);

    const rightWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 0)",
            side: THREE.DoubleSide,
        }),
        depth,
        height);

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);
    
    const floor = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2)]);
    placeObj(leftWall, [-(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(width / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);
    
    obj.add(frontWall);         //0
    obj.add(backWall);          //1
    obj.add(leftWall);          //2
    obj.add(rightWall);         //3
    obj.add(ceil);              //4
    obj.add(floor);             //5

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-(width / 2), 0, 15);
    cPoint2.position.set(-(width / 2), 0, 0);
    cPoint3.position.set(-(width / 2), height, 0);

    obj.add(cPoint1);           //6
    obj.add(cPoint2);           //7
    obj.add(cPoint3);           //8
    
    const ret = new TransitionRoom(obj, width, height, depth);
    ret.toDispose = [0, 3];
    ret.enabled = true;
    
    return ret;
}

function createTransitionRoomRight(width, height, depth)
{
    const obj = new THREE.Object3D();
    const depthWall = 2;

    const frontWall = createDoorWall(width, height, depthWall);

    const backWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        height);

    const leftWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 0)",
            side: THREE.DoubleSide,
        }),
        depth,
        height);

    const rightWall = createDoorWall(depth, height, depthWall);

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);
    
    const floor = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2)]);
    placeObj(leftWall, [-(width / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);
    
    obj.add(frontWall);         //0
    obj.add(backWall);          //1
    obj.add(leftWall);          //2
    obj.add(rightWall);         //3
    obj.add(ceil);              //4
    obj.add(floor);             //5

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(width / 2, 0, -15);
    cPoint2.position.set(width / 2, 0, 0);
    cPoint3.position.set(width / 2, height, 0);

    obj.add(cPoint1);           //6
    obj.add(cPoint2);           //7
    obj.add(cPoint3);           //8

    const ret = new TransitionRoom(obj, width, height, depth);
    ret.toDispose = [0, 3];
    ret.enabled = true;
    
    return ret;
}

function createTransitionRoomBack(width, height, depth)
{
    const obj = new THREE.Object3D();

    const depthWall = 2;

    const frontWall = createDoorWall(width, height, depthWall);
    const backWall = createDoorWall(width, height, depthWall);

    const leftWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 0)",
            side: THREE.DoubleSide,
        }),
        depth,
        height
        );

    const rightWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 0)",
            side: THREE.DoubleSide,
        }),
        depth,
        height
    );

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);

    const floor = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 0, 0)",
            side: THREE.DoubleSide,
        }),
        width,
        depth);

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2) + (depthWall / 2)]);
    placeObj(leftWall, [-(height / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [width / 2, height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);

    obj.add(frontWall);     //0
    obj.add(backWall);      //1
    obj.add(leftWall);      //2
    obj.add(rightWall);     //3
    obj.add(ceil);          //4
    obj.add(floor);         //5

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-width / 2, 0, -depth / 2);
    cPoint2.position.set(0, 0, -depth / 2);
    cPoint3.position.set(0, height, -depth / 2);

    obj.add(cPoint1);       //6
    obj.add(cPoint2);       //7
    obj.add(cPoint3);       //8

    const ret = new TransitionRoom(obj, width, height, depth);
    ret.toDispose = [0, 1];

    return ret;
}

function createTransitionRoom(width, height, depth)
{
    const randomInt = getRandomInt(3);
    var ret;

    if (randomInt == 0)
        ret = createTransitionRoomBack(width, height, depth);
    else if (randomInt == 1)
        ret = createTransitionRoomRight(width, height, depth);
    else if (randomInt == 2)
        ret = createTransitionRoomLeft(width, height, depth);
    
    return ret;
}