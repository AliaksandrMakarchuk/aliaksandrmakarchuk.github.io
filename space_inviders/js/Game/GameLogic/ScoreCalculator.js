export class ScoreCalculator {
    constructor() {
        this._score = 0;
    }
    get Score() {
        return this._score;
    }
    UpdateScore(deadBots) {
        deadBots.map(b => b.ScoreValue).forEach(score => {
            this._score += score;
        });
    }
}
