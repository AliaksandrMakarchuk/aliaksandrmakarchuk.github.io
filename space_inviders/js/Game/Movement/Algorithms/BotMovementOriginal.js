import { Directions } from "../../../Directions.js";
import { Mistery } from "../../Models/Mistery.js";
import { MovementStateDown } from "./MovementStateDown.js";
import { MovementStateToLeft } from "./MovementStateToLeft.js";
import { MovementStateToRight } from "./MovementStateToRight.js";
export class BotMovementOriginal {
    constructor(width, height, bots) {
        this._startWait = 1; // seconds for wait
        this._decreaseWaitStep = 0.1;
        this._speed = 1;
        this._minWait = 0.2;
        this._moveSpeed = 50; // pixels
        this._width = width;
        this._height = height;
        this._state = new MovementStateToRight(this);
        this._direction = Directions.RIGHT;
        this._nextDirection = this._direction;
        this._nextState = this._state;
        this._leftWaitSeconds = this._startWait;
        this._bots = bots;
        this._canMove = false;
        this._currentWait = this._startWait;
    }
    get BorderWidth() {
        return this._width;
    }
    get BorderHeight() {
        return this._height;
    }
    get Bots() {
        return this._bots;
    }
    CheckState(bots, secondsPassed) {
        bots = bots.filter(b => !(b instanceof Mistery));
        this._leftWaitSeconds -= secondsPassed;
        if (this._leftWaitSeconds < 0) {
            this._leftWaitSeconds = this._currentWait;
            this._canMove = true;
        }
        else {
            this._canMove = false;
        }
        switch (this._direction) {
            case Directions.RIGHT:
                let maxX = Math.max.apply(null, bots.map(bot => bot.X + bot.RightOffset));
                if (this._canMove && (maxX + this._moveSpeed > this._width)) {
                    this.ChangeState(new MovementStateDown(this));
                    this._direction = Directions.DOWN;
                    this._nextState = new MovementStateToLeft(this);
                    this._nextDirection = Directions.LEFT;
                }
                break;
            case Directions.LEFT:
                let minX = Math.min.apply(null, bots.map(bot => bot.X - bot.LeftOffset));
                if (this._canMove && (minX - this._moveSpeed < 0)) {
                    this.ChangeState(new MovementStateDown(this));
                    this._direction = Directions.DOWN;
                    this._nextState = new MovementStateToRight(this);
                    this._nextDirection = Directions.RIGHT;
                }
                break;
            case Directions.DOWN:
                if (this._canMove) {
                    this.IncreaseSpeed();
                    this.ChangeState(this._nextState);
                    this._direction = this._nextDirection;
                }
                break;
        }
    }
    ChangeState(state) {
        this._state = state;
    }
    Move(secondsPassed, bot) {
        if (secondsPassed >= 1) {
            return;
        }
        if (!this._canMove) {
            return;
        }
        this._state.Move(bot, this._moveSpeed);
    }
    IncreaseSpeed() {
        if (this._currentWait <= this._minWait) {
            this._currentWait = this._minWait;
            return;
        }
        this._currentWait = this._startWait - this._decreaseWaitStep * ++this._speed;
        this._currentWait = Math.round(this._currentWait * 100) / 100;
    }
    GetCurrentSpeed() {
        return this._speed;
    }
}
