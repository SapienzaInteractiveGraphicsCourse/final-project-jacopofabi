function createRotationAnimationTween(array, room, group, angle) {
    var tween;
    var newP;

    array.forEach(element => {
        tween = new TWEEN.Tween(element.obj, group);
        newP = rotateOnPoint(element.obj, room.position, new THREE.Vector3(0, 1, 0), angle);
        tween.to({position: newP[0], quaternion: newP[1]}, 100).start();
    });
}