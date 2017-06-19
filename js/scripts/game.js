function Game() {

    this.init = init;

    return this;

    function init() {
        setup.loadLevelMap();
        setup.setCharman();
        events.loadEventHandlers();

        gameLoop();
    }

    function gameLoop() {
        handleFiring();
        handleMovement();
        handleJump();
        handleIdle();
        setTimeout(gameLoop, 50);
    }

    function handleFiring() {
        if (comands['fire'] && !comands['firing']) {
            comands['firing'] = true;
            charmanImg.setAttribute('src', 'img/charman/charman-shoot.png');
            setTimeout(function () {
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
            }, 200);
            return;
        }
        if (!comands['fire'] && comands['firing']) comands['firing'] = false;
    }

    function handleMovement() {
        if ((comands['right'] || comands['left']) && !comands['firing']) {
            display.handleRunninImg();
            charman.style.left = calc.setNewCoord(charman.style.left);
            return;
        }
    }

    function handleJump() {
        if (comands['jump'] && !comands['jumping']) {
            comands['jumping'] = true;
            charmanImg.setAttribute('src', 'img/charman/charman-jump.gif');
            setTimeout(function () {
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
            }, 800);
            display.jump();
        }
    }

    function handleIdle() {
        if (!comands['right'] && !comands['left'] && !comands['firing']) charmanImg.setAttribute('src', 'img/charman/charman-01.png');
    }

}