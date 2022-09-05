export class MovementModule {
    constructor(components) {
        this._components = components;
    }
    Move(gameObjects, secondsPassed) {
        this._components.forEach(component => {
            let correspondingObject = component.GetCorrespondingObject(gameObjects);
            component.CheckMovementState(correspondingObject, secondsPassed);
            component.Move(correspondingObject, secondsPassed);
        });
    }
}
