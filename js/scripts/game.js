function Game() {

    this.init = init;
    this.endGame = endGame;

    return this;

    function init() {
        setup.setCharmanElements();
        setup.loadLevelMap(currMap);
        events.loadEventHandlers();

        gameLoop();
    }

    function gameLoop() {
        if (gameOn) {
            handleCrossMargin();
            handleFiring();
            handleJump();
            handleIdle();
            handleMovement();
        }
        setTimeout(gameLoop, 15);
    }

    function handleFiring() {
        if (commands.fire && !commands.firing) {
            commands.firing = true;
            display.shoot();
            return;
        }
        if (!commands.fire && commands.firing) commands.firing = false;
    }

    function handleMovement() {
        leftPos = calc.getCharmanCoord(charDiv.style.left);
        if ((commands.right || commands.left) && (commands.jumping || !commands.firing)) {
            if (calc.isUserOnWater()) {
                display.handleSwimmingImg();
            } else {
                display.handleRunninImg();
            }
            calc.setNewCoord();
            charDiv.style.left = leftPos+'%';
            calc.setCurrentFloorIndex();
        }
        calc.checkIsHole();
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
        if (commands.jump && !commands.jumping) {
            commands.jumping = true;
            display.jump();
        }
    }

    function handleIdle() {
        if (calc.isUserOnWater(leftPos)) display.handleSwimmingImg();
        else if (!commands.right && !commands.left && !commands.firing) display.charmanIdle();
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