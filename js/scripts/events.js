function Events()
{
    this.loadEventHandlers = loadEventHandlers;
    this.tapJump = tapJump;
    this.tapMoveRight = tapMoveRight;
    this.tapMoveLeft = tapMoveLeft;
    this.tapStop = tapStop;
    this.tapAttack = tapAttack;
    this.reset = reset;
 
    return this;

    function reset() {
        setup.resetGame();
        gameOn = true;
        document.getElementById('gameOver').style.display = 'none';
    }

    function tapAttack() {
        if (!actions.swimming) commands.fire = true;
    }

    function tapMoveRight() {
        setMovementRight();
    }

    function tapMoveLeft() {
        setMovementLeft()
    }

    function tapStop() {
        commands.left = false;
        commands.right = false;
    }

    function tapJump() {
        if (!actions.swimming && !actions.falling && !actions.jumping) {
            commands.jump = true;
            setTimeout(function () {
                commands.jump = false;
            }, 150);
        }
    }

    function loadEventHandlers() {

        document.addEventListener('keydown', function(e) {
            switch (e.which) {
                case 39:
                    setMovementRight();
                    break;
                case 37:
                    setMovementLeft();
                    break;
                case 32:
                    tapAttack();
                    break;
                case 17:
                    tapJump();
            }
        });

        document.addEventListener('keyup', function(e) {
            setTimeout(function() {
                switch (e.which) {
                    case 39:
                        commands.right = false;
                        break;
                    case 37:
                        commands.left = false;
                }
            }, 50);
        });

        document.ondblclick = function(e) { e.preventDefault(); };

    }

    function setMovementRight() {
        display.mirrorObj(charmanImg, 1);
        commands.left = false;
        commands.right = true;
    }

    function setMovementLeft() {
        display.mirrorObj(charmanImg, -1);
        commands.right = false;
        commands.left = true;
    }
}