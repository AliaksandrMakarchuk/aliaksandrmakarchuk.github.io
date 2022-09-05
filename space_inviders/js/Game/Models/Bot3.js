import { BotBase } from "./BotBase.js";
export class Bot3 extends BotBase {
    constructor(x, y) {
        super(x, y, 8, 8, 15);
    }
    get LeftOffset() {
        return 3;
    }
    get RightOffset() {
        return 5;
    }
}
