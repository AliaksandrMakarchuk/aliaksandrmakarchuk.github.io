define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultGameStateHandler = void 0;
    var DefaultGameStateHandler = /** @class */ (function () {
        function DefaultGameStateHandler() {
        }
        DefaultGameStateHandler.prototype.HandleGameState = function () {
            // tslint:disable-next-line:no-console
            console.log('Default game state handler');
        };
        return DefaultGameStateHandler;
    }());
    exports.DefaultGameStateHandler = DefaultGameStateHandler;
});
