import { Mistery } from "../Models/Mistery.js";
import { Bot2 } from "../Models/Bot2.js";
export class SimpleBotsGenerator {
    /**
     *
     */
    constructor(columns, rows) {
        this._columns = columns;
        this._rows = rows;
    }
    Generate() {
        let space = 20;
        let bots = [];
        let startX = 10;
        let startY = 50;
        for (let r = 0; r < this._rows; r++) {
            for (let i = 0; i < this._columns; i++) {
                let tempBot;
                if (r < 2) {
                    tempBot = new Bot2(0, 0);
                }
                else {
                    tempBot = new Mistery(0, 0);
                }
                tempBot.X = i * (tempBot.Width + space) + startX;
                tempBot.Y = r * (tempBot.Height + space) + startY;
                bots.push(tempBot);
            }
        }
        return bots;
    }
}
