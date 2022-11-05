import { GameStateTypes } from '../GameStateTypes.js';
import { RunningGameStateHandler } from './RunningGameStateHandler.js';
import { PausedGameStateHandler } from './PausedGameStateHandler.js';
import { StoppedGameStateHandler } from './StoppedGameStateHandler.js';
import { DefaultGameStateHandler } from './DefaultGameStateHandler.js';
export class GameStateHandlerFactory {
    constructor(gameState) {
        this._gameState = gameState;
    }
    GetGameStateHandler(state, gameCycleFunc) {
        switch (state) {
            case GameStateTypes.RUNNING:
                return new RunningGameStateHandler(this._gameState, gameCycleFunc);
            case GameStateTypes.PAUSED:
                return new PausedGameStateHandler(this._gameState, gameCycleFunc);
            case GameStateTypes.STOPPED:
                return new StoppedGameStateHandler(this._gameState, gameCycleFunc);
            default:
                return new DefaultGameStateHandler();
        }
    }
}
