function Game() {

    this.init = init;
    this.endGame = endGame;

    return this;

    function init() {
        events.loadEventHandlers();
        setup.resetGame();
        gameLoop();
    }

    function gameLoop() {
        if (gameOn) {
            handleCrossMargin();
            handleFiring();
            handleJump();
            handleMovement();
        }
        setTimeout(gameLoop, 15);
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
        charmanMovement();
    }

    function charmanMovement() {
        calc.setCurrentFloorIndex();
        handleGameEnds();
        moveCharman();
        handleTriggers();
        actions.swimming = calc.isUserOnWater();
        display.handleCharmanImg();
    }

    function handleTriggers() {
        var trigger = levelTriggers[currMap][Math.floor(leftPos)+FLOORHORTOLERANCE];
        if (commands.right && trigger) {
            if (!trigger.triggered) {
                trigger.actions.forEach(function(action, idx) {
                    if (trigger.params[idx]) {
                        action(trigger.params[idx]);
                    } else {
                        action();
                    }
                });
                trigger.triggered = true;
            }
        }
    }

    function moveCharman() {
        if (!actions.firing) calc.setNewCoord();
        if (calc.shouldBeFalling()) display.fall();
        charDiv.style.left = leftPos+'%';
    }

    function handleGameEnds() {
        var ending = getEndingCause()
        if (ending) endGame(ending);
    }

    function getEndingCause() {
        if (calc.isSteppingOnHole()) return 'hole'
        return false;
    }

    function endGame(reason) {
        gameOn = false;
        switch (reason) {
            case 'hole':
                display.fall(display.showResetButton);
                break;
            case 'hit':
                display.showResetButton();
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
                actions.cancelShot = true;
                setup.hideHidables();
                display.setCharmanLeft();
                currMap += 1;
                setup.loadLevelMap();
                setTimeout(function() { actions.cancelShot = false; }, 20);
            } else if ((currMap != 0 ) && leftPos <= -3) {
                actions.cancelShot = true;
                setup.hideHidables();
                display.setCharmanRight();
                currMap -= 1;
                setup.loadLevelMap();
                setTimeout(function() { actions.cancelShot = false; }, 20);
            }
        }
    }

    function resetGame() {
        setup.setCharmanElements();
        setup.loadLevelMap();
        events.loadEventHandlers();
    }

}