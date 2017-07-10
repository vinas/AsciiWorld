function Game() {

    this.init = init;
    this.endGame = endGame;

    return this;

    function init() {
        setup.enableKeyboard();
        setup.preventDblClick();
        setup.resetGame();
        gameLoop();
        gameClock();
    }

    function gameLoop() {
        if (gameOn) {
            handleMovement();
            events.triggers();
            handleGameEnds();
            handleCrossMargin();
            handleFiring();
            handleJump();
        }
        setTimeout(gameLoop, 15);
    }

    function gameClock() {
        if (gameOn) {
            display.updateTime();
            timer += 1;
        }
        setTimeout(gameClock, 1000);
    }

    function handleFiring() {
        if (commands.fire && !actions.firing) {
            actions.firing = true;
            display.shoot(function() {
                commands.fire = false;
                actions.firing = false;
                display.charShot();
            });
            return;
        }
    }

    function handleMovement() {
        calc.setCurrentFloorIndex();
        moveCharman();
        actions.swimming = calc.isUserOnWater();
        display.handleCharmanImg();
    }


    function moveCharman() {
        calc.setNewCoord();
        if (calc.shouldBeFalling()) {
            if (calc.isOverHole()) {
                endGame('hole');
            } else {
                display.fall();
            }
        }
        charDiv.style.left = leftPos+'%';
    }

    function handleGameEnds() {
        var ending = getEndingCause()
        if (ending) endGame(ending);
    }

    function getEndingCause() {
        if (calc.isSteppingOnHole()) return 'hole';
        if (calc.touchedEnemy()) return 'touched';
        return false;
    }

    function endGame(reason) {
        gameOn = false;
        setGameEndingTime();
        switch (reason) {
            case 'hole':
                display.fall(display.showResetButton);
                break;
            case 'hit':
            case 'touched':
                display.showResetButton();
                break;
            case 'abducted':
                display.abduction();
                break;
        }
    }

    function handleJump() {
        if (commands.jump && !actions.jumping) {
            actions.jumping = true;
            display.jump();
        }
    }

    function handleCrossMargin() {
        if (commands.right || commands.left) {
            if (leftPos >= 98) {
                events.crossRight();
            } else if ((currMap != 0 ) && leftPos <= -3) {
                events.crossLeft();
            }
        }
    }

    function resetGame() {
        setup.setCharmanElements();
        setup.loadLevelMap();
        events.loadEventHandlers();
    }

}