import { Colors } from "./Colors.js";
export class Field {
    constructor(canvas, context) {
        this._canvas = canvas;
        this._context = context;
    }
    Draw() {
        this._context.beginPath();
        this._context.fillStyle = Colors.Field;
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fill();
        this._context.closePath();
    }
}
