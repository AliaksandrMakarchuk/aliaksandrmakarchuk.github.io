export var SpeedCoefficient;
(function (SpeedCoefficient) {
    SpeedCoefficient[SpeedCoefficient["FORWARD"] = 1] = "FORWARD";
    SpeedCoefficient[SpeedCoefficient["BACKWARD"] = -1] = "BACKWARD";
})(SpeedCoefficient || (SpeedCoefficient = {}));
export class Speed {
    constructor(x, y, xCoefficient, yCoefficient) {
        this._x = x;
        this._y = y;
        this._xCoefficient = xCoefficient;
        this._yCoefficient = yCoefficient;
    }
    get X() {
        // tslint:disable-next-line:no-console
        return this._x * this._xCoefficient;
    }
    get Y() {
        return this._y * this._yCoefficient;
    }
    ChangeXDirection() {
        this._xCoefficient = this._xCoefficient === SpeedCoefficient.FORWARD ? SpeedCoefficient.BACKWARD : SpeedCoefficient.FORWARD;
    }
    ChangeYDirection() {
        this._yCoefficient = this._yCoefficient === SpeedCoefficient.FORWARD ? SpeedCoefficient.BACKWARD : SpeedCoefficient.FORWARD;
    }
    Set(speed) {
        this._x = speed;
        this._y = speed;
    }
    toString() {
        return `X: ${this.X}; Y: ${this.Y}`;
    }
}
