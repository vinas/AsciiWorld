function Level() {

    this.current = 2;
    this.bkgdImage1 = 'bkg-ufo01.png';
    this.bkgdImage2 = 'bkg-ufo02.png';
    this.loadMapArr = loadMapArr;
    this.loadLevelTriggers = loadLevelTriggers;

    return this;

    function loadMapArr() {
        return [
            // #1
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
            // #2
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
            // #3
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
            // #4
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #5
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #6
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
            // #7
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #8
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['water-01.gif', 'double', 0, 'hole'],
                ['water-01.gif', 'double', 0, 'hole'],
                ['plataform01.png', 'single', 1, 'solid'],
                ['water-01.gif', 'double', 0, 'hole'],
                ['water-01.gif', 'double', 0, 'hole'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ]
        ];
    }

    function loadLevelTriggers() {
        levelTriggers = [
            // #1
            {
                6: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 0,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            // #2
            {
                6: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienAttack01
                    ],
                    params: [
                        {
                            left: 70,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                },
                70: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 80,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            // #3
            {
                6: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 70,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                },
                50: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 100,
                            top: 51,
                            right: true
                        }
                    ]
                }
            },
            // #4
            {
                65: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 80,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            // #5
            {
                20: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 88,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                },
                45: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienAttack01
                    ],
                    params: [
                        {
                            left: 88,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            // #6
            {
                20: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 50,
                            top: 51,
                            right: true,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            //# 7 
            {
                20: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienIn
                    ],
                    params: [
                        {
                            left: 27,
                            top: 51,
                            right: true,
                            callback: display.alienOutLeft
                        }
                    ]
                },
                67: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        display.alienAttack01
                    ],
                    params: [
                        {
                            left: 85,
                            top: 51,
                            callback: display.alienOut
                        }
                    ]
                }
            },
            // #8
            {

            }
        ];
    }
}
