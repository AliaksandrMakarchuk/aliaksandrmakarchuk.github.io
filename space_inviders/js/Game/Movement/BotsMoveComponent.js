import { Mistery } from "../Models/Mistery.js";
import { BotBase } from "../Models/BotBase.js";
export class BotsMoveComponent {
    constructor(movementAlgorithm) {
        this._speed = 300;
        this._movementAlgorithm = movementAlgorithm;
        this._botMovementMap = [
            [b => b instanceof Mistery, this.MisteryMove.bind(this)],
            [b => b instanceof BotBase, this.BotsMove.bind(this)]
        ];
    }
    CheckMovementState(gameObjects, secondsPassed) {
        this._movementAlgorithm.CheckState(gameObjects, secondsPassed);
    }
    GetCorrespondingObject(gameObjects) {
        return gameObjects.GetBots();
    }
    Move(gameObject, secondsPassed) {
        gameObject.forEach(b => this.MoveBot(b, secondsPassed));
    }
    MoveBot(bot, secondsPassed) {
        var _a;
        let movement = (_a = this._botMovementMap.find(x => x[0](bot))) === null || _a === void 0 ? void 0 : _a[1];
        if (movement === undefined) {
            throw new Error("Some of Bots can not move");
        }
        movement(bot, secondsPassed);
    }
    BotsMove(gameObject, secondsPassed) {
        this._movementAlgorithm.Move(secondsPassed, gameObject);
    }
    MisteryMove(gameObject, secondsPassed) {
        if (secondsPassed >= 1) {
            return;
        }
        gameObject.X += this._speed * secondsPassed;
    }
}
