import { Mistery } from "../Models/Mistery.js";
export class MisteryBotGameLogicComponent {
    /**
     *
     */
    constructor(timeModule, debugComponent) {
        this._totalSecondsPassed = 0;
        this._shouldWait = 10;
        this._timeModule = timeModule;
        this._debugComponent = debugComponent;
        this._debugComponent.UpdateSecondsLeft(this._shouldWait);
    }
    Action(gameObjects) {
        let misteryBots = gameObjects.GetBots().filter(b => b instanceof Mistery);
        let ship = gameObjects.GetCannon();
        if (ship.Health >= 3 || misteryBots.length > 0) {
            return;
        }
        this._totalSecondsPassed += this._timeModule.SecondsPassed;
        if (this._totalSecondsPassed < this._shouldWait) {
            this._debugComponent.UpdateSecondsLeft(this._shouldWait - this._totalSecondsPassed);
            return;
        }
        this._totalSecondsPassed = 0;
        this._debugComponent.UpdateSecondsLeft(this._shouldWait - this._totalSecondsPassed);
        gameObjects.GetBots().push(new Mistery(0, 40));
    }
}
