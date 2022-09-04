function createCeilingLamp(width, height, deep)
{
    const obj = new THREE.Object3D();

    const ringShape = new THREE.Shape()
    .moveTo(-1.853, -1.853)
    .lineTo(0, -2.5)
    .lineTo(1.853, -1.853)
    .lineTo(2.5, 0)
    .lineTo(1.853, 1.853)
    .lineTo(0, 2.5)
    .lineTo(-1.853, 1.853)
    .lineTo(-2.5, 0)

    const holeShape = new THREE.Shape()
    .moveTo(-2, 0)
    .lineTo(-1.5, 1.5)
    .lineTo(0, 2)
    .lineTo(1.5, 1.5)
    .lineTo(2, 0)
    .lineTo(1.5, -1.5)
    .lineTo(0, -2)
    .lineTo(-1.5, -1.5)

    ringShape.holes.push(holeShape);

    const geometryLight = new THREE.ShapeGeometry(holeShape);
    const materialLight = new THREE.MeshBasicMaterial({
        color: 0xFFFFCC,
        opacity: 0.2,
    })
    const meshLight = new THREE.Mesh(geometryLight, materialLight);
    meshLight.position.z = 0.8;

    const extrudeSettings = {
      depth: 1,
    };

    const geometry = new THREE.ExtrudeBufferGeometry(ringShape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({
      color: 0x222222,
    });
    const lamp = new THREE.Mesh(geometry, material);

    const target = new THREE.Object3D();
    target.position.set(0.0, 0.0, 1.0);

    const spotLight = new THREE.SpotLight( 0xFFFFCC );
    spotLight.intensity = 0.6;
    spotLight.decay = 2;
    spotLight.penumbra = 0.2;
    spotLight.distance = 200;
    spotLight.angle = Math.PI / 8;
    spotLight.position.set(0, 0, 0.5);
    spotLight.target = target;

    obj.add(meshLight);
    obj.add(lamp);
    obj.add(spotLight);
    obj.add(target);

    const ret = {
      obj: obj,
      dispose: function() {
        objDispose(this.obj);
      },
    }

    return ret;
}