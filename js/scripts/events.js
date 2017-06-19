function Events()
{
    this.loadEventHandlers = loadEventHandlers;
    this.tapJump = tapJump;
    this.tapMoveRight = tapMoveRight;
    this.tapMoveLeft = tapMoveLeft;
    this.tapStop = tapStop;
 
    return this;

    function tapMoveRight() {
        comands.left = false;
        comands.right = true;
    }

    function tapMoveLeft() {
        comands.right = false;
        comands.left = true;
    }

    function tapStop() {
        comands.left = false;
        comands.right = false;
    }

    function tapJump() {
        console.log('aqui');
        comands.jump = true;
        setTimeout(function () {
            comands.jump = false;
        }, 150);
    }

    function loadEventHandlers() {

        document.addEventListener('keydown', function(e) {
            if (e.which == 39) {
                display.mirrorObj(document.getElementById('charmanImg'), 1);
                comands.left = false;
                comands.right = true;
            } else if (e.which == 37) {
                display.mirrorObj(document.getElementById('charmanImg'), -1);
                comands.right = false;
                comands.left = true;
            } else if (e.which == 32) {
                comands['fire'] = true;
            } else if (e.which == 17) {
                comands['jump'] = true;
            }

        });


        document.addEventListener('keyup', function(e) {
            setTimeout(function() {
                if (e.which == 39) {
                    comands.right = false;
                } else if (e.which == 37) {
                    comands.left = false;
                } else if (e.which == 32) {
                    comands['fire'] = false;
                } else if (e.which == 17) {
                    comands['jump'] = false;
                }
            }, 50);
        });

    }
}