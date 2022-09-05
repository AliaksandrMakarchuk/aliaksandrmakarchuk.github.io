export class HelpBotsMoveComponent {
    constructor() {
        this._speed = 300;
    }
    CheckMovementState(_gameObjects, _secondsPassed) { }
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetHelpBots();
    }
    Move(gameObject, secondsPassed) {
        if (secondsPassed >= 1) {
            return;
        }
        gameObject.X += this._speed * secondsPassed;
    }
}
