define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStateTypes = void 0;
    var GameStateTypes;
    (function (GameStateTypes) {
        GameStateTypes[GameStateTypes["RUNNING"] = 0] = "RUNNING";
        GameStateTypes[GameStateTypes["PAUSED"] = 1] = "PAUSED";
        GameStateTypes[GameStateTypes["STOPPED"] = 2] = "STOPPED";
    })(GameStateTypes = exports.GameStateTypes || (exports.GameStateTypes = {}));
});
