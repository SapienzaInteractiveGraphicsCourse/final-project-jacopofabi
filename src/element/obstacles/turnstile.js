class Turnstile extends Element {
    rotation1 = null;
    rotation2 = null;
    enabled = false;
    constructor (obj, width, height, depth, r1, r2) {
        super(obj, width, height, depth);
        this.rotation1 = r1;
        this.rotation2 = r2;
        this.type = "Turnstile";
    };
    checkIntersection (cat) {
        const pT = new THREE.Vector3();
        const pCC = new THREE.Vector3();

        this.obj.getWorldPosition(pT);
        cat.center.getWorldPosition(pCC);

        const frontC = pCC.z - (cat.depth / 2);
        const backC = pCC.z + (cat.depth / 2);
        
        if (frontC <= pT.z && backC >= pT.z) {
            const leftC = pCC.x - (cat.width / 2);
            const rightC = pCC.x + (cat.width / 2);
            if (this.enabled) {
                return false;
            }
            else {
                if(leftC <= pT.x + (this.width / 2) && leftC >= pT.x - (this.width / 2))
                    return true;
                if (rightC <= pT.x + (this.width / 2) && rightC >= pT.x - (this.width / 2))
                    return true;
                return false;
            }
        }
    };
    dispose () {
        objDispose(this.obj);
    };
    activateAnimation(mainGroup) {
        if (this.enabled) {
            const group = new TWEEN.Group();

            createRotationTurnstile(this.rotation1, group, -Math.PI / 2);
            createRotationTurnstile(this.rotation2, group, Math.PI / 2);
        
            mainGroup.push(group);
        }
    }
    checkToAnimate(cat) {
        if (this.enabled) {
            const pT = new THREE.Vector3();
            const pCC = new THREE.Vector3();
    
            this.obj.getWorldPosition(pT);
            cat.center.getWorldPosition(pCC);
    
            if (pCC.z - (cat.depth / 2) <= pT.z + 50) {
                return true;
            }
        }
        return false;
    }
}

function createHalfTurnstile() {
    const obj = new THREE.Object3D();

    const base = new THREE.Shape()
    .moveTo(-1.5, -0.5)
    .lineTo(-1.5, 0.5)
    .lineTo(1.5, 0.5)
    .bezierCurveTo(2.0, 0.0, 1.5, -0.5, 1.5, -0.5)
    .lineTo(-1.5, -0.5)

    const extrudeSettings = {
        bevelEnabled: false,
        depth: 6,
    };

    const geometryBottom = new THREE.ExtrudeGeometry(base, extrudeSettings);
    const materialBottom = new THREE.MeshPhongMaterial({
        color: 0x9c9c9c,
        side: THREE.DoubleSide,
    });
    const meshBottom = new THREE.Mesh(geometryBottom, materialBottom);

    meshBottom.rotateX(Math.PI / 2);

    const geometryCube = new THREE.BoxGeometry( 2, 6, 1 );
    const materialCube = new THREE.MeshBasicMaterial( {color: 0x9c9c9c} );
    const cube = new THREE.Mesh( geometryCube, materialCube );

    cube.add(meshBottom);   //0
    meshBottom.position.x = 0.5;
    meshBottom.position.y = -3;

    const geometryCylinder = new THREE.CylinderGeometry( 0.5, 0.5, 6, 6 );
    const materialCylinder = new THREE.MeshPhongMaterial( {color: 0x9c9c9c} );
    const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );

    const geometryGlass = new THREE.BoxGeometry( 6, 8, 0.5 );
    const materialGlass = new THREE.MeshPhysicalMaterial( {opacity: 0.2,} );
    const glass = new THREE.Mesh( geometryGlass, materialGlass );

    glass.position.x = 3.9;
    glass.position.y = -1;

    cylinder.add(glass);
    //cylinder.rotateY(Math.PI / 6);
    cylinder.position.x = 1.5;
    cube.add( cylinder );  //1

    const geometryTop = new THREE.BoxGeometry( 3, 2, 1 );
    const materialTop = new THREE.MeshBasicMaterial( {color: 0x9c9c9c, } );
    const top = new THREE.Mesh( geometryTop, materialTop );

    top.position.x = 0.5;
    top.position.y = 4;

    cube.add(top);    //2

    obj.add(cube);

    obj.position.y = -2;
    obj.position.x = 0.5;

    return obj;
}

function createTurnstile(flag) {
    const obj = new THREE.Object3D();

    const leftTurn = createHalfTurnstile();
    const rightTurn = createHalfTurnstile();

    leftTurn.position.x = -9;

    rightTurn.position.x = 9;
    rightTurn.rotateY(Math.PI);

    obj.add(leftTurn);
    obj.add(rightTurn);

    const r1 = leftTurn.children[0].children[1];
    const r2 = rightTurn.children[0].children[1];
    const ret = new Turnstile(obj, 21, 14, 1, r1, r2);
    ret.enabled = flag;
    return ret;
}
