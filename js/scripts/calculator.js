function Calculator() {

    this.setNewCoord = setNewCoord;

    return this;

    function setNewCoord(left) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (left == '') return basicMovRate+'%';
        left = parseFloat(left.match(regex).map(function(v) { return parseFloat(v); }));
        if (comands['right']) {
            display.mirrorObj(charmanImg, 1);
            left += basicMovRate;
        } else if (comands['left']) {
            display.mirrorObj(charmanImg, -1);
            left -= basicMovRate;
        }
        return (left >= 0) ? left+'%' : '0px';
    }

}