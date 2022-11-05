export class MenuPrinter {
    constructor(context, canvasArea, printModule) {
        this._context = context;
        this._printModule = printModule;
        this._canvasArea = canvasArea;
    }
    Print() {
        this._context.fillStyle = "#222";
        this._context.beginPath();
        this._context.fillRect(this._canvasArea.X, this._canvasArea.Y, this._canvasArea.Width, this._canvasArea.Height);
        this._context.fill();
        this._printModule.Print();
    }
}
