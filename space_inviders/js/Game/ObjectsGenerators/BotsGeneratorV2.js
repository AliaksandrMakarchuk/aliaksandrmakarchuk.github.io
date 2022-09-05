import { Bot2 } from "../Models/Bot2.js";
import { Bot3 } from "../Models/Bot3.js";
import { Bot4 } from "../Models/Bot4.js";
export class BotsGeneratorV2 {
    /**
     *
     */
    constructor(width, x, y) {
        this._x = x;
        this._y = y;
        this._width = width;
    }
    Generate() {
        let space = 2;
        let rowCount = 3;
        let botCount;
        let x;
        let bots = [];
        for (let r = 0; r < rowCount; r++) {
            let bot;
            if (r < 1) {
                bot = new Bot3(0, 0);
                [x, botCount] = this.GetCorrectX(this._x, space, this._width, bot);
            }
            else if (r < 2) {
                bot = new Bot2(0, 0);
                [x, botCount] = this.GetCorrectX(this._x, space, this._width, bot);
            }
            else {
                bot = new Bot4(0, 0);
                [x, botCount] = this.GetCorrectX(this._x, space, this._width, bot);
            }
            for (let i = 0; i < botCount; i++) {
                if (r < 1) {
                    let [xCoord, yCoord] = this.GetCoords(x, this._y, r, i, space, bot);
                    bots.push(new Bot3(xCoord, yCoord));
                }
                else if (r < 2) {
                    let [xCoord, yCoord] = this.GetCoords(x, this._y, r, i, space, bot);
                    bots.push(new Bot2(xCoord, yCoord));
                }
                else {
                    let [xCoord, yCoord] = this.GetCoords(x, this._y, r, i, space, bot);
                    bots.push(new Bot4(xCoord, yCoord));
                }
            }
        }
        return bots;
    }
    GetCorrectX(startX, space, width, bot) {
        let botCount = Math.floor(width / (bot.Width + space * bot.CellSize));
        let occupiedWidth = (botCount - 1) * space * bot.CellSize + botCount * bot.Width;
        let x = (width - occupiedWidth) / 2 + bot.LeftOffset * bot.CellSize + startX;
        return [x, botCount];
    }
    GetCoords(x, y, row, column, space, bot) {
        let xCoord = column * (bot.Width + space * bot.CellSize) + x;
        let yCoord = row * (bot.Height + space * bot.CellSize) + y;
        return [xCoord, yCoord];
    }
}
