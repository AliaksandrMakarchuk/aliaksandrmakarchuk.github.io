export class ScoreGameLogicComponent {
    /**
     *
     */
    constructor(scoreCalculator) {
        this._scoreCalculator = scoreCalculator;
    }
    Action(gameObjects) {
        let bots = gameObjects.GetBots();
        this._scoreCalculator.UpdateScore(bots.filter(b => b.IsAlive).length);
    }
}
