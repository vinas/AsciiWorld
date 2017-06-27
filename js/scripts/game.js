function Game() {

    this.init = init;

    return this;

    function init() {
        setup.setCharmanElements();
        setup.loadLevelMap();
        events.loadEventHandlers();

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
            });
            return;
        }
    }

    function handleMovement() {
        charmanMovement();
        enemiesMovement();
    }

    function charmanMovement() {
        calc.setCurrentFloorIndex();
        handleGameEnds();
        moveCharman();
        actions.swimming = calc.isUserOnWater();
        display.handleCharmanImg();
    }

    function enemiesMovement() {
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
                display.fall();
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
                display.setCharmanLeft();
                currMap += 1;
                setup.loadLevelMap();
            } else if ((currMap != 0 ) && leftPos <= -3) {
                display.setCharmanRight();
                currMap -= 1;
                setup.loadLevelMap();
            }
        }
    }

}