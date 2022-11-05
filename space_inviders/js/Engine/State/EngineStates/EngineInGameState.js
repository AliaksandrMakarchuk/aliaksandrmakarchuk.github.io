export class EngineInGameState {
    /**
     *
     */
    constructor(inputModule) {
        this._inputModule = inputModule;
    }
    GetAnimationFrameCallback() {
        if (this._engine === undefined) {
            throw new Error("Game Engine is not set");
        }
        return this._engine.GameLoop.bind(this._engine);
    }
    HandleUserInput(event, engine) {
        this._inputModule.HandleUserInputEvent(event, engine);
    }
    SetEngine(engine) {
        this._engine = engine;
    }
}
