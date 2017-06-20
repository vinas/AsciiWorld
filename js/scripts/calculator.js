function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.getCurrentFloorIdx = getCurrentFloorIdx;
    this.isAllSection = isAllSection;
    this.isUserOnWater = isUserOnWater;
    this.setBaseTop = setBaseTop;

    return this;

    function setBaseTop() {

    }

    function isUserOnWater(leftPos) {
        var floorIdx = getCurrentFloorIdx((leftPos == '') ? 0 : leftPos);
        return (
                setup.loadMapArr()[currMap][floorIdx][3] == 'liquid'
                && (
                    isAllSection(leftPos, floorIdx)
                    || (setup.loadMapArr()[currMap][floorIdx+1]
                        && setup.loadMapArr()[currMap][floorIdx+1][3] == 'liquid'
                    )
                )
            );
    }

    function isAllSection(leftPos, floorIdx) {
        return (leftPos < mapIndexArray[floorIdx] - 5);

    }

    function getCurrentFloorIdx(pos) {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (pos < mapIndexArray[i]) return i;
        }
    }

    function setNewCoord(left) {
        if (comands.right) {
            left += basicMovRate;
        } else if (comands.left) {
            left -= basicMovRate;
        }
        return left;
    }

    function getCharmanCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return '';
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

}