import { GameStateHandlerAbstract } from './GameStateHandlerAbstract.js';
export class StoppedGameStateHandler extends GameStateHandlerAbstract {
    constructor(gameState, gameCycleFunc) {
        super(gameState, gameCycleFunc);
    }
    HandleGameState() {
        if (this.GameState.RequestId === undefined) {
            return;
        }
        this.GameState.RequestId = requestAnimationFrame(this.GameCycleFunc.bind(this, this.GameState.AutoRequestNextFrame));
        throw new Error('Not implemented');
    }
}
