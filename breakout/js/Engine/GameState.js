define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameState = void 0;
    var GameState = /** @class */ (function () {
        function GameState(requestId, stateType, autoRequestNextFrame) {
            this.RequestId = requestId;
            this.StateType = stateType;
            this.AutoRequestNextFrame = autoRequestNextFrame;
        }
        return GameState;
    }());
    exports.GameState = GameState;
});
