function Display() {

    this.jump = jump;
    this.handleRunninImg = handleRunninImg;
    this.mirrorObj = mirrorObj;
    this.shoot = shoot;
    this.charmanIdle = charmanIdle;
    this.setCharmanRight = setCharmanRight;
    this.setCharmanLeft = setCharmanLeft;
    this.clearBackground = clearBackground;
    this.fall = fall;

    return this;

    function fall() {
        var char = document.getElementById('charman'),
            topPos = calc.getCharmanCoord(char.style.top);

            setTimeout(function () {
                document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-hands-up.png');
            }, 20);
            
        falling()

        async function falling() {
            if (topPos <= 500) {
                topPos += 1.5;
                char.style.top = topPos;
                setTimeout(falling, 5);
            }
        }

    }

    function clearBackground(){
        var elements = document.getElementsByClassName('floor');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    function setCharmanLeft() {
        document.getElementById('charman').style.left = '-1%';
    }

    function setCharmanRight() {
        document.getElementById('charman').style.left = '95%';
    }

    function charmanIdle() {
        document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-01.png');
    }

    function shoot() {
        document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-bow.gif');
        setTimeout(function () {
            if (gameOn) document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-01.png');
        }, 300);
    }

    function jump() {
        document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-jump.gif');
        setTimeout(function () {
            if (gameOn) document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-01.png');
        }, 800);

        var direction = 'up';
        var topPos = 0;

        jumping()

        function jumping() {
            if (topPos <= -60)
                direction = 'down';

            if (direction == 'up') {
                topPos -= 2;
            } else {
                topPos += 2;
            }

            if (topPos >= 0) {
                topPos = 0;
                comands['jumping'] = false;
            } else {
                setTimeout(jumping, 10);
            }
            document.getElementById('charman').style.top = topPos;
        }
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
        if (!comands['jumping'] && document.getElementById('charmanImg').getAttribute('src') != 'img/charman/charman-run.gif')
            document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-run.gif');
    }

}