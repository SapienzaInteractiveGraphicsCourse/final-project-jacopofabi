function checkIn(cat, tRoomA, wallsA) {
    var limit = wallsA.length >= 6 ? 6 : wallsA.length; 
    for (var i = 0; i < tRoomA.length; i++) {
        const room = tRoomA[i];
        if (room.isIn(cat)) {
          return room;
        }
    }
    for (var j = 0; j < limit; j++) {
        const room = wallsA[i];
        if (room.isIn(cat)) {
          return room;
        }
    }
    return null;
}

function checkIntersection(obstaclesA, cat) {
    for (var i = 0; i < obstaclesA.length; i++) {
        if (obstaclesA[i].checkIntersection(cat)) {
            return true;
        }
    }
    return false;
}