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

    function fall(idx) {
        if (!commands.falling) {
            commands.falling = true;
            var topPos = calc.getCharmanCoord(charDiv.style.top);
            if (!idx) idx = 0;
            if (topPos == '') topPos = FLOORS[idx] - FLOORVERTTOLERANCE;
            var target = (idx == 0) ? 120 : FLOORS[setup.loadMapArr()[currMap][floorIndex][2]] - FLOORVERTTOLERANCE;

            setTimeout(function () {
                charmanImg.setAttribute('src', 'img/charman/charman-hands-up.png');
            }, 20);

            falling();

            function falling() {
                if (topPos <= target) {
                    topPos += JUMPVARRATE;
                    charDiv.style.top = topPos+'%';
                    setTimeout(falling, 5);
                } else {
                    charDiv.style.top = target+'%';
                    commands.falling = false;
                }
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
        var direction = 'up';
        var topPos = calc.getCharmanCoord(charDiv.style.top);
        handleJumpingImg();
        jumping();

        function jumping() {
            if (topPos <= jumpTop)
                direction = 'down';
            topPos = getNewTopPosition(direction);
            base = getFloorBase();
            if (topPos >= base) {
                topPos = base;
                charDiv.style.top = topPos+'%';
                commands.jumping = false;
                return;
            }
            charDiv.style.top = topPos+'%';
            
            setTimeout(jumping, 10);
        }

        function getNewTopPosition(direction) {
            if (direction == 'up') {
                return topPos - JUMPVARRATE;
            }
            return topPos + JUMPVARRATE;
        }

        function getFloorBase() {
            var idx;
            if (!calc.isAllInSection(leftPos, floorIndex) && calc.isRightFloorHigherThanCurrent()) {
                idx = floorIndex+1;
            } else {
                idx = floorIndex;
            }
            return FLOORS[setup.loadMapArr()[currMap][idx][2]] - FLOORVERTTOLERANCE;
        }

    }

    function handleJumpingImg() {
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
        if (!commands.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-run.gif') {
            commands.swimming = false;
            charmanImg.setAttribute('src', 'img/charman/charman-run.gif');
            charmanImg.style.width = '100%';
            charmanImg.style.height = '100%';
            charmanImg.style.paddingTop = '0%';
        }
    }

    function handleSwimmingImg() {
        if (!commands.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-swim.gif') {
            commands.swimming = true;
            charmanImg.setAttribute('src', 'img/charman/charman-swim.gif');
            charmanImg.style.width = '160%';
            charmanImg.style.height = '60%';
            charmanImg.style.paddingTop = '96%';

        }
    }

}