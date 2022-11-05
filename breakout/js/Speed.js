define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Speed = exports.SpeedCoefficient = void 0;
    var SpeedCoefficient;
    (function (SpeedCoefficient) {
        SpeedCoefficient[SpeedCoefficient["FORWARD"] = 1] = "FORWARD";
        SpeedCoefficient[SpeedCoefficient["BACKWARD"] = -1] = "BACKWARD";
    })(SpeedCoefficient = exports.SpeedCoefficient || (exports.SpeedCoefficient = {}));
    var Speed = /** @class */ (function () {
        function Speed(x, y, xCoefficient, yCoefficient) {
            this._x = x;
            this._y = y;
            this._xCoefficient = xCoefficient;
            this._yCoefficient = yCoefficient;
        }
        Object.defineProperty(Speed.prototype, "X", {
            get: function () {
                // tslint:disable-next-line:no-console
                return this._x * this._xCoefficient;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "Y", {
            get: function () {
                return this._y * this._yCoefficient;
            },
            enumerable: false,
            configurable: true
        });
        Speed.prototype.ChangeXDirection = function () {
            this._xCoefficient = this._xCoefficient === SpeedCoefficient.FORWARD ? SpeedCoefficient.BACKWARD : SpeedCoefficient.FORWARD;
        };
        Speed.prototype.ChangeYDirection = function () {
            this._yCoefficient = this._yCoefficient === SpeedCoefficient.FORWARD ? SpeedCoefficient.BACKWARD : SpeedCoefficient.FORWARD;
        };
        Speed.prototype.Set = function (speed) {
            this._x = speed;
            this._y = speed;
        };
        Speed.prototype.toString = function () {
            return "X: ".concat(this.X, "; Y: ").concat(this.Y);
        };
        return Speed;
    }());
    exports.Speed = Speed;
});
