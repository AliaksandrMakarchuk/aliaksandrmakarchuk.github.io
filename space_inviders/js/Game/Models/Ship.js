import { Bullet } from "./Bullet.js";
export class Ship {
    constructor(x, y) {
        this._padding = 5;
        this._cellSize = 3;
        this._health = 3;
        this._width = 15;
        this._height = 8;
        this._x = x - this.Width / 2;
        this._y = y - this._padding;
        this._speedPixelsPerSecond = 300;
    }
    get IsAlive() {
        return this._health > 0;
    }
    get X() {
        return this._x;
    }
    set X(x) {
        this._x = x;
    }
    get Y() {
        return this._y;
    }
    get Width() {
        return this._width * this._cellSize;
    }
    get Height() {
        return this._height * this._cellSize;
    }
    get Health() {
        return this._health;
    }
    get CellSize() {
        return this._cellSize;
    }
    get Speed() {
        return this._speedPixelsPerSecond;
    }
    DecreaseHealth() {
        --this._health;
    }
    IncreaseHealth() {
        ++this._health;
    }
    Fire() {
        return new Bullet(this._x + this._width * this._cellSize / 2, this._y);
    }
}
