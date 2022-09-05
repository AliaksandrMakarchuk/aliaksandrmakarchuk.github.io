export class RenderModule {
    /**
     *
     */
    constructor(context, canvasArea, drawableComponents) {
        this._context = context;
        this._canvasArea = canvasArea;
        this._drawableComponents = drawableComponents;
    }
    ReDraw(gameObjects) {
        this.ClearCanvas();
        this._drawableComponents.forEach(component => {
            let correspondingObject = component.GetCorrespondingObject(gameObjects);
            component.Drawer.Draw(correspondingObject);
        });
    }
    ClearCanvas() {
        this._context.clearRect(this._canvasArea.X, this._canvasArea.Y, this._canvasArea.Width, this._canvasArea.Height);
    }
}
