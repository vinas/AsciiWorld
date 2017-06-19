function Display() {

    this.jump = jump;
    this.handleRunninImg = handleRunninImg;
    this.mirrorObj = mirrorObj;

    return this;


    function jump() {
        var direction = 'up';
        var topPos = 0;

        jumping()

        function jumping() {
            if (topPos <= -60)
                direction = 'down';

            if (direction == 'up') {
                topPos -= 2;
            } else {
                topPos += 2;
            }

            if (topPos >= 0) {
                topPos = 0;
                comands['jumping'] = false;
            } else {
                setTimeout(jumping, 10);
            }

            charman.style.top = topPos;
        }
    }

    function mirrorObj(objeto, escala)
    {
        objeto.style.MozTransform = 'scaleX('+escala+')';
        objeto.style.webkitTransform = 'scaleX('+escala+')';
        objeto.style.OTransform = 'scaleX('+escala+')';
        objeto.style.transform = 'scaleX('+escala+')';
        objeto.style.msFilter = 'fliph';
        objeto.style.filter = 'fliph';
    }

    function handleRunninImg() {
        if (!comands['jumping'] && charmanImg.getAttribute('src') != 'img/charman/charman-run.gif')
            charmanImg.setAttribute('src', 'img/charman/charman-run.gif');
    }

}