document.addEventListener("DOMContentLoaded", function(event) {

    var charman = document.getElementById('charman');
    var basicMovRate = 1;

    loadLevelMap();
    
    document.addEventListener('keydown', function(e) {
        moveCharman(e.which);

    });

    document.addEventListener('keyup', function(e) {
        setTimeout(function() {
            document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-01.png');
        }, 50);
    });

    function moveCharman(direction) {
        setTimeout(function() {
            document.getElementById('charman').style.left = setNewCoord(document.getElementById('charman').style.left, direction);
        }, 50);
    }

    function mirrorObj(objeto, escala)
    {
        objeto.style.MozTransform = "scaleX("+escala+")";
        objeto.style.webkitTransform = "scaleX("+escala+")";
        objeto.style.OTransform = "scaleX("+escala+")";
        objeto.style.transform = "scaleX("+escala+")";
        objeto.style.msFilter = "fliph";
        objeto.style.filter = "fliph";
    }

    function setNewCoord(left, direction) {
        var regex = /[+-]?\d+(\.\d+)?/g;
        if (left == '' && direction == 39) return basicMovRate+'%';
        left = parseFloat(left.match(regex).map(function(v) { return parseFloat(v); }));
        switch (direction) {
            case 39:
                if (document.getElementById('charmanImg').getAttribute('src') != 'img/charman/charman-run.gif')
                    document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-run.gif')
                mirrorObj(document.getElementById('charmanImg'), 1);
                left += basicMovRate;
                break;
            case 37:
                if (document.getElementById('charmanImg').getAttribute('src') != 'img/charman/charman-run.gif')
                    document.getElementById('charmanImg').setAttribute('src', 'img/charman/charman-run.gif')
                mirrorObj(document.getElementById('charmanImg'), -1);
                left -= basicMovRate;
                break;

        }
        return (left >= 0) ? left+'%' : '0px';
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


});
