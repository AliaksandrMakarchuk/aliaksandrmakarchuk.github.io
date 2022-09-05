import { HelpBot } from "../Models/HelpBot.js";
export class HelpBotGameLogicComponent {
    /**
     *
     */
    constructor(timeModule) {
        this._totalSecondsPassed = 0;
        this._timeModule = timeModule;
    }
    Action(gameObjects) {
        let helpBots = gameObjects.GetHelpBots();
        let ship = gameObjects.GetShips()[0];
        if (ship === undefined || ship !== undefined && ship.Health >= 3 || helpBots.length > 0) {
            return;
        }
        this._totalSecondsPassed += this._timeModule.SecondsPassed;
        if (this._totalSecondsPassed < 10) {
            return;
        }
        this._totalSecondsPassed = 0;
        helpBots.push(new HelpBot(0, 50));
    }
}
