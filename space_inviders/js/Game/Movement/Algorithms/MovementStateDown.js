import { MovementStateAbstract } from "./MovementStateAbstract.js";
export class MovementStateDown extends MovementStateAbstract {
    Move(bot, moveSpeed) {
        bot.Y = bot.Y + moveSpeed;
    }
}
