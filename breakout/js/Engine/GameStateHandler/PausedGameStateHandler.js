import { GameStateHandlerAbstract } from './GameStateHandlerAbstract.js';
export class PausedGameStateHandler extends GameStateHandlerAbstract {
    constructor(gameState, gameCycleFunc) {
        super(gameState, gameCycleFunc);
    }
    HandleGameState() {
        if (this.GameState.RequestId === undefined) {
            return;
        }
        cancelAnimationFrame(this.GameState.RequestId);
        this.GameState.RequestId = undefined;
    }
}
