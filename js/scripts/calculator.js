function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isAllSection = isAllSection;
    this.isUserOnWater = isUserOnWater;
    
    return this;

    function isUserOnWater() {

        if (setup.loadMapArr()[currMap][floorIndex]) {
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
        return false;
    }

    function isAllSection() {
        return (leftPos < mapIndexArray[floorIndex] - 5);

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
        if (comands.right) {
            leftPos += basicMovRate;
        } else if (comands.left) {
            leftPos -= basicMovRate;
        }
    }

    function getCharmanCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return '';
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

}