var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./GameStateHandlerAbstract"], function (require, exports, GameStateHandlerAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StoppedGameStateHandler = void 0;
    var StoppedGameStateHandler = /** @class */ (function (_super) {
        __extends(StoppedGameStateHandler, _super);
        function StoppedGameStateHandler(gameState, gameCycleFunc) {
            return _super.call(this, gameState, gameCycleFunc) || this;
        }
        StoppedGameStateHandler.prototype.HandleGameState = function () {
            if (this.GameState.RequestId === undefined) {
                return;
            }
            this.GameState.RequestId = requestAnimationFrame(this.GameCycleFunc.bind(this, this.GameState.AutoRequestNextFrame));
            throw new Error('Not implemented');
        };
        return StoppedGameStateHandler;
    }(GameStateHandlerAbstract_1.GameStateHandlerAbstract));
    exports.StoppedGameStateHandler = StoppedGameStateHandler;
});