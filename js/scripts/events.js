function Events()
{
    this.loadEventHandlers = loadEventHandlers;
 
    return this;

    function loadEventHandlers() {

        document.addEventListener('keydown', function(e) {
            display.moveCharman(e.which);
        });

        document.addEventListener('keyup', function(e) {
            setTimeout(function() {
                charmanImg.setAttribute('src', 'img/charman/charman-01.png');
            }, 50);
        });

    }
}