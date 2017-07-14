function Events()
{
    this.tapJump = tapJump;
    this.tapMoveRight = tapMoveRight;
    this.tapMoveLeft = tapMoveLeft;
    this.tapStop = tapStop;
    this.tapAttack = tapAttack;
    this.reset = reset;
    this.crossRight = crossRight;
    this.crossLeft = crossLeft;
    this.triggers = triggers;
 
    return this;

    function triggers() {
        var trigger = levelTriggers[currMap][Math.floor(leftPos)+FLOORHORTOLERANCE];
        if (commands.right && trigger) {
            if (!trigger.onlyOnce || !trigger.triggered) {
                trigger.actions.forEach(function(action, idx) {
                    if (trigger.params[idx]) {
                        action(trigger.params[idx]);
                    } else {
                        action();
                    }
                });
                trigger.triggered = true;
            }
        }
    }

    function crossRight() {
        actions.cancelShot = true;
        setup.hideHidables();
        display.setCharmanLeft();
        currMap += 1;
        setup.loadLevelMap();
        setTimeout(function() { actions.cancelShot = false; }, 20);
    }

    function crossLeft() {
        actions.cancelShot = true;
        setup.hideHidables();
        display.setCharmanRight();
        currMap -= 1;
        setup.loadLevelMap();
        setTimeout(function() { actions.cancelShot = false; }, 20);
    }

    function reset() {
        setup.resetGame();
        gameOn = true;
        document.getElementById('gameOver').style.display = 'none';
    }

    function tapAttack() {
        if (!actions.soundsLoaded) {
            setup.prepareSoundsForMobile();
        }

        if (!actions.swimming && !actions.shooting) commands.fire = true;
    }

    function tapMoveRight() {
        actions.lastDirection = 'right';
        display.mirrorObj(charmanImg, 1);
        commands.left = false;
        commands.right = true;
    }

    function tapMoveLeft() {
        actions.lastDirection = 'left';
        display.mirrorObj(charmanImg, -1);
        commands.right = false;
        commands.left = true;
    }

    function tapStop() {
        commands.left = false;
        commands.right = false;
    }

    function tapJump() {
        if (!actions.swimming && !actions.falling && !actions.jumping) {
            commands.jump = true;
            charJumpSound.play();
            setTimeout(function () {
                commands.jump = false;
            }, 150);
        }
    }

}