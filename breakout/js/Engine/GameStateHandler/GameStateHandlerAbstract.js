define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStateHandlerAbstract = void 0;
    var GameStateHandlerAbstract = /** @class */ (function () {
        function GameStateHandlerAbstract(gameState, gameCycleFunc) {
            this.GameState = gameState;
            this.GameCycleFunc = gameCycleFunc;
        }
        return GameStateHandlerAbstract;
    }());
    exports.GameStateHandlerAbstract = GameStateHandlerAbstract;
});
