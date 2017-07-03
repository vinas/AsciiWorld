function Calculator() {

    this.setNewCoord = setNewCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isUserOnWater = isUserOnWater;
    this.isSteppingOnHole = isSteppingOnHole;
    this.shouldBeFalling = shouldBeFalling;
    this.jumpTop = jumpTop;
    this.jumpFloorBase = jumpFloorBase;
    this.getCoord = getCoord;
    this.hitCharman = hitCharman;
    this.hitEnemy = hitEnemy;

    return this;

    function hitEnemy(left, top) {
        var hit = false;
        enemies.forEach(function(enemy) {
            if (isEnemyVisible(enemy)) {
                enemyLeft = getCoord(enemy.style.left);
                enemyTop = getCoord(enemy.style.top);
                if (
                    left + CHARSHOTWIDTH >= enemyLeft
                    && left <= enemyLeft + getCoord(enemy.style.width)
                    && top >= enemyTop
                    && top <= enemyTop + getCoord(enemy.style.height)
                ) {
                    hit = enemy;
                    return true;
                }
            }
        });
        return hit;
    }

    function hitCharman(left, top) {
        return left < leftPos + FLOORHORTOLERANCE - 1
            && left > leftPos - 1
            && top >= topPos
            && top < topPos + FLOORVERTTOLERANCE;
    }

    function getCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return 0;
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

    function jumpFloorBase() {
        var idx = (!isAllInSection() && isRightFloorHigherThanCurrent()) ? floorIndex+1 : floorIndex;
        return FLOORS[mapArr[idx][2]] - FLOORVERTTOLERANCE;
    }

    function jumpTop() {
        var idx = (!isAllInSection() && isRightFloorHigherThanCurrent()) ? floorIndex+1 : floorIndex;
        return FLOORS[mapArr[idx][2]] - FLOORVERTTOLERANCE - JUMPHIGH;
    }

    function setNewCoord() {
        if (commands.right && canMoveRight()) {
            leftPos += basicMovRate;
            restrainMovement();
        } else if (commands.left && canMoveLeft()) {
            leftPos -= basicMovRate;
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
        return !actions.falling
            && !actions.swimming
            && !actions.jumping
            && isAllInSection()
            && topPos + FLOORVERTTOLERANCE < FLOORS[mapArr[floorIndex][2]];
    }

    function notCrossMappingToOblivion() {
        return !(leftPos <= -.5 && currMap == 0);
    }

    function restrainMovement() {
        if (!isNextRightStepOnSameFloorBase() && isRightFloorHigherThanCharTop() && leftPos > mapIndexArray[floorIndex] - FLOORHORTOLERANCE) {
            leftPos = mapIndexArray[floorIndex] - FLOORHORTOLERANCE;
        }
    }

    function canMoveRight() {
        return !actions.falling && (!isAllInSection() && !isRightFloorHigherThanCharTop()) || (isNextRightStepOnSameFloorBase() || !isRightFloorHigherThanCharTop());
    }

    function canMoveLeft() {
        return !actions.falling && notCrossMappingToOblivion() && (isNextLeftStepOnSameFloorBase() || !isLeftFloorHigherThanCharTop());
    }

    function isNextRightStepOnSameFloorBase() {
        return (floorIndex == getFloorIndexForPos(leftPos + FLOORHORTOLERANCE));
    }

    function isNextLeftStepOnSameFloorBase() {
        return (floorIndex == getFloorIndexForPos(leftPos - basicMovRate));
    }

    function getFloorIndexForPos(pos) {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (pos < mapIndexArray[i]) {
                return i;
            }
        }
        return -1;
    }

    function isLeftFloorHigherThanCharTop() {
        var currFloorBase = mapArr[floorIndex][2],
            nextFloorBase = mapArr[floorIndex-1][2];
            return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isRightFloorHigherThanCharTop() {
        var currFloorBase = (mapArr[floorIndex]) ? mapArr[floorIndex][2] : 0,
            nextFloorBase = (leftPos < 95) ? mapArr[getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2] : mapArr[currMap+1][0][2];
            return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isRightFloorHigherThanCurrent() {
        var currFloorBase = (mapArr[floorIndex]) ? mapArr[floorIndex][2] : 0,
            nextFloorBase = (leftPos < 95) ? mapArr[floorIndex+1][2] : mapArr[currMap+1][0][2];
            return currFloorBase < nextFloorBase;
    }

    function isCharmanHigherThanNextFloor(nextFloorBase) {
        return topPos + FLOORVERTTOLERANCE > FLOORS[nextFloorBase]
    }

    function isNextSectionHole() {
        return mapArr[floorIndex+1][3] == 'hole';
    }

    function isEnemyVisible(enemy) {
        return enemy && enemy.style.display == 'block';
    }

}