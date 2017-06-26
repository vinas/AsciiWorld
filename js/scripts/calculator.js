function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isAllInSection = isAllInSection;
    this.isUserOnWater = isUserOnWater;
    this.isSteppingOnHole = isSteppingOnHole;
    this.isRightFloorHigherThanCurrent = isRightFloorHigherThanCurrent;
    this.getFloorIndexForPos = getFloorIndexForPos;
    this.shouldBeFalling = shouldBeFalling;

    return this;

    function setNewCoord() {
        if (commands.right && canMoveRight()) {
            leftPos += basicMovRate;
            restrainMovement('right');
        } else if (commands.left && canMoveLeft()) {
            leftPos -= basicMovRate;
            restrainMovement('left');
        }
    }

    function isSteppingOnHole() {
        return (
                mapArr[floorIndex][3] == 'hole'
                && topPos >= CHARBASEFLOOR
                && (
                    isAllInSection()
                    || mapArr[floorIndex+1][3] == 'hole'
                )
            );
    }

    function isUserOnWater() {
        return (
                mapArr[floorIndex][3] == 'liquid'
                && (
                    isAllInSection()
                    || (mapArr[floorIndex+1]
                        && mapArr[floorIndex+1][3] == 'liquid'
                    )
                )
            );
    }

    function isAllInSection() {
        return (leftPos <= mapIndexArray[floorIndex] - FLOORHORTOLERANCE);

    }

    function setCurrentFloorIndex() {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (leftPos < mapIndexArray[i]) {
                floorIndex = i;
                return;
            }
        }
    }

    function shouldBeFalling() {
        return !commands.falling
            && !commands.swimming
            && !commands.jumping
            && isAllInSection()
            && topPos + FLOORVERTTOLERANCE < FLOORS[mapArr[getFloorIndexForPos(leftPos)][2]];
    }

    function getCharmanCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return 0;
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

    function notCrossMappingToOblivion() {
        return !(leftPos <= -.5 && currMap == 0);
    }

    function restrainMovement(dir) {
        switch (dir) {
            case 'right':
                if (!isNextRightStepOnSameFloorBase() && isRightFloorHigherThanCurrent() && leftPos > mapIndexArray[getFloorIndexForPos(leftPos)] - FLOORHORTOLERANCE) {
                    leftPos = mapIndexArray[getFloorIndexForPos(leftPos)] - FLOORHORTOLERANCE;
                }
                break;
            case 'left':
                if (!isNextLeftStepOnSameFloorBase() && isLeftFloorHigherThanCurrent() && leftPos < mapIndexArray[getFloorIndexForPos(leftPos)]) {
                    leftPos = mapIndexArray[getFloorIndexForPos(leftPos)];
                }
        }
    }

    function canMoveRight() {
        return isNextRightStepOnSameFloorBase() || !isRightFloorHigherThanCurrent();
    }

    function isCurrFloorLower() {
        var lastFloorIdx = getFloorIndexForPos(leftPos - FLOORHORTOLERANCE),
            currFloorBase = mapArr[floorIndex][2];
            if (floorIndex == 0 && currMap == 0) {
                lastFloorBase = 0;
            } else if (floorIndex == 0) lastFloorBase = mapArr[currMap-1][7][2];
            else lastFloorBase = mapArr[lastFloorIdx][2];
            return currFloorBase < lastFloorBase;
    }

    function canMoveLeft() {
        return notCrossMappingToOblivion() && (isNextLeftStepOnSameFloorBase() || !isLeftFloorHigherThanCurrent());
    }

    function isNextRightStepOnSameFloorBase() {
        return (floorIndex == getFloorIndexForPos(leftPos + FLOORHORTOLERANCE));
    }

    function isNextLeftStepOnSameFloorBase() {
        return (floorIndex == getFloorIndexForPos(leftPos - FLOORHORTOLERANCE));
    }

    function getFloorIndexForPos(pos) {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (pos < mapIndexArray[i]) {
                return i;
            }
        }
        return -1;
    }

    function isLeftFloorHigherThanCurrent() {
        var currFloorBase = mapArr[floorIndex][2],
            nextFloorBase = mapArr[getFloorIndexForPos(leftPos)][2];
            return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isRightFloorHigherThanCurrent() {
        var currFloorBase = (mapArr[floorIndex]) ? mapArr[floorIndex][2] : 0,
            nextFloorBase = (leftPos < 95) ? mapArr[getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2] : mapArr[currMap+1][0][2];
            return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isCurrFloorLowerThanLast() {
        var currFloorBase = mapArr[getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2],
            nextFloorBase = mapArr[floorIndex][2];
            return currFloorBase < nextFloorBase;
    }

    function isCharmanHigherThanNextFloor(nextFloorBase) {
        return topPos + FLOORVERTTOLERANCE > FLOORS[nextFloorBase]
    }

    function isNextSectionHole() {
        return mapArr[floorIndex+1][3] == 'hole';
    }

}