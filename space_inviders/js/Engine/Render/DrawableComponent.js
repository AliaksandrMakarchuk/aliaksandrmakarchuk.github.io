export class DrawableComponent {
    /**
     *
     */
    constructor(drawer, componentsGetter) {
        this._drawer = drawer;
        this._componentsGetter = componentsGetter;
    }
    get Drawer() {
        return this._drawer;
    }
    GetCorrespondingObject(gameObjects) {
        return this._componentsGetter(gameObjects);
    }
}
