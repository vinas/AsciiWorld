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
        setTimeout(gameLoop, 50);
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
        var leftPos = document.getElementById('charman').style.left,
            topPos = calc.getCharmanCoord(document.getElementById('charman').style.top),
            floorIdx;
            
        if ((comands.right || comands.left) && !comands['firing']) {
            display.handleRunninImg();
            leftPos = calc.setNewCoord(leftPos);
            document.getElementById('charman').style.left = leftPos;
        }

        floorIdx = calc.getCurrentFloorIdx(leftPos);

        if (
            setup.loadMapArr()[currMap][floorIdx][2] == 'hole'
            && (
                topPos == ''
                || topPos >= 0
            )
            && (
                calc.isAllInHole(leftPos, floorIdx)
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
        if (!comands.right && !comands.left && !comands['firing']) display.charmanIdle();
    }

    function handleCrossMargin() {
        if (comands.right || comands.left) {
            if (calc.getCharmanCoord(document.getElementById('charman').style.left) >= 95) {
                currMap += 1;
                setup.loadLevelMap();
                display.setCharmanLeft();
            } else if ((currMap != 0 ) && calc.getCharmanCoord(document.getElementById('charman').style.left) <= -3) {
                currMap -= 1;
                setup.loadLevelMap();
                display.setCharmanRight();
            }
        }
    }

}