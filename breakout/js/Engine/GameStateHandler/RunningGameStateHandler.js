import { GameStateHandlerAbstract } from './GameStateHandlerAbstract.js';
export class RunningGameStateHandler extends GameStateHandlerAbstract {
    constructor(gameState, gameCycleFunc) {
        super(gameState, gameCycleFunc);
    }
    HandleGameState() {
        if (this.GameState.RequestId === undefined) {
            return;
        }
        this.GameState.RequestId = requestAnimationFrame(this.GameCycleFunc.bind(this, this.GameState.AutoRequestNextFrame));
    }
}
