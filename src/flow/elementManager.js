/*
    ELEMENT MEMORY

    0-19 Room
    20 Transition Room Back
    21 Transition Room Right
    22 Transition Room Left
    23 Transition Room LeftRight

 */

function takeElement(elementMemory, type) {
    if (type == "Room") {
        for (var i = 0; i < elementMemory.roomA.length; i++) {
            if (elementMemory.roomA[i].available == true) {
                return elementMemory.roomA[i];
            }
        };
    }
    else if (type == "TB")
        return elementMemory.roomA[20];
    else if (type == "TR")
        return elementMemory.roomA[21];
    else if (type == "TL")
        return elementMemory.roomA[22];
    else if (type == "TLR")
        return elementMemory.roomA[23];
    else if (type == "CeilingLight") {
        for (var i = 0; i < 6; i++) {
            if (elementMemory.decorationA[i].available)
                return elementMemory.decorationA[i];
        }
    }
    else if (type == "Table") {
        for (var i = 0; i < 6; i++) {
            if (elementMemory.obstacleA[i].available) {
                return elementMemory.obstacleA[i];
            }
        }
    }
    else if (type == "Turnstile") {
        for (var i = 6; i < 9; i++) {
            if (elementMemory.obstacleA[i][0].available) {
                return elementMemory.obstacleA[i];
            }
        }
    }
    return null;
}