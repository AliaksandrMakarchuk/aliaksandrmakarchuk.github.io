export class GameStateHandlerAbstract {
    constructor(gameState, gameCycleFunc) {
        this.GameState = gameState;
        this.GameCycleFunc = gameCycleFunc;
    }
}
