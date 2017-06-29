function Display() {

    this.jump = jump;
    this.mirrorObj = mirrorObj;
    this.shoot = shoot;
    this.setCharmanRight = setCharmanRight;
    this.setCharmanLeft = setCharmanLeft;
    this.clearBackground = clearBackground;
    this.fall = fall;
    this.setBackgroundImg = setBackgroundImg;
    this.handleCharmanImg = handleCharmanImg;
    this.showResetButton = showResetButton;

    return this;

    function showResetButton() {
        document.getElementById('gameOver').style.display = 'block';
    }

    function handleCharmanImg() {
        if (actions.swimming) {
            handleSwimmingImg();
        } else if (!actions.falling && (commands.right || commands.left) && (actions.jumping || !actions.firing)) {
            handleRunninImg();
        } else if (!actions.jumping && !actions.firing && !actions.falling) {
            charmanIdle();
        }
    }

    function fall(callback) {
        if (!actions.falling) {
            actions.falling = true;
            var target = mapArr[floorIndex][3] != 'hole' ? FLOORS[mapArr[floorIndex][2]] - FLOORVERTTOLERANCE : 120;

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
                    actions.falling = false;
                    if (callback) callback();
                }
            }
        }
    }

    function setBackgroundImg() {
        if (currMap % 2 == 0) {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains01.png')";
        } else {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains02.png')";
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

    function shoot(callback) {
        charmanImg.setAttribute('src', 'img/charman/charman-bow.gif');
        setTimeout(function () {
            callback();
        }, 300);
    }

    function jump() {
        var direction = 'up',
            jumpTop = calc.jumpTop();

        handleJumpingImg();
        jumping();

        function jumping() {
            if (topPos <= jumpTop)
                direction = 'down';
            topPos = getNewTopPosition(direction);
            base = calc.jumpFloorBase();
            if (topPos >= base) {
                topPos = base;
                charDiv.style.top = topPos+'%';
                actions.jumping = false;
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

    }

    function handleJumpingImg() {
        charmanImg.setAttribute('src', 'img/charman/charman-jump.gif');
        charmanImg.style.width = '100%';
        charmanImg.style.height = '100%';
        charmanImg.style.paddingTop = '0%';

        setCharmanBackToIdle();

        function setCharmanBackToIdle() {
            if (gameOn && !actions.jumping) {
                if (calc.isUserOnWater(leftPos)) {
                    handleSwimmingImg();
                    return;
                }
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
                setTimeout(setCharmanBackToIdle, 50);
            }
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
        if (!actions.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-run.gif') {
            charmanImg.setAttribute('src', 'img/charman/charman-run.gif');
            charmanImg.style.width = '100%';
            charmanImg.style.height = '100%';
            charmanImg.style.paddingTop = '0%';
        }
    }

    function handleSwimmingImg() {
        if (!actions.jumping && charmanImg.getAttribute('src') != 'img/charman/charman-swim.gif') {
            charmanImg.setAttribute('src', 'img/charman/charman-swim.gif');
            charmanImg.style.width = '160%';
            charmanImg.style.height = '60%';
            charmanImg.style.paddingTop = '85%';

        }
    }

}