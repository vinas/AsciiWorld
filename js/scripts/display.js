function Display() {

    this.moveCharman = moveCharman;

    return this;

    function moveCharman(direction) {
        setTimeout(function() {
            charman.style.left = setNewCoord(charman.style.left, direction);
        }, 50);
    }

    function setNewCoord(left, direction) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (left == '' && direction == 39) return basicMovRate+'%';
        left = parseFloat(left.match(regex).map(function(v) { return parseFloat(v); }));
        switch (direction) {
            case 39:
                if (charmanImg.getAttribute('src') != 'img/charman/charman-run.gif')
                    charmanImg.setAttribute('src', 'img/charman/charman-run.gif')
                mirrorObj(document.getElementById('charmanImg'), 1);
                left += basicMovRate;
                break;
            case 37:
                if (charmanImg.getAttribute('src') != 'img/charman/charman-run.gif')
                    charmanImg.setAttribute('src', 'img/charman/charman-run.gif')
                mirrorObj(document.getElementById('charmanImg'), -1);
                left -= basicMovRate;
                break;

        }
        return (left >= 0) ? left+'%' : '0px';
    }

    function mirrorObj(objeto, escala)
    {
        objeto.style.MozTransform = "scaleX("+escala+")";
        objeto.style.webkitTransform = "scaleX("+escala+")";
        objeto.style.OTransform = "scaleX("+escala+")";
        objeto.style.transform = "scaleX("+escala+")";
        objeto.style.msFilter = "fliph";
        objeto.style.filter = "fliph";
    }

}