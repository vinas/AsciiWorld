function Game() {

    this.init = init;

    return this;

    function init() {
        setup.loadLevelMap();
        setup.setCharman();
        events.loadEventHandlers();
    }

}