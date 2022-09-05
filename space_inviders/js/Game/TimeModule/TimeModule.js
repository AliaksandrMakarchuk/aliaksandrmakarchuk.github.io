export class TimeModule {
    constructor() {
        this._secondsPassed = 0;
    }
    get SecondsPassed() {
        return this._secondsPassed;
    }
    UpdateLastFrameTimeElapsed(secondsPassed) {
        this._secondsPassed = secondsPassed;
    }
}
