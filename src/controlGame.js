function onWindowResize(camera, window, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyPress(key, scene) {
    if (key == "a" && scene.cat != null) {
        scene.catspeed = -50;
      }
    else if (key == "d" && scene.cat != null) {
        scene.catspeed = 50;
    }
    else if (key == "p") {
        console.log(key);
        if (scene.pause == true) scene.pause = false;
        else scene.pause = true;
    }
    else if (key == "w" && scene.cat != null) {
        scene.cat.playAnimation("jump", false);
    }
    else if (key == "s" && scene.cat != null) {
        scene.cat.playAnimation("slip", false);
    }
}

function setControl(document, window, renderer, scene)
{
    document.addEventListener('keypress', (e) => {
        onKeyPress(e.key, scene);
    }, false);
    window.addEventListener( "resize", function() { onWindowResize(scene.camera, window, renderer)}, false );
}