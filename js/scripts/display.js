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
    this.ufoIn = ufoIn;
    this.ufoOut = ufoOut;
    this.ufoAttack01 = ufoAttack01;
    this.charShot = charShot;

    return this;

    function charShot() {
        if (!actions.shooting) {
            var ufo = document.getElementById('ufo'),
                shot = document.getElementById('charShot'),
                direction = actions.lastDirection,
                left = (direction == 'right') ? leftPos + 5 : leftPos - 1.5,
                top = topPos + 6;

            shot.style.left = left+'%';
            shot.style.top = top+'%';
            shot.style.display = 'block';
            actions.shooting = true;

            moveLeft();

            function moveLeft() {
                if (actions.cancelShot) {
                    shot.style.display = 'none';
                    actions.shooting = false;
                    return;
                }
                /*if (calc.hit(left, top)) {
                    game.endGame('hit');
                    return;
                }*/
                if (direction == 'right' && left <= 100) {
                    console.log('AAAAAA');
                    left += (basicMovRate *.6);
                    shot.style.left = left+'%';
                    setTimeout(moveLeft, 5);
                } else if (direction == 'left' && left >= -2) {
                    console.log('BBBB');
                    left -= (basicMovRate *.6);
                    shot.style.left = left+'%';
                    setTimeout(moveLeft, 5);
                } else {
                    console.log('CCCCCCCCCCCCCCCCCCCC');
                    shot.style.display = 'none';
                    actions.shooting = false;
                    return;
                }
            }

        }
    }

    function ufoAttack01(pos) {
        ufoIn(pos, ufoShot);
    }

    function ufoShot() {
        var ufo = document.getElementById('ufo'),
            shot = document.getElementById('ufoShot'),
            left = calc.getCoord(ufo.style.left) - 2,
            top = calc.getCoord(ufo.style.top) + 10;

        shot.style.left = left+'%';
        shot.style.top = top+'%';
        shot.style.display = 'block';

        setTimeout(ufoOut, 300);

        moveLeft();

        function moveLeft() {
            if (actions.cancelShot) {
                shot.style.display = 'none';
                return;
            }
            if (calc.hit(left, top)) {
                game.endGame('hit');
                return;
            }
            if (left >= -2) {
                left -= (basicMovRate *.6);
                shot.style.left = left+'%';
                setTimeout(moveLeft, 5);
            } else {
                shot.style.display = 'none';
            }
        }
    }

    function ufoIn(pos, callback) {
        var ufo = document.getElementById('ufo'),
            top = -20;

        ufo.style.display = 'block';
        ufo.style.top = top+'%';
        ufo.style.left = pos.left+'%';

        landing();

        function landing() {
            if (top <= pos.top) {
                top += basicMovRate;
                ufo.style.top = top+'%';
                setTimeout(landing, 5);
            } else {
                ufo.style.top = pos.top+'%';
                if (callback) callback();
            }
        }
    }

    function ufoOut() {
        var ufo = document.getElementById('ufo'),
            top = calc.getCoord(ufo.style.top);

        leaving();

        function leaving() {
            if (top > -20) {
                top -= basicMovRate;
                ufo.style.top = top+'%';
                setTimeout(leaving, 5);
            } else {
                ufo.style.display = 'none';
            }
        }
    }

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