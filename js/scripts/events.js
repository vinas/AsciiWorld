function Events()
{
    this.loadEventHandlers = loadEventHandlers;
    this.tapJump = tapJump;
    this.tapMoveRight = tapMoveRight;
    this.tapMoveLeft = tapMoveLeft;
    this.tapStop = tapStop;
    this.tapAttack = tapAttack;
 
    return this;

    function tapAttack() {
        if (!comands.fire) {
            comands.fire = true;
            setTimeout(function () {
                comands.fire = false;
            }, 400);
        }
    }

    function tapMoveRight() {
        setMovementRight();
    }

    function tapMoveLeft() {
        setMovementLeft()
    }

    function tapStop() {
        comands.left = false;
        comands.right = false;
    }

    function tapJump() {
        comands.jump = true;
        setTimeout(function () {
            comands.jump = false;
        }, 150);
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
                        comands.right = false;
                        break;
                    case 37:
                        comands.left = false;
                }
            }, 50);
        });

        document.ondblclick = function(e) { e.preventDefault(); };

    }

    function setMovementRight() {
        display.mirrorObj(charmanImg, 1);
        comands.left = false;
        comands.right = true;
    }

    function setMovementLeft() {
        display.mirrorObj(charmanImg, -1);
        comands.right = false;
        comands.left = true;
    }
}