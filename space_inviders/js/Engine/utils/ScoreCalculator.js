export class ScoreCalculator {
    /**
     *
     */
    constructor(aliveBotsNumber) {
        this._scoreByBot = 5;
        this._score = 0;
        this._lastBotsNumber = aliveBotsNumber;
    }
    get Score() {
        return this._score;
    }
    UpdateScore(aliveBotsNumber) {
        if (this._lastBotsNumber === aliveBotsNumber) {
            return;
        }
        this._score += (this._lastBotsNumber - aliveBotsNumber) * this._scoreByBot;
        this._lastBotsNumber = aliveBotsNumber;
    }
}
