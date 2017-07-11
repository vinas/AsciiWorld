function Setup() {
    this.loadLevelMap = loadLevelMap;
    this.resetGame = resetGame;
    this.hideHidables = hideHidables;
    this.enableKeyboard = enableKeyboard;
    this.preventDblClick = preventDblClick;

    return this;

    function preventDblClick() {
        document.ondblclick = function(e) { e.preventDefault(); };
    }

    function enableKeyboard() {
        document.addEventListener('keydown', function(e) {
            switch (e.which) {
                case 39:
                    events.tapMoveRight();
                    break;
                case 37:
                    events.tapMoveLeft();
                    break;
                case 32:
                    events.tapAttack();
                    break;
                case 17:
                    events.tapJump();
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
    }

    function resetGame() {
        hideHidables();
        resetGameVariables();
        cancelAllActions();
        cancelAllcommands();
        resetCharman();
        level.loadLevelTriggers();
        loadLevelMap();
        loadEnemyList();
    }

    function resetGameVariables() {
        topPos = CHARBASEFLOOR;
        leftPos = 0;
        currMap = 0;
        gameTime = 0;
        timer = 0;
        time = +new Date();
    }

    function cancelAllcommands() {
        commands.right = false;
        commands.left = false;
        commands.fire = false;
        commands.jump = false;
    }

    function cancelAllActions() {
        actions.jumping = false;
        actions.firing = false;
        actions.swimming = false;
        actions.falling = false;
        actions.cancelShot = false;
        actions.shooting = false;
        actions.lastDirection = 'right';
        actions.abduction = false;
    }

    function resetCharman() {
        charDiv.style.opacity = 1;
        charDiv.style.top = topPos+'%';
        charDiv.style.left = leftPos+'%';
        charDiv.style.display = 'block';
    }

    function loadEnemyList() {
        enemies = [
                document.getElementById('ufo'),
                document.getElementById('pig')
            ];
    }

    function loadLevelMap() {
        var floorPos = 0,
            floorTopPos;

        document.getElementById('stage').innerHTML = (currMap + 1) + ' / ' + level.loadMapArr().length;
        document.getElementById('level').innerHTML = level.current;

        mapIndexArray = [];
        mapArr = level.loadMapArr()[currMap];

        display.setBackgroundImg();
        display.clearBackground();

        mapArr.forEach(buildMap);

        function buildMap(mapItem) {
            floorTopPos = FLOORS[mapItem[2]];
            bkgLayer.innerHTML += '<img class="floor '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+floorTopPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
            switch (mapItem[1]) {
                case 'single':
                    floorPos += SINGLEBLOCK;
                    break;
                case 'double':
                    floorPos += DOUBLEBLOCK;
                    break;
            }
            mapIndexArray.push(floorPos);
        }
    }

    function hideHidables() {
        setClassProp('hidable', 'display', 'none');
    }

    function setClassProp(className, prop, value)
    {
        var els = document.getElementsByClassName(className),
            i;
        for (i = 0; i < els.length; i++) {
            els[i].style[prop] = value;
        }
    }

}