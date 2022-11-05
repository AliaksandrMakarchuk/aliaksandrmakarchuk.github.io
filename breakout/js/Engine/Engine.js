import { GameStateHandlerFactory } from './GameStateHandler/GameStateHandlerFactory.js';
export class Engine {
    constructor(gameObjects, 
    // keyboardEventsHandler: KeyboardEventsHandler,
    collisionChecker, gameState) {
        this._requestId = undefined;
        this._gameObjects = gameObjects;
        // this._keyboardEventsHandler = keyboardEventsHandler;
        this._collisionChecker = collisionChecker;
        // this._document = document;
        this.InitializeKeyboardEventsHandler();
        this._gameStateHandlerFactory = new GameStateHandlerFactory(gameState);
    }
    Start() {
        this.GameCycle();
    }
    GameCycle() {
        // update
        const currentGameState = this.UpdateGameState();
        this._gameStateHandlerFactory.GetGameStateHandler(currentGameState, this.GameCycle.bind(this, true)).HandleGameState();
        // render
        this.Draw();
    }
    TriggerPause() {
        if (this._requestId !== undefined) {
            cancelAnimationFrame(this._requestId);
            this._requestId = undefined;
            return;
        }
        this._requestId = requestAnimationFrame(this.GameCycle.bind(this, true));
        return;
    }
    InitializeKeyboardEventsHandler() {
        // this._document.addEventListener('keydown', e => this._keyboardEventsHandler.HandleKeyPressed(e.code), false);
        // this._document.addEventListener('keyup', e => this._keyboardEventsHandler.HandleKeyReleased(e.code), false);
    }
    UpdateGameState() {
        this.UpdateCollisions();
        this.UpdateObjectPositions();
        return this.GetCurrentGameState();
    }
    GetCurrentGameState() {
        throw new Error('Not implemented');
    }
    UpdateObjectPositions() {
        throw new Error('Not implemented');
    }
    UpdateCollisions() {
        this._collisionChecker.CheckCollisions(this._gameObjects);
    }
    Draw() {
        this._gameObjects.forEach(obj => obj.Draw());
    }
}
