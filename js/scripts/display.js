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
            topPos = calc.getCharmanCoord(charDiv.style.top);
        if (topPos == '') topPos = CHARBASEFLOOR;

            setTimeout(function () {
                charmanImg.setAttribute('src', 'img/charman/charman-hands-up.png');
            }, 20);
            
        falling()

        async function falling() {
            if (topPos <= 200) {
                topPos += JUMPVARRATE;
                charDiv.style.top = topPos+'%';
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
        charDiv.style.left = '-3%';
        leftPos = -3;
    }

    function setCharmanRight() {
        charDiv.style.left = '97%';
        leftPos = 95;
    }

    function charmanIdle() {
        charmanImg.setAttribute('src', 'img/charman/charman-01.png');
    }

    function shoot() {
        charmanImg.setAttribute('src', 'img/charman/charman-bow.gif');
        setTimeout(function () {
            if (gameOn) charmanImg.setAttribute('src', 'img/charman/charman-01.png');
        }, 300);
    }

    function jump() {
        charmanImg.setAttribute('src', 'img/charman/charman-jump.gif');
        charmanImg.style.width = '100%';
        charmanImg.style.height = '100%';
        charmanImg.style.paddingTop = '0%';
        setTimeout(function () {
            if (gameOn) {
                if (calc.isUserOnWater(leftPos)) {
                    handleSwimmingImg();
                    return;
                }
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
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
                comands.jumping = false;
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
        if (!comands.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-run.gif') {
            charmanImg.setAttribute('src', 'img/charman/charman-run.gif');
            charmanImg.style.width = '100%';
            charmanImg.style.height = '100%';
            charmanImg.style.paddingTop = '0%';
        }
    }

    function handleSwimmingImg() {
        if (!comands.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-swim.gif') {
            charmanImg.setAttribute('src', 'img/charman/charman-swim.gif');
            charmanImg.style.width = '160%';
            charmanImg.style.height = '60%';
            charmanImg.style.paddingTop = '96%';

        }
    }

}