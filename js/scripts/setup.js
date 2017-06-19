function Setup() {

    this.setCharman = setCharman;
    this.loadLevelMap = loadLevelMap;
    this.loadMapArr = loadMapArr;

    return this;

    function setCharman()
    {
        charman = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
    }

    function loadLevelMap()
    {
        var mapArr = loadMapArr()[currMap];

        if (currMap % 2 == 0) {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains01.png')";
        } else {
            bkgLayer.style.backgroundImage = "url('img/map/bkg-mointains02.png')";
        }
        
        display.clearBackground();

        mapArr.forEach(buildMap);

        function buildMap(mapItem)
        {
            bkgLayer.innerHTML += '<img class="floor '+mapItem[1]+'" src="img/map/floor/'+mapItem[0]+'" />';
        }
    }


    function loadMapArr()
    {
        return [
            [
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid']
            ],
            [
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid']
            ],
            [
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole']
            ],
            [
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['hole01.png', 'double', 'hole'],
                ['hole01.png', 'double', 'hole'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid'],
                ['floor01.png', 'double', 'solid']
            ]
        ];
    }
}