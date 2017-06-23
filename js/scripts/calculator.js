function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isAllInSection = isAllInSection;
    this.isUserOnWater = isUserOnWater;
    this.checkIsHole = checkIsHole;
    this.isRightFloorHigherThanCurrent = isRightFloorHigherThanCurrent;
    
    return this;

    function checkIsHole() {
        var topPos = calc.getCharmanCoord(charDiv.style.top);
        if (
            setup.loadMapArr()[currMap][floorIndex][3] == 'hole'
            && (
                topPos == ''
                || topPos >= CHARBASEFLOOR
            )
            && (
                isAllInSection(leftPos, floorIndex)
            )
        ) {
            game.endGame('hole');
        }
    }

    function isUserOnWater() {

        if (setup.loadMapArr()[currMap][floorIndex]) {
            return (
                    setup.loadMapArr()[currMap][floorIndex][3] == 'liquid'
                    && (
                        isAllInSection(leftPos, floorIndex)
                        || (setup.loadMapArr()[currMap][floorIndex+1]
                            && setup.loadMapArr()[currMap][floorIndex+1][3] == 'liquid'
                        )
                    )
                );
        }
        return false;
    }

    function isAllInSection(pos, idx) {
        return (pos <= mapIndexArray[idx] - FLOORHORTOLERANCE);

    }

    function setCurrentFloorIndex() {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (leftPos < mapIndexArray[i]) {
                floorIndex = i;
                return;
            }
        }
    }

    function setNewCoord() {
        if (commands.right && canMoveRight()) {
            leftPos += basicMovRate;
            if (!isNextRightStepOnSameFloorBase() && isRightFloorHigherThanCurrent() && leftPos > mapIndexArray[getFloorIndexForPos(leftPos)] - FLOORHORTOLERANCE) {
                leftPos = mapIndexArray[getFloorIndexForPos(leftPos)] - FLOORHORTOLERANCE;
            }
            if (
                !commands.falling
                && !commands.jumping
                && isAllInSection(leftPos, getFloorIndexForPos(leftPos))
                && calc.getCharmanCoord(charDiv.style.top) + FLOORVERTTOLERANCE < FLOORS[setup.loadMapArr()[currMap][getFloorIndexForPos(leftPos)][2]]
            ) {
                display.fall(getFloorIndexForPos(leftPos));
            }
        
        } else if (commands.left && canMoveLeft()) {
            leftPos -= basicMovRate;
            if (!isNextLeftStepOnSameFloorBase() && !isLeftFloorNotHigherThanCurrent() && leftPos < mapIndexArray[getFloorIndexForPos(leftPos)]) {
                leftPos = mapIndexArray[getFloorIndexForPos(leftPos)];
            }
            if (
                !commands.falling
                && !commands.jumping
                && isAllInSection(leftPos, getFloorIndexForPos(leftPos))
                && calc.getCharmanCoord(charDiv.style.top) + FLOORVERTTOLERANCE < FLOORS[setup.loadMapArr()[currMap][getFloorIndexForPos(leftPos)][2]]
            ) {
                display.fall(getFloorIndexForPos(leftPos + FLOORHORTOLERANCE));
            }
        }
    }

    function getCharmanCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return 0;
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

    function notCrossMappingToOblivion() {
        return !(leftPos <= -.5 && currMap == 0);
    }

    function canMoveRight() {
        return commands.jumping || isNextRightStepOnSameFloorBase() || !isRightFloorHigherThanCurrent();
    }

    function isCurrFloorLower() {
        var lastFloorIdx = getFloorIndexForPos(leftPos - FLOORHORTOLERANCE),
            currFloorBase = setup.loadMapArr()[currMap][floorIndex][2];
            if (floorIndex == 0 && currMap == 0) {
                lastFloorBase = 0;
            } else if (floorIndex == 0) lastFloorBase = setup.loadMapArr()[currMap-1][7][2];
            else lastFloorBase = setup.loadMapArr()[currMap][lastFloorIdx][2];
            return currFloorBase < lastFloorBase;
    }

    function canMoveLeft() {
        return notCrossMappingToOblivion() && (isNextLeftStepOnSameFloorBase() || isLeftFloorNotHigherThanCurrent());
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

    function isLeftFloorNotHigherThanCurrent() {
        var currFloorBase = setup.loadMapArr()[currMap][floorIndex][2],
            nextFloorBase = setup.loadMapArr()[currMap][getFloorIndexForPos(leftPos)][2];
            return currFloorBase > nextFloorBase || getCharmanCoord(charDiv.style.top) + FLOORVERTTOLERANCE <= FLOORS[nextFloorBase];
    }

    function isRightFloorHigherThanCurrent() {
        var currFloorBase = setup.loadMapArr()[currMap][floorIndex][2],
            nextFloorBase = (leftPos < 95) ? setup.loadMapArr()[currMap][getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2] : setup.loadMapArr()[currMap+1][0][2];
            return currFloorBase < nextFloorBase && getCharmanCoord(charDiv.style.top) + FLOORVERTTOLERANCE > FLOORS[nextFloorBase];
    }

    function isCurrFloorLowerThanLast() {
        var currFloorBase = setup.loadMapArr()[currMap][getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2],
            nextFloorBase = setup.loadMapArr()[currMap][floorIndex][2];
            return currFloorBase < nextFloorBase;
    }

}