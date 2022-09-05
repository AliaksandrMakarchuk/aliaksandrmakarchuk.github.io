export class Engine {
    /**
     *
     */
    constructor(window, canvasArea, renderModule, collisionModule, movementModule, audioModule, visibilityModule, fpsCalculator, printer, gameObjects, gameLogicModule, userInputModule, gameStateFactory, printModule, timeModule) {
        this._window = window;
        this._canvasArea = canvasArea;
        this._timeModule = timeModule;
        this._audioModule = audioModule;
        this._gameObjects = gameObjects;
        this._fpsCalculator = fpsCalculator;
        this._visibilityModule = visibilityModule;
        this._movementModule = movementModule;
        this._collisionModule = collisionModule;
        this._renderModule = renderModule;
        this._gameLogicModule = gameLogicModule;
        this._userInputModule = userInputModule;
        this._printModule = printModule;
        this._printer = printer;
        this._ellapsedMilliseconds = 0;
        this._gameState = gameStateFactory(this);
        this._gameState.TogglePause();
        // if (!ConfigurationModule.IsAudioEnabled()) {
        //     this._audioModule.DisableAudio();
        // }
    }
    Start() {
        this.GameLoop();
    }
    GameLoop() {
        this._movementModule.Move(this._gameObjects, this._timeModule.SecondsPassed);
        this._collisionModule.UpdateCollisions(this._gameObjects);
        this._gameLogicModule.Apply(this._gameObjects);
        this._visibilityModule.CheckVisibility(this._gameObjects, this._canvasArea);
        this._gameState.UpdateState(this._gameObjects);
        this._renderModule.ReDraw(this._gameObjects);
        this._fpsCalculator.UpdateFps(this._timeModule.SecondsPassed);
        this._printModule.Print();
        this._gameState.PrintStateInfo();
        this._timeModule.UpdateLastFrameTimeElapsed(this.GetSecondsPassed());
        this._gameState.GoNextFrame();
    }
    PauseAudio() {
        this._audioModule.PauseBackground();
    }
    PlayAudio() {
        this._audioModule.PlayBackground();
    }
    PlayGameOver() {
        this._audioModule.PlayGameOver();
    }
    PrintStop() {
        this._printer.PrintGameStop();
    }
    PrintPause() {
        this._printer.PrintPause();
    }
    GoNextFrame() {
        this._window.requestAnimationFrame(this.GameLoop.bind(this));
    }
    TogglePause() {
        this._gameState.TogglePause();
    }
    ChangeState(state) {
        this._gameState = state;
    }
    HandleUserInput(event) {
        this._userInputModule.HandleUserInputEvent(event, this);
    }
    GetSecondsPassed() {
        let milliseconds = new Date().getTime();
        let secondsPassed = (milliseconds - this._ellapsedMilliseconds) / 1000;
        this._ellapsedMilliseconds = milliseconds;
        return secondsPassed;
    }
}
