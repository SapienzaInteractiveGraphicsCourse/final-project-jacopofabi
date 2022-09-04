function createWindow(width, height, depth, shift = 0.5)
{
    const ret = new THREE.Object3D();

    const edge = new THREE.Shape()
    .moveTo(-(width / 2), -(height / 2))
    .lineTo(width / 2, -(height / 2))
    .lineTo(width / 2, height / 2)
    .lineTo(-(width / 2), height / 2)

    const holeEdge = new THREE.Shape()
    .moveTo(-(width / 2) + shift, -(height / 2) + shift)
    .lineTo(-(width / 2) + shift, height / 2 - shift)
    .lineTo(width / 2 - shift, height / 2 - shift)
    .lineTo(width / 2 - shift, -(height / 2) + shift)

    edge.holes.push(holeEdge);

    const geometryInnerWindow = new THREE.ShapeGeometry(holeEdge);
    const materialInnerWindow = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        transmission: 0.7,
        thickness: 0.5,
        side: THREE.DoubleSide,
    });
    const meshInnerWindow = new THREE.Mesh(geometryInnerWindow, materialInnerWindow);

    meshInnerWindow.position.z = depth / 2;

    const extrudeSettings = {
        depth: depth,
    };

    const geometryWindow = new THREE.ExtrudeGeometry(edge, extrudeSettings);
    const materialWindow = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
    });
    const meshWindow = new THREE.Mesh(geometryWindow, materialWindow);

    //meshWindow.position.x = width - ;
    //meshWindow.position.y = ;
    meshWindow.position.z = - depth / 2;

    meshWindow.add(meshInnerWindow);
    ret.add(meshWindow);

    return ret;
}