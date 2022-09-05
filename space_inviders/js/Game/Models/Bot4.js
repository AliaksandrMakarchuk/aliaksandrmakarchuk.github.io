import { BotBase } from "./BotBase.js";
export class Bot4 extends BotBase {
    constructor(x, y) {
        super(x, y, 12, 8, 5);
    }
    get LeftOffset() {
        return 4;
    }
    get RightOffset() {
        return 8;
    }
}
