function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isAllSection = isAllSection;
    this.isUserOnWater = isUserOnWater;
    
    return this;

    function isUserOnWater(leftPos) {
        return (
                setup.loadMapArr()[currMap][floorIndex][3] == 'liquid'
                && (
                    isAllSection(leftPos, floorIndex)
                    || (setup.loadMapArr()[currMap][floorIndex+1]
                        && setup.loadMapArr()[currMap][floorIndex+1][3] == 'liquid'
                    )
                )
            );
    }

    function isAllSection(leftPos) {
        return (leftPos < mapIndexArray[floorIndex] - 5);

    }

    function setCurrentFloorIndex(pos) {
        for (var i = 0; i < mapIndexArray.length; i++) {
            if (pos < mapIndexArray[i]) {
                floorIndex = i;
                return;
            }
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