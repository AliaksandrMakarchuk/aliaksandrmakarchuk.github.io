export class DebugComponent {
    /**
     *
     */
    constructor() {
        this._secondsLeft = Number.POSITIVE_INFINITY;
        this._aggressivityLevel = Number.NEGATIVE_INFINITY;
    }
    UpdateSecondsLeft(secondsLeft) {
        this._secondsLeft = secondsLeft;
    }
    UpdateAggresifityLevel(level) {
        this._aggressivityLevel = level;
    }
    GetInfo() {
        return `Seconds Left to Mistery: ${Math.round(this._secondsLeft * 10) / 10} | Aggressivity Level: ${this._aggressivityLevel}`;
    }
}
