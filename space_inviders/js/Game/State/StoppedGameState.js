export class StoppedGameState {
    /**
     *
     */
    constructor(engine, _) {
        this._engine = engine;
        this._engine.PauseAudio();
        this._engine.PlayGameOver();
    }
    TogglePause() { }
    Stop() { }
    UpdateState(_gameObjects) { }
    ShowNextFrame() { }
    PrintStateInfo() {
        this._engine.PrintStop();
    }
}
