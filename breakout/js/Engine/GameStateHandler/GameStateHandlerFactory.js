define(["require", "exports", "../GameStateTypes", "./RunningGameStateHandler", "./PausedGameStateHandler", "./StoppedGameStateHandler", "./DefaultGameStateHandler"], function (require, exports, GameStateTypes_1, RunningGameStateHandler_1, PausedGameStateHandler_1, StoppedGameStateHandler_1, DefaultGameStateHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStateHandlerFactory = void 0;
    var GameStateHandlerFactory = /** @class */ (function () {
        function GameStateHandlerFactory(gameState) {
            this._gameState = gameState;
        }
        GameStateHandlerFactory.prototype.GetGameStateHandler = function (state, gameCycleFunc) {
            switch (state) {
                case GameStateTypes_1.GameStateTypes.RUNNING:
                    return new RunningGameStateHandler_1.RunningGameStateHandler(this._gameState, gameCycleFunc);
                case GameStateTypes_1.GameStateTypes.PAUSED:
                    return new PausedGameStateHandler_1.PausedGameStateHandler(this._gameState, gameCycleFunc);
                case GameStateTypes_1.GameStateTypes.STOPPED:
                    return new StoppedGameStateHandler_1.StoppedGameStateHandler(this._gameState, gameCycleFunc);
                default:
                    return new DefaultGameStateHandler_1.DefaultGameStateHandler();
            }
        };
        return GameStateHandlerFactory;
    }());
    exports.GameStateHandlerFactory = GameStateHandlerFactory;
});
