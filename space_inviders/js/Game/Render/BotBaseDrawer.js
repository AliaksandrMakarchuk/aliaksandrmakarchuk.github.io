import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
import { Mistery } from "../Models/Mistery.js";
import { Bot2 } from "../Models/Bot2.js";
import { Bot3 } from "../Models/Bot3.js";
import { Bot4 } from "../Models/Bot4.js";
import { Bot2Drawer } from "./Bot2Drawer.js";
import { Bot3Drawer } from "./Bot3Drawer.js";
import { Bot4Drawer } from "./Bot4Drawer.js";
import { MisteryBotDrawer } from "./MisteryBotDrawer.js";
export class BotBaseDrawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
        this._drawersMap = [
            [obj => obj instanceof Mistery, new MisteryBotDrawer(context)],
            [obj => obj instanceof Bot2, new Bot2Drawer(context)],
            [obj => obj instanceof Bot3, new Bot3Drawer(context)],
            [obj => obj instanceof Bot4, new Bot4Drawer(context)]
        ];
    }
    Draw(object) {
        object.forEach(b => this.DrawBot(b));
    }
    DrawBot(bot) {
        var _a;
        let drawer = (_a = this._drawersMap.find(x => x[0](bot))) === null || _a === void 0 ? void 0 : _a[1];
        if (drawer === undefined) {
            throw new Error("Could not draw some Bot");
        }
        drawer.Draw(bot);
    }
}
