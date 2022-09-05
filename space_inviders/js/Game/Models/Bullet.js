import { Directions } from "../../Directions.js";
export class Bullet {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._radius = 4;
        this._speedPixelsPerSecond = 800;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get Radius() {
        return this._radius;
    }
    get Width() {
        return this._radius;
    }
    get Height() {
        return this._radius;
    }
    Move(secondsPassed, direction) {
        let step = Math.round(this._speedPixelsPerSecond * secondsPassed);
        switch (direction) {
            case Directions.UP:
                this._y -= step;
                break;
            case Directions.DOWN:
                this._y += step;
        }
    }
}
