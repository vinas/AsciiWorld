function Display() {

    var ufo = document.getElementById('ufo'),
        pig = document.getElementById('pig'),
        bullet = document.getElementById('charShot'),
        ufoBullet = document.getElementById('ufoShot'),
        abductionRay = document.getElementById('abduction');

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

    function init() {
        charDiv = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
        bkgLayer = document.getElementById('gameBrackground');

        charDiv.style.width = FLOORHORTOLERANCE+'%';
        charDiv.style.height = FLOORVERTTOLERANCE+'%';

        bullet.style.width = 1.5+'%';
        bullet.style.height = 1+'%';

        ufoBullet.style.width = 2+'%';
        ufoBullet.style.height = 1+'%';

        ufo.style.width = 20+'%';
        ufo.style.height = 20+'%';

        pig.style.width = 8+'%';
        pig.style.height = 10+'%';
    }

    function abductPig() {
        var pos = {};
        pos.left = calc.getCoord(pig.style.left) - (calc.getCoord(ufo.style.width) / 2) + (FLOORHORTOLERANCE / 2);
        pos.top = 10;
        ufoIn(pos, abduct, pig);
    }

    function abduct(abductee) {
        at(
            abductionRay,
            calc.getCoord(ufo.style.left) + 2.5,
            calc.getCoord(ufo.style.top) + calc.getCoord(ufo.style.height)
        );
        fade(abductee, abducted);
    }

    function fade(el, callback) {
        var opacity = el.style.opacity - .02;
        if (opacity >= 0) {
            el.style.opacity = opacity;
            setTimeout(function() { fade(el, callback) }, 20);
            return;
        }
        if (callback) callback(el);
    }

    function abducted(el) {
        abductionRay.style.display = 'none';
        setTimeout(function() {
            ufoOut();
            el.style.display = 'none';
            if (el.id == 'charman') setTimeout(showResetButton, 1500);
        }, 100);
    }

    function standingPig(pos) {
        at(pig, pos.left, pos.top);
    }

    function jumpingPig(pos) {
        var base = pos.top,
            top = base,
            jumpTop = base - 20,
            dir = 'up';
        at(pig, pos.left, pos.top);
        jumping();
        function jumping() {
            if (top < jumpTop) {
                dir = 'down';
            } else if (top >= base) {
                dir = 'up';
            }
            if (dir == 'up') {
                top -= JUMPVARRATE;
            } else {
                top += JUMPVARRATE;
            }
            if (calc.isVisible(pig)) {
                moveVertically(pig, top);
                setTimeout(jumping, 10);
            }
        }

    }

    function jump() {
        var direction = 'up',
            jumpTop = calc.jumpTop();

        handleJumpingImg();
        jumping();

        function jumping() {
            var base = calc.jumpFloorBase();
            if (topPos <= jumpTop) direction = 'down';
            topPos = getNewTopPosition(direction);
            if (topPos >= base) {
                topPos = base;
                moveVertically(charDiv, topPos);
                actions.jumping = false;
                return;
            }
            moveVertically(charDiv, topPos);
            setTimeout(jumping, 10);
        }

        function getNewTopPosition(direction) {
            if (direction == 'up') {
                return topPos - JUMPVARRATE;
            }
            return topPos + JUMPVARRATE;
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
        ufoIn(pos, abduct, charDiv);
    }

    function charShot() {
        var hit = false;
        if (!actions.shooting) {
            var direction = actions.lastDirection,
                left = (direction == 'right') ? leftPos + FLOORHORTOLERANCE : leftPos - CHARSHOTWIDTH,
                top = topPos + 6;
            at(bullet, left, top);
            actions.shooting = true;

            moveBullet();

            function moveBullet() {
                if (actions.cancelShot) {
                    cancelShooting();
                    return;
                }
                if (hit = calc.hitEnemy(bullet)) {
                    hide(hit.id);
                    cancelShooting();
                    return;
                }
                if (direction == 'right' && left <= 100) {
                    left += (basicMovRate * 2);
                    bullet.style.left = left+'%';
                    setTimeout(moveBullet, 5);
                } else if (direction == 'left' && left >= -2) {
                    left -= (basicMovRate * 2);
                    bullet.style.left = left+'%';
                    setTimeout(moveBullet, 5);
                } else {
                    cancelShooting();
                    return;
                }
            }
        }
    }

    function cancelShooting() {
        bullet.style.display = 'none';
        actions.shooting = false;
    }

    function ufoAttack01(pos) {
        ufoIn(pos, ufoShot);
    }

    function ufoShot() {
        if (ufo.style.duisplay = 'block') {
            var left = calc.getCoord(ufo.style.left) - 2;

            at(ufoBullet, left, calc.getCoord(ufo.style.top) + 10);

            setTimeout(ufoOut, 300);

            moveLeft();

            function moveLeft() {
                if (actions.cancelShot) {
                    ufoBullet.style.display = 'none';
                    return;
                }
                if (calc.areTouching(ufoBullet, charDiv)) {
                    game.endGame('hit');
                    return;
                }
                if (left >= -2) {
                    left -= (basicMovRate *.6);
                    ufoBullet.style.left = left+'%';
                    setTimeout(moveLeft, 5);
                } else {
                    ufoBullet.style.display = 'none';
                }
            }
        }
    }

    function ufoIn(pos, callback, args) {
        var top = -20;

        at(ufo, pos.left, top);

        landing();

        function landing() {
            if (top <= pos.top) {
                top += basicMovRate * 1.5;
                ufo.style.top = top+'%';
                setTimeout(landing, 5);
            } else {
                ufo.style.top = pos.top+'%';
                if (callback) callback(args);
            }
        }
    }

    function ufoOut() {
        var top = calc.getCoord(ufo.style.top);

        leaving();

        function leaving() {
            if (top > -20) {
                top -= basicMovRate * 2;
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
                    moveVertically(charDiv, topPos);
                    setTimeout(falling, 5);
                } else {
                    moveVertically(charDiv, target);
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
        floorIndex = 0;
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
        if (callback) {
            setTimeout(function () {
                callback();
            }, 300);
        }
    }


    function handleJumpingImg() {
        charmanImg.setAttribute('src', 'img/charman/charman-jump.gif');
        charmanImg.style.width = '100%';
        charmanImg.style.height = '100%';
        charmanImg.style.paddingTop = '0%';
        setCharmanBackToIdle();
    }

    function mirrorObj(objeto, escala) {
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

    function at(el, left, top) {
        if (el) {
            el.style.opacity = 1;
            if (left) el.style.left = left+'%';
            if (top) el.style.top = top+'%';
            el.style.display = 'block';
        }
    }

    function moveVertically(el, top) {
        if (el && top) el.style.top = top+'%';
    }

}