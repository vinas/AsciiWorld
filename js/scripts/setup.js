function Setup() {
    this.loadLevelMap = loadLevelMap;
    this.loadMapArr = loadMapArr;
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
        loadLevelTriggers();
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

        document.getElementById('stage').innerHTML = (currMap + 1) + ' / ' + loadMapArr().length;

        mapIndexArray = [];
        mapArr = loadMapArr()[currMap];

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


    function loadMapArr() {
        return [
            // #1
            /*[
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #2
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole']
            ],
            // #3
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor02.png', 'single', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #4
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #5
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #6
            [
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
            ],
            // #7
            [
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor02.png', 'single', 0, 'solid']
            ],
            // #8
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],*/
            // #9
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #10
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #11
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #12
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['floor02.png', 'single', 0, 'solid']
            ],
            // #13
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'single', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #14
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #15
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole']
            ]
        ];
    }

    function loadLevelTriggers() {
        levelTriggers = [
                // #1
                /*{
                    25: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 70,
                                top: 20
                            }
                        ]
                    },
                    70: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #2
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.standingPig
                        ],
                        params: [
                            {
                                left: 75,
                                top: 56
                            }
                        ]
                    },
                    50: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 25,
                                top: 10
                            }
                        ]
                    },
                    90: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #3
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.jumpingPig
                        ],
                        params: [
                            {
                                left: 27,
                                top: 56
                            }
                        ]
                    },
                    55: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 34,
                                top: 34
                            }
                        ]
                    },
                    85: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #4
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.jumpingPig
                        ],
                        params: [
                            {
                                left: 15,
                                top: 56
                            }
                        ]
                    },
                    50: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 80,
                                top: 46
                            }
                        ]
                    }
                },
                // #5
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.standingPig
                        ],
                        params: [
                            {
                                left: 52,
                                top: 44
                            }
                        ]
                    },
                    50: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 25,
                                top: 10
                            }
                        ]
                    },
                    90: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #6
                {
                    2: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 30
                            }
                        ]
                    },
                    55: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 35
                            }
                        ]
                    }
                },
                // #7
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.jumpingPig
                        ],
                        params: [
                            {
                                left: 37,
                                top: 44
                            }
                        ]
                    },
                    3: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 30
                            }
                        ]
                    },
                    55: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 35
                            }
                        ]
                    }
                },
                // #8
                {
                    10: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 46
                            }
                        ]
                    }
                },*/
                // #9
                {
                    15: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 46
                            }
                        ]
                    },
                    50: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 80,
                                top: 46
                            }
                        ]
                    },
                },
                // #10
                {
                    2: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.standingPig
                        ],
                        params: [
                            {
                                left: 75,
                                top: 50
                            }
                        ]
                    },
                    25: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.abductPig
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #11
                {
                    10: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 72,
                                top: 35
                            }
                        ]
                    },
                    40: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 80,
                                top: 46
                            }
                        ]
                    }
                },
                // #12
                {},
                // #13
                {
                    63: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 80,
                                top: 23
                            }
                        ]
                    },
                    80: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    }
                },
                // #14
                {
                    2: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.jumpingPig
                        ],
                        params: [
                            {
                                left: 43,
                                top: 44
                            }
                        ]
                    },
                    15: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.ufoIn
                        ],
                        params: [
                            {
                                left: 75,
                                top: 20
                            }
                        ]
                    },
                    30: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            display.ufoOut
                        ],
                        params: [
                            {}
                        ]
                    },
                    50: {
                        onlyOnce: true,
                        triggered: false,
                        actions: [
                            display.ufoAttack01
                        ],
                        params: [
                            {
                                left: 75,
                                top: 20
                            }
                        ]
                    }
                },
                // #15
                {
                    65: {
                        onlyOnce: false,
                        triggered: false,
                        actions: [
                            game.endGame
                        ],
                        params: [
                            'abducted'
                        ]
                    }
                }
            ];
    }
}