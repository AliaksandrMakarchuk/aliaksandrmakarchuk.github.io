export class Engine {
    /**
     *
     */
    constructor(window, canvasArea, renderModule, collisionModule, movementModule, audioModule, visibilityModule, fpsCalculator, printer, gameObjects, gameLogicModule, gameStateFactory, printModule, timeModule, menuPrinter, engineState) {
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
        this._menuPrinter = menuPrinter;
        this._printModule = printModule;
        this._printer = printer;
        this._elapsedMilliseconds = 0;
        this._gameState = gameStateFactory(this);
        engineState.SetEngine(this);
        this._engineState = engineState;
    }
    Start() {
        this._window.requestAnimationFrame(this._engineState.GetAnimationFrameCallback());
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
        this._gameState.ShowNextFrame();
    }
    MenuLoop() {
        this._menuPrinter.Print();
        this.ShowNextFrame();
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
    ShowNextFrame() {
        this._window.requestAnimationFrame(this._engineState.GetAnimationFrameCallback());
    }
    TogglePause() {
        this._gameState.TogglePause();
    }
    ChangeGameState(state) {
        this._gameState = state;
    }
    ChangeEngineState(state) {
        this._engineState = state;
        this._engineState.SetEngine(this);
    }
    HandleUserInput(event) {
        this._engineState.HandleUserInput(event, this);
    }
    GetSecondsPassed() {
        let currentTimeInMilliseconds = new Date().getTime();
        let secondsPassed = (currentTimeInMilliseconds - this._elapsedMilliseconds) / 1000;
        this._elapsedMilliseconds = currentTimeInMilliseconds;
        return secondsPassed;
    }
}
