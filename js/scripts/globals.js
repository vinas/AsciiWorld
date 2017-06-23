var charDiv,
    charmanImg,
    bkgLayer;
    gameOn = true;

var basicMovRate = .6,
    commands = {},
    currMap = 0,
    jumpTop = 30,
    mapIndexArray = [],
    floorIndex = 0,
    leftPos = 0,
    topPos;

var CHARBASEFLOOR = 51,
    CHARFIRSTFLOOR = 39,
    FLOORS = [66, 58, 25];
    SINGLEBLOCK = 6.25,
    DOUBLEBLOCK = SINGLEBLOCK * 2,
    JUMPVARRATE = .7,
    FLOORHORTOLERANCE = 5
    FLOORVERTTOLERANCE = 15;
