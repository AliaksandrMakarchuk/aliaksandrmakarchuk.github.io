import { BotBase } from "./BotBase.js";
export class Bot extends BotBase {
    constructor(x, y) {
        super(x, y, 16, 8, 50);
    }
    get LeftOffset() {
        return 5;
    }
    get RightOffset() {
        return 11;
    }
}
