import { MovementStateAbstract } from "./MovementStateAbstract.js";
// import { MovementStateToLeft } from "./MovementStateToLeft.js";
export class MovementStateToRight extends MovementStateAbstract {
    Move(bot, moveSpeed) {
        // if (!this.CanMove(this.Algorithm.Bots, moveSpeed)) {
        //     this.MoveDown(bot, moveSpeed);
        //     this.Algorithm.ChangeState(new MovementStateToLeft(this.Algorithm));
        //     return;
        // }
        bot.X += moveSpeed;
    }
    CanMove(bots, moveSpeed) {
        var _a, _b;
        let maxX = Math.max.apply(null, bots.map(bot => bot.X));
        if (maxX + ((_b = (_a = bots[0]) === null || _a === void 0 ? void 0 : _a.Width) !== null && _b !== void 0 ? _b : 0) + moveSpeed > this.Algorithm.BorderWidth) {
            return false;
        }
        return true;
    }
}
