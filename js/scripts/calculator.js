function Calculator() {

    this.setNewCoord = setNewCoord;
    this.getCharmanCoord = getCharmanCoord;
    this.getCurrentFloorIdx = getCurrentFloorIdx;
    this.isAllInHole = isAllInHole;

    return this;

    function isAllInHole(leftPos, floorIdx) {
        leftPos = getCharmanCoord(leftPos);
        return (leftPos < (12.5 * (floorIdx+1) -5));

    }

    function getCurrentFloorIdx(pos) {
        pos = getCharmanCoord(pos);
        switch (true) {
            case (pos < 12.5):
                return 0;
            case (pos < 25):
                return 1
            case (pos < 37.5):
                return 2;
            case (pos < 50):
                return 3;
            case (pos < 62.5):
                return 4;
            case (pos < 75):
                return 5;
            case (pos < 87.5):
                return 6;
            default:
                return 7;
        }
    }

    function setNewCoord(left) {
        left = getCharmanCoord(left);
        if (comands.right) {
            left += basicMovRate;
        } else if (comands.left) {
            left -= basicMovRate;
        }
        return left+'%';
    }

    function getCharmanCoord(coord) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (coord == '') return basicMovRate;
        return parseFloat(coord.match(regex).map(function(v) { return parseFloat(v); }));
    }

}