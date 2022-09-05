import { MovementStateAbstract } from "./MovementStateAbstract.js";
// import { MovementStateToRight } from "./MovementStateToRight.js";
export class MovementStateToLeft extends MovementStateAbstract {
    Move(bot, moveSpeed) {
        // if (this.CanMove(this.Algorithm.Bots, moveSpeed)) {
        //     this.MoveDown(bot, moveSpeed);
        //     this.Algorithm.ChangeState(new MovementStateToRight(this.Algorithm));
        //     return;
        // }
        bot.X -= moveSpeed;
    }
    CanMove(bots, moveSpeed) {
        let minX = Math.min.apply(null, bots.map(bot => bot.X));
        if (minX - moveSpeed < 0) {
            return false;
        }
        return true;
    }
}
