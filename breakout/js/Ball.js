import { Colors } from "./Colors.js";
import { Position } from "./Engine/Position.js";
export class Ball {
    constructor(radius) {
        this._color = Colors.Ball;
        this.Coords = new Position(0, 0);
        this._radius = radius;
        this.IsAlive = true;
    }
    get Radius() {
        return this._radius;
    }
    get Color() {
        return this._color;
    }
}
