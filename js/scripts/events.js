function Events()
{
    this.loadEventHandlers = loadEventHandlers;
 
    return this;

    function loadEventHandlers() {

        document.addEventListener('keydown', function(e) {
            if (e.which == 39) {
                comands['right'] = true;
            } else if (e.which == 37) {
                comands['left'] = true;
            } else if (e.which == 32) {
                comands['fire'] = true;
            } else if (e.which == 17) {
                comands['jump'] = true;
            }

        });


        document.addEventListener('keyup', function(e) {
            setTimeout(function() {
                if (e.which == 39) {
                    comands['right'] = false;
                } else if (e.which == 37) {
                    comands['left'] = false;
                } else if (e.which == 32) {
                    comands['fire'] = false;
                } else if (e.which == 17) {
                    comands['jump'] = false;
                }
            }, 50);
        });

    }
}