function Setup() {

    this.setCharmanElements = setCharmanElements;
    this.loadLevelMap = loadLevelMap;
    this.loadMapArr = loadMapArr;
    this.resetGame = resetGame;

    return this;

    function resetGame() {
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
        levelTriggers = loadLevelTriggers();
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
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
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
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole']
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
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
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
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
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
                        'action 25 1',
                        'action 25 2'
                    ]
                },
                50: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        'action 50 1',
                        'action 25 2'
                    ]
                }
            },
            {
                25: {
                    onlyOnce: false,
                    triggered: false,
                    actions: [
                        'action 25 1',
                        'action 25 2'
                    ]
                },
                50: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        'action 50 1',
                        'action 25 2'
                    ]
                }
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
        ];
    }
}