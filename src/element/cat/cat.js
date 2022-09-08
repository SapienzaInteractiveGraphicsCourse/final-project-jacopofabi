var catTexture = [];

function loadCatTexture(loader) {
  catTexture = [
    new THREE.MeshPhongMaterial({
      map: loader.load("element/cat/texture/lateralBody.png"),
    }),
    new THREE.MeshPhongMaterial({
      map: loader.load("element/cat/texture/frontFace.png"),
    }),
    new THREE.MeshPhongMaterial({
      map: loader.load("element/cat/texture/lateralFace.png"),
    }),
    new THREE.MeshPhongMaterial({
      map: loader.load("element/cat/texture/lateralFace2.png"),
    }),
    new THREE.MeshPhongMaterial({ map: loader.load("element/cat/texture/eye.png") }),
    new THREE.MeshPhongMaterial({ map: loader.load("element/cat/texture/nose.png") }),
    new THREE.MeshPhongMaterial({ map: loader.load("element/cat/texture/ear.png") }),
  ];
}

function createBodyMaterial(texture) {
  const cubeMaterial = [
    texture,
    texture,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    texture,
  ];
  return cubeMaterial;
}

function createTailMaterial(texture) {
  const cubeMaterial = [
    texture,
    texture,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    texture,
    texture,
  ];
  return cubeMaterial;
}

function createHeadMaterial(textureFront, textureLateral, textureLateral2) {
  const cubeMaterial = [
    textureLateral,
    textureLateral2,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    textureFront,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
  ];
  return cubeMaterial;
}

function createEyeMaterial(texture) {
  const cubeMaterial = [
    new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    new THREE.MeshPhongMaterial({ color: "white" }),
    texture,
    new THREE.MeshPhongMaterial({ color: "white" }),
  ];
  return cubeMaterial;
}

function createNoseMaterial(texture) {
  const cubeMaterial = [
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    texture,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
  ];
  return cubeMaterial;
}

function createEar(earW, earH, earD, texture) {
  const cubeMaterial = [
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
    texture,
    new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" }),
  ];
  const base = createCube(1, 1, 1, cubeMaterial);

  const vertices = [
    { pos: [-0.5, -0.25, 0.25], norm: [0, 0, 1], uv: [0, 0] },
    { pos: [-0.5, -0.25, -0.25], norm: [0, 0, 1], uv: [1, 1] },
    { pos: [0.0, 0.25, -0.25], norm: [0, 0, 1], uv: [0.5, 1] },
    { pos: [0.5, -0.25, -0.25], norm: [0, 0, 1], uv: [0, 0] },
    { pos: [0.5, -0.25, 0.25], norm: [0, 0, 1], uv: [1, 1] },
    { pos: [0.0, 0.25, 0.25], norm: [0, 0, 1], uv: [0.5, 1] },
  ];

  const positions = [];
  const normals = [];
  const uvs = [];
  for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
  }

  const geometry = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      new Float32Array(positions),
      positionNumComponents
    )
  );
  geometry.setAttribute(
    "normal",
    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
  );
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
  );
  geometry.setIndex([0, 4, 5, 4, 3, 2, 2, 5, 4, 3, 1, 2, 5, 2, 1, 0, 5, 1]);
  const topMaterial = new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" });
  const topMesh = new THREE.Mesh(geometry, topMaterial);
  topMesh.scale.z = 2;
  topMesh.position.y = 0.75;
  base.add(topMesh);
  base.scale.set(earW, earH, earD);
  return base;
}

function createTail(width, height, depth, texture) {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  cubeGeometry.rotateX(90 * THREE.MathUtils.DEG2RAD);
  cubeGeometry.scale(width, height, depth);
  const tailMaterial = createTailMaterial(texture);
  const tailMesh = new THREE.Mesh(cubeGeometry, tailMaterial);
  return tailMesh;
}

