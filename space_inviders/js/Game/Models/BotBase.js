import { Bullet } from "./Bullet.js";
export class BotBase {
    constructor(x, y, width, height, score) {
        this._cellSize = 3;
        this._health = 1;
        this._x = x;
        this._y = y;
        this._startPositionX = x;
        this._startPositionY = y;
        this._width = width;
        this._height = height;
        this._scoreValue = score;
    }
    get IsAlive() {
        return this._health > 0;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    set X(value) {
        this._x = value;
    }
    set Y(value) {
        this._y = value;
    }
    get Width() {
        return this._width * this._cellSize;
    }
    get Height() {
        return this._height * this._cellSize;
    }
    get CellSize() {
        return this._cellSize;
    }
    get Health() {
        return this._health;
    }
    get ScoreValue() {
        return this._scoreValue;
    }
    get StartX() {
        return this._startPositionX;
    }
    get StartY() {
        return this._startPositionY;
    }
    Fire() {
        return new Bullet(this.X + this.Width / this.CellSize / 2, this.Y);
    }
    DecreaseHealth() {
        --this._health;
    }
}
