function obstaclesCreate(type) {
  var obstacle;
  var scale = [9, 3, 7];

  if (type == "table")
  {
    obstacle = createTable();
    newScale(obstacle, scale);
  }
  obstacle.obj.position.y += obstacle.height / 2;
  obstacle.obj.position.z -= 1000;
  return obstacle;
}

function obstaclesDispose(obj) {
  obj.obj.children.forEach((child) => {
    child.geometry.dispose();
    child.material.dispose();
  });
}

function isInRangeZ(obstacle, player) {
  var p1 = player.position.z - player.size.z / 2;
  var p2 = p1 + player.size.z;
  var o1 = obstacle.position.z - obstacle.size / 2;
  var o2 = o1 + obstacle.size.z;
  if (o2 <= p2 && o2 >= p1) return true;
  if (o1 <= p2 && o1 >= p1) return true;
  return false;
}

function checkIntersection(obstacle, cat) {
  const back = obstacle.obj.position.z - obstacle.depth / 2;
  const front = obstacle.obj.position.z + obstacle.depth / 2;
  const catBack = cat.obj.position.z + cat.depth / 2;
  const catFront = cat.obj.position.z - cat.depth / 2;
  var check = 0;
  if ((back >= catFront && back <= catBack) || (front >= catFront && front <= catBack))
  {
    if (obstacle.type == "table")
      check = intersectionTable(obstacle, cat);
  }
  return check;
}

/*function checkIntersection(obstacle, player) {
  if (isInRangeZ(obstacle, player)) {
    return true;
  }
  return false;
}*/
