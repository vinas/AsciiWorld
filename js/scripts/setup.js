function Setup() {

    this.setCharman = setCharman;
    this.loadLevelMap = loadLevelMap;

    return this;

    function setCharman()
    {
        charman = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
    }

    function loadLevelMap()
    {
        var mapArr = loadMapArr(),
            background = document.getElementById('gameBrackground');

        mapArr.forEach(buildMap);

        function buildMap(mapItem)
        {
            background.innerHTML += '<img class="floor '+mapItem[1]+'" src="img/map/floor/'+mapItem[0]+'" />';
        }
    }


    function loadMapArr()
    {
        return [
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double'],
            ['floor01.png', 'double']
        ];
    }
}