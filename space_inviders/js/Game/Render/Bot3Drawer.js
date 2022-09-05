import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
import { SvgPathStringBuilder } from "../../Engine/Utilities/SvgPathStringBuilder.js";
export class Bot3Drawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
    }
    Draw(object) {
        let pathStringBuilder = new SvgPathStringBuilder(object.CellSize, object.X, object.Y);
        pathStringBuilder
            .GoDown(1).GoLeft(1).GoDown(1).GoLeft(1).GoDown(1).GoLeft(1)
            .GoDown(2).GoRight(2)
            .GoDown(1).GoLeft(1).GoDown(1).GoLeft(1).GoDown(1)
            .GoRight(1).GoUp(1).GoRight(1).GoDown(1).GoRight(1).GoUp(1)
            .GoRight(2).GoDown(1).GoRight(1).GoUp(1).GoRight(1).GoDown(1).GoRight(1)
            .GoUp(1).GoLeft(1).GoUp(1).GoLeft(1).GoUp(1)
            .GoRight(2).GoUp(2)
            .GoLeft(1).GoUp(1).GoLeft(1).GoUp(1).GoLeft(1).GoUp(1)
            .GoLeft(2);
        let path = new Path2D(pathStringBuilder.Build());
        this.Context.beginPath();
        this.Context.lineWidth = 1;
        this.Context.strokeStyle = '#eb345e';
        this.Context.fillStyle = this.GetFillColor(object.Health);
        this.Context.stroke(path);
        this.Context.fill(path);
        // --- windows ---
        this.DrawWindow(-1, 4, object);
        this.DrawWindow(2, 4, object);
        this.DrawWindow(0, 6, object);
        this.DrawWindow(1, 6, object);
    }
    DrawWindow(xOffset, yOffset, bot) {
        let pathStringBuilder = new SvgPathStringBuilder(bot.CellSize, bot.X + bot.CellSize * xOffset, bot.Y + bot.CellSize * yOffset);
        pathStringBuilder.GoRight(1).GoUp(1).GoLeft(1).GoDown(1);
        let path = new Path2D(pathStringBuilder.Build());
        this.Context.beginPath();
        this.Context.lineWidth = 1;
        this.Context.strokeStyle = 'black';
        this.Context.fillStyle = 'black';
        this.Context.stroke(path);
        this.Context.fill(path);
    }
    GetFillColor(health) {
        switch (health) {
            case 3:
                return 'white';
            case 2:
                return 'blue';
            case 1:
                return 'red';
            default:
                return 'darkred';
        }
    }
}
