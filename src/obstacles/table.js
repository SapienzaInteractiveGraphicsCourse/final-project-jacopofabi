
function intersectionTable(table, cat)
{
    const limitPositionD = table.obj.position.y + table.intersectionLimit[0];
    const limitPositionU = table.obj.position.y + table.intersectionLimit[1];

    if (cat.obj.position.y + cat.center.position.y + (cat.height / 2) >= limitPositionU && cat.obj.position.y + cat.center.position.y - (cat.height / 2) <= limitPositionD)
        return 1;
    return 0;
}

function createTable()
{
    const legW = 1.0;
    const legH = 5.0;
    const legD = 3.0;

    const top1W = 10.0;
    const top1H = 0.5;
    const top1D = legD + 1.0;

    const top2W = top1W;
    const top2H = 0.1;
    const top2D = top1D + 0.2;
    
    const obj = new THREE.Object3D();

    const top1 = createCube(top1W, top1H, top1D, new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }));

    const top2 = createCube(top2W, top2H, top2D, new THREE.MeshPhongMaterial({ color: "white" }));
    top2.position.y = top1H/2 + top2H / 2;
    top1.add(top2);

    const leg1 = createCube(legW, legH, legD, new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }));
    leg1.position.x = (top1W / 2 - 1);
    leg1.position.y = -(top1H + legH) / 2;
    top1.add(leg1);

    const leg2 = createCube(legW, legH, legD, new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }));
    leg2.position.x = -(top1W / 2 - 1);
    leg2.position.y = -(top1H + legH) / 2;
    top2.add(leg2);

    top1.position.y = (legH - top2H) / 2;

    obj.add(top1);

    const table = {
        obj: obj,
        width: top1W,
        height: legH + top1H + top2H,
        depth: top2D,
        intersectionLimit: [(legH - top1H - top2H) / 2, (legH + top1H + top2H) / 2],
        type: "table",
        dispose: function () {
            objDispose(this.obj);
        },
        checkIntersection: function (cat) {
            const pT = new THREE.Vector3();
            const pC = new THREE.Vector3();
            const pCC = new THREE.Vector3();

            this.obj.getWorldPosition(pT);
            cat.obj.getWorldPosition(pC);
            cat.center.getWorldPosition(pCC);

            const limitPositionD = pT.y + table.intersectionLimit[0];
            const limitPositionU = pT.y + table.intersectionLimit[1];

            console.log("Le misure: ", pT, "pc: ", pC, "pcc: ", pCC);

            if (pC.y + pCC.y + (cat.height / 2) >= limitPositionU && pC.y + pCC.y - (cat.height / 2) <= limitPositionD)
                return true;
            return false;
        }
    };

    return (table);
}