function createCat() {
  var headW = 10;
  var headH = 8;
  var headD = 8;

  var eyeW = 2.5;
  var eyeH = 2.5;
  var eyeD = 1;

  var noseW = 3;
  var noseH = 1.5;
  var noseD = 1;

  var earW = 3;
  var earH = 2;
  var earD = 2;

  var bodyW = 8;
  var bodyH = 6;
  var bodyD = 12;

  var legW = 2;
  var legH = 5.5;
  var legD = 1.5;

  var tailW = 1;
  var tailH = 1;
  var tailD = 6;

  var deltaFoot = 0.5;
  var footW = legW;
  var footH = 0.5;
  var footD = legD + deltaFoot;

  const cat = new THREE.Object3D();
  cat.name = "cat";
  const mixers = [];
  const actions = { jump: [], slip: [] };

  const head = createCube(
    headW,
    headH,
    headD,
    createHeadMaterial(catTexture[1], catTexture[2], catTexture[3])
  );
  head.position.set(0, bodyH / 2, bodyD / 2);

  const eye1 = createCube(eyeW, eyeH, eyeD, createEyeMaterial(catTexture[4]));
  const eye2 = createCube(eyeW, eyeH, eyeD, createEyeMaterial(catTexture[4]));
  eye1.position.set(headW / 4, -(eyeH / 2) + headD / 2 - 1, (headD + eyeD) / 2);
  eye2.position.set(
    -headW / 4,
    -(eyeH / 2) + headD / 2 - 1,
    (headD + eyeD) / 2
  );
  head.add(eye1);
  head.add(eye2);

  const nose = createCube(
    noseW,
    noseH,
    noseD,
    createNoseMaterial(catTexture[5])
  );
  nose.position.set(0, -(headH / 4), (headD + noseD) / 2);
  head.add(nose);

  const ear1 = createEar(earW, earH, earD, catTexture[6]);
  const ear2 = createEar(earW, earH, earD, catTexture[6]);
  ear1.position.set(headW / 4, (headH + earH) / 2, headH / 4);
  ear2.position.set(-(headW / 4), (headH + earH) / 2, headH / 4);
  head.add(ear1);
  head.add(ear2);

  const body = createCube(
    bodyW,
    bodyH,
    bodyD,
    createBodyMaterial(catTexture[0])
  );

  var tail = createTail(tailW, tailH, tailD, catTexture[0]);
  tail.position.set(0, bodyH / 2 - tailH / 2, -((bodyD + tailD) / 2));
  body.add(tail);
  body.add(head);

  var legs = [];
  var foots = [];
  for (var i = 0; i < 4; i++) {
    legs.push(
      createCube(
        legW,
        legH,
        legD,
        new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" })
      )
    );
    foots.push(
      createCube(
        footW,
        footH,
        footD,
        new THREE.MeshPhongMaterial({ color: "white" })
      )
    );
    if (i == 0)
      legs[0].position.set(
        (bodyW - legW) / 2 + 0.01,
        -((bodyH + legH) / 2 - 1.5),
        (bodyD - legD) / 2 + 0.01
      );
    else if (i == 1)
      legs[1].position.set(
        -((bodyW - legW) / 2 + 0.01),
        -((bodyH + legH) / 2 - 1.5),
        (bodyD - legD) / 2 + 0.01
      );
    else if (i == 2)
      legs[2].position.set(
        (bodyW - legW) / 2 + 0.01,
        -((bodyH + legH) / 2 - 1.5),
        -((bodyD - legD) / 2 + 0.01)
      );
    else if (i == 3)
      legs[3].position.set(
        -((bodyW - legW) / 2 + 0.01),
        -((bodyH + legH) / 2 - 1.5),
        -((bodyD - legD) / 2 + 0.01)
      );
    foots[i].position.set(0, -((footH + legH) / 2), deltaFoot / 2);
    legs[i].add(foots[i]);
    body.add(legs[i]);
  }

  const center = new THREE.Object3D();
  center.add(body);
  cat.add(center);

  body.position.y = (bodyH / 2 + (legH - 1.5) + footH - headH - earH) / 2;

  var ret = {
    obj: cat,
    center: center,
    head: head,
    ear1: ear1,
    ear2: ear2,
    nose: nose,
    body: body,
    leg1: legs[0],
    leg2: legs[1],
    leg3: legs[2],
    leg4: legs[3],
    foot1: foots[0],
    foot2: foots[1],
    foot3: foots[2],
    foot4: foots[3],
    width: headW,
    height: earH + headH + bodyH / 2 + (legH - 1.5) + footH,
    depth: headD / 2 + bodyW + tailW,
    mixers: mixers,
    playAnimation: function (anim, loop, restart = false) {
      if (
        actions[anim][0].time == 0 ||
        actions[anim][0].time == 1 ||
        restart == true
      ) {
        if (loop == true) {
          actions[anim].forEach((action) => {
            action.play().reset();
          });
        } else {
          actions[anim].forEach((action) => {
            action.play().setLoop(THREE.LoopOnce, 0).reset();
          });
        }
      }
    },
    stopAnimation: function () {
      actions[anim].stop();
    },
  };

  createJumpAnimation(ret, mixers, actions);
  createSlipAnimation(ret, mixers, actions);

  return ret;
}