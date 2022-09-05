import { PausedGameState } from "./PausedGameState.js";
import { StoppedGameState } from "./StoppedGameState.js";
export class RanGameState {
    /**
     *
     */
    constructor(engine, gameObjects, scoreCalculator) {
        this._engine = engine;
        this._scoreCalculator = scoreCalculator;
        this._gameObjects = gameObjects;
        this._engine.PlayAudio();
        this._engine.GoNextFrame();
    }
    TogglePause() {
        this._engine.ChangeState(new PausedGameState(this._engine, this._gameObjects, this._scoreCalculator));
    }
    Stop() {
        this._engine.ChangeState(new StoppedGameState(this._engine, this._gameObjects));
    }
    UpdateState() {
        if (!this._gameObjects.GetCannon().IsAlive || this._gameObjects.GetBots().length === 0) {
            this.Stop();
        }
    }
    PrintStateInfo() { }
    GoNextFrame() {
        this._engine.GoNextFrame();
    }
}
