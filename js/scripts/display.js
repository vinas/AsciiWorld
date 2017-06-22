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
    this.handleSwimmingImg = handleSwimmingImg;

    return this;

    function fall() {
        var char = document.getElementById('charman'),
            topPos = calc.getCharmanCoord(char.style.top);
        if (topPos == '') topPos = CHARBASEFLOOR;

            setTimeout(function () {
                document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-hands-up.png');
            }, 20);
            
        falling()

        async function falling() {
            if (topPos <= 200) {
                topPos += JUMPVARRATE;
                char.style.top = topPos+'%';
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
        leftPos = -1;
    }

    function setCharmanRight() {
        document.getElementById('charman').style.left = '95%';
        leftPos = 95;
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
        var charImg = document.getElementById('charmanImg'),
            charDiv = document.getElementById('charman');
        charImg.setAttribute('src', 'img/charman/charman-jump.gif');
        charImg.style.width = '100%';
        charImg.style.height = '100%';
        charImg.style.paddingTop = '0%';
        setTimeout(function () {
            if (gameOn) {
                if (calc.isUserOnWater(calc.getCharmanCoord(charDiv.style.left))) {
                    handleSwimmingImg();
                    return;
                }
                charImg.setAttribute('src', 'img/charman/charman-01.png');
            }
        }, 800);

        var direction = 'up';
        var topPos = calc.getCharmanCoord(charDiv.style.top);
        if (topPos == '') topPos = CHARBASEFLOOR;
        

        jumping()

        function jumping() {
            if (topPos <= jumpTop)
                direction = 'down';

            if (direction == 'up') {
                topPos -= JUMPVARRATE;
            } else {
                topPos += JUMPVARRATE;
            }

            if (topPos >= CHARBASEFLOOR) {
                topPos = CHARBASEFLOOR;
                comands['jumping'] = false;
            } else {
                setTimeout(jumping, 10);
            }
            charDiv.style.top = topPos+'%';
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
        var charImg = document.getElementById('charmanImg');
        if (!comands['jumping'] && charImg.getAttribute('src') != 'img/charman/charman-run.gif') {
            charImg.setAttribute('src', 'img/charman/charman-run.gif');
            charImg.style.width = '100%';
            charImg.style.height = '100%';
            charImg.style.paddingTop = '0%';
        }
    }

    function handleSwimmingImg() {
        var charImg = document.getElementById('charmanImg');
        if (!comands['jumping'] && charImg.getAttribute('src') != 'img/charman/charman-swim.gif') {
            charImg.setAttribute('src', 'img/charman/charman-swim.gif');
            charImg.style.width = '160%';
            charImg.style.height = '60%';
            charImg.style.paddingTop = '96%';

        }
    }

}