function Game() {

    this.init = init;

    return this;

    function init() {
        bkgLayer = document.getElementById('gameBrackground');
        setup.loadLevelMap(currMap);
        setup.setCharman();
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
        if (comands['fire'] && !comands['firing']) {
            comands['firing'] = true;
            display.shoot();
            return;
        }
        if (!comands['fire'] && comands['firing']) comands['firing'] = false;
    }

    function handleMovement() {
        leftPos = calc.getCharmanCoord(document.getElementById('charman').style.left);
        calc.setCurrentFloorIndex();
            
        if ((comands.right || comands.left) && !comands['firing']) {
            if (calc.isUserOnWater()) {
                display.handleSwimmingImg();
            } else {
                display.handleRunninImg();
            }
            calc.setNewCoord();
            
            document.getElementById('charman').style.left = leftPos+'%';
        }
        checkIsHole();
    }

    function checkIsHole() {
        var topPos = calc.getCharmanCoord(document.getElementById('charman').style.top);
        if (
            setup.loadMapArr()[currMap][floorIndex][3] == 'hole'
            && (
                topPos == ''
                || topPos >= CHARBASEFLOOR
            )
            && (
                calc.isAllSection(leftPos, floorIndex)
            )
        ) {
            endGame('hole');
        }
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
        if (comands['jump'] && !comands['jumping']) {
            comands['jumping'] = true;
            display.jump();
        }
    }

    function handleIdle() {
        if (calc.isUserOnWater(leftPos)) display.handleSwimmingImg();
        else if (!comands.right && !comands.left && !comands['firing']) display.charmanIdle();
    }

    function handleCrossMargin() {
        if (comands.right || comands.left) {
            if (leftPos >= 95) {
                display.setCharmanLeft();
                console.log('cross right');
                currMap += 1;
                setup.loadLevelMap();
                
            } else if ((currMap != 0 ) && leftPos <= -3) {
                display.setCharmanRight();
                console.log('cross left');
                currMap -= 1;
                setup.loadLevelMap();
            }
        }
    }

}