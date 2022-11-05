define(["require", "exports", "./Colors", "./Engine/Position"], function (require, exports, Colors_1, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ball = void 0;
    var Ball = /** @class */ (function () {
        function Ball(radius) {
            this._color = Colors_1.Colors.Ball;
            this.Coords = new Position_1.Position(0, 0);
            this._radius = radius;
            this.IsAlive = true;
        }
        Object.defineProperty(Ball.prototype, "Radius", {
            get: function () {
                return this._radius;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "Color", {
            get: function () {
                return this._color;
            },
            enumerable: false,
            configurable: true
        });
        return Ball;
    }());
    exports.Ball = Ball;
});
