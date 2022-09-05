import { BotBase } from "./BotBase.js";
export class Bot2 extends BotBase {
    constructor(x, y) {
        super(x, y, 12, 8, 10);
    }
    get LeftOffset() {
        return 0;
    }
    get RightOffset() {
        return 12;
    }
}
