export class Field {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    get X() {
        return 0;
    }
    get Y() {
        return 0;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
}
