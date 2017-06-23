function Game() {

    this.init = init;

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
            handleMovement();
        }
        setTimeout(gameLoop, 15);
    }

    function handleFiring() {
        if (commands.fire && !commands.firing) {
            commands.firing = true;
            display.shoot(function() {
                commands.fire = false;
                commands.firing = false;
            });
            return;
        }
    }

    function handleMovement() {
        setBasicInfo();
        hadleGameEnds();
        commands.swimming = calc.isUserOnWater();
        if (commands.swimming) {
            display.handleSwimmingImg();
        } else if ((commands.right || commands.left) && (commands.jumping || !commands.firing)) {
            display.handleRunninImg();
        } else if (!commands.jumping && !commands.firing) {
            display.charmanIdle();
        }
    }

    function setBasicInfo() {
        leftPos = calc.getCharmanCoord(charDiv.style.left);
        topPos = calc.getCharmanCoord(charDiv.style.top);
        if (!commands.firing) calc.setNewCoord();
        charDiv.style.left = leftPos+'%';
        calc.setCurrentFloorIndex();
    }

    function hadleGameEnds() {
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
        if (commands.jump && !commands.jumping) {
            commands.jumping = true;
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