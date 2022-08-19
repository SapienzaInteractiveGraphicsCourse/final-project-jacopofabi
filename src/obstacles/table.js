
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
    
    return (top1);
}