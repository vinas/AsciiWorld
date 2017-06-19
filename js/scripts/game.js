function Game() {

    this.init = init;

    return this;

    function init() {
        setup.loadLevelMap();
        setup.setCharman();
        events.loadEventHandlers();

        gameLoop();
    }

    function gameLoop() {
        display.moveCharman();
        setTimeout(gameLoop, 50);
    }

}