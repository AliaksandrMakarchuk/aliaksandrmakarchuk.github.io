export class SvgPathStringBuilder {
    constructor(cellSize, x, y) {
        this._cellSize = cellSize;
        this._x = x;
        this._y = y;
        this._pathString = `M${x}, ${y} `;
    }
    GoLeft(cells = 0) {
        this._x -= cells * this._cellSize;
        this._pathString += `L${this._x} ${this._y} `;
        return this;
    }
    GoRight(cells = 0) {
        this._x += cells * this._cellSize;
        this._pathString += `L${this._x} ${this._y} `;
        return this;
    }
    GoUp(cells = 0) {
        this._y -= cells * this._cellSize;
        this._pathString += `L${this._x} ${this._y} `;
        return this;
    }
    GoDown(cells = 0) {
        this._y += cells * this._cellSize;
        this._pathString += `L${this._x} ${this._y} `;
        return this;
    }
    Build() {
        this._pathString += 'Z';
        return this._pathString;
    }
}
