function Display() {

    var ufo = document.getElementById('ufo'),
        pig = document.getElementById('pig');

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
    this.abduction = abduction;
    this.updateTime = updateTime;
    this.jumpingPig = jumpingPig;
    this.standingPig = standingPig;
    this.abductPig = abductPig;

    init();

    return this;

    function abductPig() {
        var pos = {};
        pos.left = calc.getCoord(pig.style.left) - (calc.getCoord(ufo.style.width) / 2) + (FLOORHORTOLERANCE / 2);
        pos.top = 10;
        ufoIn(pos, abduct);

        function abduct() {
            var abductionRay = document.getElementById('abduction');
                abductionRay.style.top = (pos.top + calc.getCoord(ufo.style.height)) + '%';
                abductionRay.style.left = (pos.left + 2.5) + '%';
                abductionRay.style.display = 'block';
                pig.style.opacity = 1;
            fadePig();
        }

        function fadePig() {
            var opacity = pig.style.opacity - .02;
            if (opacity >= 0) {
                pig.style.opacity = opacity;
                setTimeout(fadePig, 20);
                return;
            }

            document.getElementById('abduction').style.display = 'none';
            setTimeout(function() {
                ufoOut();
                pig.style.display = 'none'

            }, 100);
        }
    }

    function standingPig(pos) {
        showPig(pos.left, pos.top);
    }

    function init() {
        ufo.style.width = 20+'%';
        ufo.style.height = 20+'%';

        pig.style.width = 8+'%';
        pig.style.height = 10+'%';
    }

    function jumpingPig(pos) {
        var base = pos.top,
            top = base,
            jumpTop = base - 30,
            dir  = 'up';

        showPig(pos.left, pos.top);

        jumping();

        function jumping() {
            if (top < jumpTop) {
                dir = 'down';
            } else if (top >= base) {
                dir = 'up';
            }

            switch (dir) {
                case 'up':
                    top -= JUMPVARRATE;
                    break;
                default:
                    top += JUMPVARRATE;
            }

            if (pig.style.display == 'block') {
                pig.style.top = top+'%';
                setTimeout(jumping, 10);
            }

        }

    }

    function updateTime() {
        document.getElementById('time').innerHTML = timer + ' segs.';
    }

    function abduction() {
        var pos = {};
        pos.left = leftPos - (calc.getCoord(ufo.style.width) / 2) + (FLOORHORTOLERANCE / 2);
        pos.top = 20;
        charmanImg.setAttribute('src', 'img/charman/charman-hands-up.png');
        ufoIn(pos, abduct);

        function abduct() {
            var abductionRay = document.getElementById('abduction');
                abductionRay.style.top = (pos.top + calc.getCoord(ufo.style.height)) + '%';
                abductionRay.style.left = (pos.left + 2.5) + '%';
                abductionRay.style.display = 'block';
                charDiv.style.opacity = 1;
            fadeChar();
        }

        function fadeChar() {
            var opacity = charDiv.style.opacity - .02;
            if (opacity >= 0) {
                charDiv.style.opacity = opacity;
                setTimeout(fadeChar, 20);
                return;
            }

            document.getElementById('abduction').style.display = 'none';
            setTimeout(ufoOut, 100);
            setTimeout(showResetButton, 1500);
        }
    }

    function charShot() {
        var hit = false;
        if (!actions.shooting) {
            var shot = document.getElementById('charShot'),
                direction = actions.lastDirection,
                left = (direction == 'right') ? leftPos + FLOORHORTOLERANCE : leftPos - CHARSHOTWIDTH,
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
                if (hit = calc.hitEnemy(left, top)) {
                    hide(hit.id);
                    shot.style.display = 'none';
                    actions.shooting = false;
                    return;
                }
                if (direction == 'right' && left <= 100) {
                    left += (basicMovRate * 2);
                    shot.style.left = left+'%';
                    setTimeout(moveLeft, 5);
                } else if (direction == 'left' && left >= -2) {
                    left -= (basicMovRate * 2);
                    shot.style.left = left+'%';
                    setTimeout(moveLeft, 5);
                } else {
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
        if (ufo.style.duisplay = 'block') {
            var shot = document.getElementById('ufoShot'),
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
                if (calc.hitCharman(left, top)) {
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
    }

    function ufoIn(pos, callback) {
        var top = -20;

        showUfo(pos.left, top);

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
        var top = calc.getCoord(ufo.style.top);

        leaving();

        function leaving() {
            if (top > -20) {
                top -= basicMovRate;
                ufo.style.top = top+'%';
                setTimeout(leaving, 5);
            } else {
                hide('ufo');
            }
        }
    }

    function showResetButton() {
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('gameTime').innerHTML = millisToMinutesAndSeconds(gameTime);
        document.getElementById('lastStage').innerHTML = currMap+1;
        display.updateTime();
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

    function showUfo(left, top) {
        ufo.style.display = 'block';
        ufo.style.top = top+'%';
        ufo.style.left = left+'%';
    }

    function showPig(left, top) {
        pig.style.opacity = 1;
        pig.style.top = top+'%';
        pig.style.left = left+'%';
        pig.style.display = 'block';
    }

    function hide(elemId) {
        document.getElementById(elemId).style.display = 'none';
    }

    function millisToMinutesAndSeconds(millis) {
        var date = new Date(millis);
        return date.getUTCMinutes() + ':' + addZero(date.getUTCSeconds(), 2) + ':' + date.getUTCMilliseconds();
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

}