export class HelpBot {
    constructor(x, y) {
        this._cellSize = 5;
        this._health = 1;
        this._x = x;
        this._y = y;
        this._width = 16;
        this._height = 7;
        this._scoreValue = 5;
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
    DecreaseHealth() {
        --this._health;
    }
}
