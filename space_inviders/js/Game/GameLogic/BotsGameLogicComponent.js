import { Mistery } from "../Models/Mistery.js";
export class BotsGameLogicComponent {
    /**
     *
     */
    constructor(gameObjects, debugComponent) {
        this._aggressivityLevel = 1;
        this._fireProbabilityStep = 15;
        this._startFireProbability = 985;
        this._lastAliveBotsNumber = 0;
        this._debugComponent = debugComponent;
        this._debugComponent.UpdateAggresifityLevel(this._aggressivityLevel);
        this._lastAliveBotsNumber = this.GetBots(gameObjects).length;
    }
    Action(gameObjects) {
        var _a;
        let botBullets = gameObjects.GetBotBullets();
        if (botBullets.length > 0) {
            return;
        }
        let bots = this.GetBots(gameObjects);
        let fireProbabilityLevel = this._startFireProbability;
        if (this._lastAliveBotsNumber !== bots.length) {
            this._lastAliveBotsNumber = bots.length;
            fireProbabilityLevel = this._startFireProbability - ++this._aggressivityLevel * this._fireProbabilityStep;
            this._debugComponent.UpdateAggresifityLevel(this._aggressivityLevel);
        }
        let rand = Math.random() * 1000;
        if (rand < fireProbabilityLevel) {
            return;
        }
        let random = Math.random();
        let botIndex = Math.round(random * bots.length);
        let bullet = (_a = bots[botIndex]) === null || _a === void 0 ? void 0 : _a.Fire();
        if (bullet !== undefined) {
            botBullets.push(bullet);
        }
    }
    GetBots(gameObjects) {
        return gameObjects.GetBots().filter(b => !(b instanceof Mistery));
    }
}
