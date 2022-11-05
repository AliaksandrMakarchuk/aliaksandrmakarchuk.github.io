define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Position = void 0;
    var Position = /** @class */ (function () {
        function Position(x, y) {
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Position.prototype, "X", {
            get: function () {
                return this._x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Position.prototype, "Y", {
            get: function () {
                return this._y;
            },
            enumerable: false,
            configurable: true
        });
        return Position;
    }());
    exports.Position = Position;
});
