export class BotMovementByCircle {
    constructor() {
        this._movementSpeed = 30; // grad per second
        this._currentAngle = 0; // start from 0 grad
        this._circleTrajectoryRadius = 50; // 50 px
    }
    Move(secondsPassed, bot) {
        if (secondsPassed >= 1) {
            return;
        }
        this._currentAngle += this._movementSpeed * secondsPassed;
        if (this._currentAngle >= 360) {
            this._currentAngle = 0;
        }
        let angleInRadian = BotMovementByCircle.ConvertToRadian(this._currentAngle);
        bot.X = bot.StartX + this._circleTrajectoryRadius * Math.cos(angleInRadian);
        bot.Y = bot.StartY + this._circleTrajectoryRadius * Math.sin(angleInRadian);
        console.log(`${this._currentAngle}: [${bot.X}; ${bot.Y}]`);
    }
    CheckState(_bots, _secondsPassed) { }
    IncreaseSpeed() { }
    GetCurrentSpeed() {
        return this._movementSpeed;
    }
    static ConvertToRadian(degrees) {
        return degrees * (Math.PI / 180);
    }
}
