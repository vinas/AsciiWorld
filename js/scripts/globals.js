var charDiv,
    charmanImg,
    bkgLayer;
    gameOn = true;

var basicMovRate = .6,
    commands = {},
    currMap = 0,
    jumpTop,
    mapIndexArray = [],
    floorIndex = 0,
    leftPos = 0,
    topPos;

var CHARBASEFLOOR = 52,
    CHARFIRSTFLOOR = 39,
    FLOORS = [66, 60, 54];
    SINGLEBLOCK = 6.25,
    DOUBLEBLOCK = SINGLEBLOCK * 2,
    JUMPVARRATE = .7,
    FLOORHORTOLERANCE = 5
    FLOORVERTTOLERANCE = 14,
    JUMPHIGH = 21;
