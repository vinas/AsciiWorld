function Display() {

    this.moveCharman = moveCharman;

    return this;

    function moveCharman() {
        if (comands['fire'] && !comands['firing']) {
            comands['firing'] = true;
            charmanImg.setAttribute('src', 'img/charman/charman-shoot.png');
            setTimeout(function () {
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
            }, 200);
            return;
        }

        if (comands['jump'] && !comands['jumping']) {
            comands['jumping'] = true;
            jump();
        }
        
        if (!comands['fire'] && comands['firing']) comands['firing'] = false;
        
        if ((comands['right'] || comands['left']) && !comands['firing']) {
            handleRunninImg();
            charman.style.left = setNewCoord(charman.style.left);
            return;
        }
        
        if (!comands['right'] && !comands['left'] && !comands['firing']) charmanImg.setAttribute('src', 'img/charman/charman-01.png');
    }

    function jump() {
        var direction = 'up';
        var topPos = 0;

        jumping()

        function jumping() {
            if (topPos <= -80)
                direction = 'down';

            if (direction == 'up') {
                topPos -= 5;
            } else {
                topPos += 5;
            }

            if (topPos >= 0) {
                topPos = 0;
                comands['jumping'] = false;
            } else {
                setTimeout(jumping, 20);
            }

            charman.style.top = topPos;
        }
    }

    function setNewCoord(left) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (left == '') return basicMovRate+'%';
        left = parseFloat(left.match(regex).map(function(v) { return parseFloat(v); }));
        if (comands['right']) {
            mirrorObj(charmanImg, 1);
            left += basicMovRate;
        } else if (comands['left']) {
            mirrorObj(charmanImg, -1);
            left -= basicMovRate;
        }
        return (left >= 0) ? left+'%' : '0px';
    }

    function mirrorObj(objeto, escala)
    {
        objeto.style.MozTransform = 'scaleX('+escala+')';
        objeto.style.webkitTransform = 'scaleX('+escala+')';
        objeto.style.OTransform = 'scaleX('+escala+')';
        objeto.style.transform = 'scaleX('+escala+')';
        objeto.style.msFilter = 'fliph';
        objeto.style.filter = 'fliph';
    }

    function handleRunninImg() {
        if (charmanImg.getAttribute('src') != 'img/charman/charman-run.gif')
            charmanImg.setAttribute('src', 'img/charman/charman-run.gif');
    }

}