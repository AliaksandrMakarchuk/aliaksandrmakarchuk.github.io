export class MovementStateAbstract {
    constructor(algorithm) {
        this.Algorithm = algorithm;
    }
    MoveDown(bot, moveSpeed) {
        if (bot.Y + bot.Height + moveSpeed > this.Algorithm.BorderHeight) {
            return;
        }
        bot.Y = bot.Y + moveSpeed;
    }
}
