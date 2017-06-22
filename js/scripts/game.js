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
        if (comands.fire && !comands.firing) {
            comands.firing = true;
            display.shoot();
            return;
        }
        if (!comands.fire && comands.firing) comands.firing = false;
    }

    function handleMovement() {
        leftPos = calc.getCharmanCoord(charDiv.style.left);
        calc.setCurrentFloorIndex();
            
        if ((comands.right || comands.left) && (comands.jumping || !comands.firing)) {
            if (calc.isUserOnWater()) {
                display.handleSwimmingImg();
            } else {
                display.handleRunninImg();
            }
            calc.setNewCoord();
            
            charDiv.style.left = leftPos+'%';
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
        if (comands.jump && !comands.jumping) {
            comands.jumping = true;
            display.jump();
        }
    }

    function handleIdle() {
        if (calc.isUserOnWater(leftPos)) display.handleSwimmingImg();
        else if (!comands.right && !comands.left && !comands.firing) display.charmanIdle();
    }

    function handleCrossMargin() {
        if (comands.right || comands.left) {
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