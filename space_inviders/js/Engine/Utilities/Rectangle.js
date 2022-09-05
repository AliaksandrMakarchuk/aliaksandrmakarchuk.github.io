export class Rectangle {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._w = width;
        this._h = height;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get Width() {
        return this._w;
    }
    get Height() {
        return this._h;
    }
}
