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
        var leftPos = calc.getCharmanCoord(document.getElementById('charman').style.left);

            
        if ((comands.right || comands.left) && !comands['firing']) {
            if (calc.isUserOnWater(leftPos)) {
                display.handleSwimmingImg();
            } else {
                calc.setBaseTop();
                display.handleRunninImg();
            }
            leftPos = calc.setNewCoord(leftPos);
            document.getElementById('charman').style.left = leftPos+'%';
        }
        checkIsHole(leftPos, calc.getCurrentFloorIdx(leftPos));

    }

    function checkIsHole(leftPos, floorIdx) {
        var topPos = calc.getCharmanCoord(document.getElementById('charman').style.top);
        if (
            setup.loadMapArr()[currMap][floorIdx][3] == 'hole'
            && (
                topPos == ''
                || topPos >= 41
            )
            && (
                calc.isAllSection(leftPos, floorIdx)
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
        if (calc.isUserOnWater(calc.getCharmanCoord(document.getElementById('charman').style.left))) display.handleSwimmingImg();
        else if (!comands.right && !comands.left && !comands['firing']) display.charmanIdle();
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