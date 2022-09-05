import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
import { SvgPathStringBuilder } from "../../Engine/Utilities/SvgPathStringBuilder.js";
export class MisteryBotDrawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
        this._repeatColorTimes = 25;
        this._colorRepeatCounter = 0;
        this._lastColor = "white";
    }
    Draw(object) {
        let pathStringBuilder = new SvgPathStringBuilder(object.CellSize, object.X, object.Y);
        pathStringBuilder
            .GoRight(2).GoDown(1)
            .GoRight(1).GoDown(1)
            .GoRight(1).GoUp(1)
            .GoRight(1).GoUp(1)
            .GoRight(2).GoDown(1)
            .GoRight(2).GoUp(1)
            .GoRight(2).GoDown(1)
            .GoRight(1).GoDown(1)
            .GoRight(1).GoUp(1)
            .GoRight(1).GoUp(1)
            .GoRight(2).GoUp(1)
            .GoLeft(1).GoUp(1)
            .GoLeft(1).GoUp(1)
            .GoLeft(1).GoUp(1)
            .GoLeft(2).GoUp(1)
            .GoLeft(6).GoDown(1)
            .GoLeft(2).GoDown(1)
            .GoLeft(1).GoDown(1)
            .GoLeft(1).GoDown(1)
            .GoLeft(1).GoDown(1);
        let path = new Path2D(pathStringBuilder.Build());
        this.Context.beginPath();
        this.Context.lineWidth = 3;
        this.Context.strokeStyle = '#eb345e';
        this.Context.fillStyle = this.GetColor();
        this.Context.stroke(path);
        this.Context.fill(path);
        // --- windows ---
        this.DrawWindow(3.8, 1.2, object);
        this.DrawWindow(7.5, 1.2, object);
        this.DrawWindow(11.2, 1.2, object);
    }
    DrawWindow(xOffset, yOffset, bot) {
        let pathStringBuilder = new SvgPathStringBuilder(bot.CellSize, bot.X + bot.CellSize * xOffset, bot.Y - bot.CellSize * yOffset);
        pathStringBuilder.GoRight(1).GoUp(1).GoLeft(1).GoDown(1);
        let path = new Path2D(pathStringBuilder.Build());
        this.Context.beginPath();
        this.Context.lineWidth = 3;
        this.Context.strokeStyle = 'black';
        this.Context.fillStyle = 'black';
        this.Context.stroke(path);
        this.Context.fill(path);
    }
    GetColor() {
        if (this.CanChangeColor()) {
            this._lastColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
        return this._lastColor;
    }
    CanChangeColor() {
        if (this._colorRepeatCounter++ > this._repeatColorTimes) {
            this._colorRepeatCounter = 0;
            return true;
        }
        return false;
    }
}
