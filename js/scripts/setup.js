function Setup() {

    this.setCharmanElements = setCharmanElements;
    this.loadLevelMap = loadLevelMap;
    this.loadMapArr = loadMapArr;

    return this;

    function setCharmanElements() {
        charDiv = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
        bkgLayer = document.getElementById('gameBrackground');
    }

    function loadLevelMap() {
        var mapArr = loadMapArr()[currMap],
            floorPos = 0
            cont = 0;
        mapIndexArray = [];

        setBackgroundImg();
        
        display.clearBackground();

        mapArr.forEach(buildMap);
    }

        function buildMap(mapItem) {
            var topPos = 0;
            switch (mapItem[2]) {
                case 'baseFloor':
                    topPos += BASEFLOOR;
                    break;
                case 'firstFloor':
                    topPos += FIRSTFLLOR;
                    break;
                case 'scndFloor':
                    topPos += SCNDFLOOR;
                    break;
            }
            bkgLayer.innerHTML += '<img class="floor '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+topPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
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

    function setBackgroundImg() {
        if (currMap % 2 == 0) {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains01.png')";
        } else {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains02.png')";
        }
    }    

    function loadMapArr() {
        return [
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid']
            ],
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['plataform01.png', 'single', 'firstFloor', 'solid'],
                ['plataform01.png', 'single', 'firstFloor', 'solid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['floor01.png', 'double', 'baseFloor', 'solid']
            ],
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole']
            ],
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['floor01.png', 'double', 'baseFloor', 'solid']
            ],
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole']
            ],
            [
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['water-01.gif', 'double', 'baseFloor', 'liquid'],
                ['floor01.png', 'double', 'baseFloor', 'solid'],
                ['hole01.png', 'double', 'baseFloor', 'hole'],
                ['floor01.png', 'double', 'baseFloor', 'solid']
            ]
        ];
    }
}