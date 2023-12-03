export class Field {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this._canvas = canvas;
        this._context = context;
    }

    public Draw(): void {
        this._context.fillStyle = 'black';
        this._context.beginPath();
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fill();
    }
}