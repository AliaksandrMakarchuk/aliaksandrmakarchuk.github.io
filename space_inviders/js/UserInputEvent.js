export class UserInputEvent {
    /**
     *
     */
    constructor(event, isKeyUp) {
        this._event = event;
        this._isKeyUp = isKeyUp;
    }
    get Event() {
        return this._event;
    }
    get IsKeyUp() {
        return this._isKeyUp;
    }
}
