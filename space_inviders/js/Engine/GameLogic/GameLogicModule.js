export class GameLogicModule {
    /**
     *
     */
    constructor(components) {
        this._components = components;
    }
    Apply(gameObjects) {
        this._components.forEach(component => {
            component.Action(gameObjects);
        });
    }
}
