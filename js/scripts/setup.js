function Setup() {

    this.setCharmanElements = setCharmanElements;
    this.loadLevelMap = loadLevelMap;
    this.loadMapArr = loadMapArr;
    this.resetGame = resetGame;
    this.hideHidables = hideHidables;

    return this;

    function resetGame() {
        currMap = 0;
        hideHidables();
        setCharmanElements();
        loadLevelMap();
    }

    function setCharmanElements() {
        charDiv = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
        bkgLayer = document.getElementById('gameBrackground');
        topPos = CHARBASEFLOOR;
        leftPos = 0;
        charDiv.style.top = topPos+'%';
        charDiv.style.left = leftPos+'%';
        actions.jumping = false;
        actions.firing = false;
        actions.swimming = false;
        actions.falling = false;
        actions.cancelShot = false;
        actions.shooting = false;
        actions.lastDirection = 'right';
        levelTriggers = loadLevelTriggers();
        enemies = [
            document.getElementById('ufo'),
            document.getElementById('pig')
        ];
    }

    function loadLevelMap() {
        var floorPos = 0,
            floorTopPos;

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
            [
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
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
            ],
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
        return [
            {
                25: {
                    onlyOnce: false,
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
            {
                70: {
                    onlyOnce: false,
                    triggered: false,
                    actions: [
                        display.ufoIn
                    ],
                    params: [
                        {
                            left: 10,
                            top: 5
                        }
                    ]
                },
                90: {
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
            {
                2: {
                    onlyOnce: false,
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
                70: {
                    onlyOnce: false,
                    triggered: false,
                    actions: [
                        display.ufoIn
                    ],
                    params: [
                        {
                            left: 10,
                            top: 5
                        }
                    ]
                },
                90: {
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
            {
                2: {
                    onlyOnce: false,
                    triggered: false,
                    actions: [
                        display.ufoAttack01
                    ],
                    params: [
                        {
                            left: 35,
                            top: 35
                        }
                    ]
                },
                50: {
                    onlyOnce: false,
                    triggered: false,
                    actions: [
                        display.ufoAttack01
                    ],
                    params: [
                        {
                            left: 75,
                            top: 46
                        }
                    ]
                }
            },
            {},
            {
                2: {
                    onlyOnce: false,
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
                    onlyOnce: false,
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
            {
                2: {
                    onlyOnce: false,
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
                    onlyOnce: false,
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
            {
                10: {
                    onlyOnce: false,
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
            },
            {
                15: {
                    onlyOnce: false,
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
                60: {
                    onlyOnce: false,
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
            },
            {},
            {
                10: {
                    onlyOnce: false,
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
                    onlyOnce: false,
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
            {},
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
                            top: 25
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
            {
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
                        {
                            left: 75,
                            top: 20
                        }
                    ]
                },
                50: {
                    onlyOnce: false,
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
            {}
        ];
    }
}