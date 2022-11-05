export var GameStateTypes;
(function (GameStateTypes) {
    GameStateTypes[GameStateTypes["RUNNING"] = 0] = "RUNNING";
    GameStateTypes[GameStateTypes["PAUSED"] = 1] = "PAUSED";
    GameStateTypes[GameStateTypes["STOPPED"] = 2] = "STOPPED";
})(GameStateTypes || (GameStateTypes = {}));
