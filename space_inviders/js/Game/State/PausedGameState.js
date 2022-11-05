import { RanGameState } from "./RanGameState.js";
import { StoppedGameState } from "./StoppedGameState.js";
export class PausedGameState {
    /**
     *
     */
    constructor(engine, gameObjects, scoreCalculator) {
        this._engine = engine;
        this._scoreCalculator = scoreCalculator;
        this._gameObjects = gameObjects;
        this._engine.PauseAudio();
    }
    TogglePause() {
        this._engine.ChangeGameState(new RanGameState(this._engine, this._gameObjects, this._scoreCalculator));
    }
    Stop() {
        this._engine.ChangeGameState(new StoppedGameState(this._engine, this._gameObjects));
    }
    UpdateState(_gameObjects) { }
    PrintStateInfo() {
        this._engine.PrintPause();
    }
    ShowNextFrame() { }
}
