import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
import { SvgPathStringBuilder } from "../../Engine/Utilities/SvgPathStringBuilder.js";
export class ShipDrawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
    }
    Draw(object) {
        let svgPathStringBuilder = new SvgPathStringBuilder(object.CellSize, object.X, object.Y);
        svgPathStringBuilder.GoRight(object.Width / object.CellSize)
            .GoUp(4).GoLeft(1).GoUp(1)
            .GoLeft(5).GoUp(2).GoLeft(1)
            .GoUp(1).GoLeft(1)
            .GoDown(1).GoLeft(1)
            .GoDown(2).GoLeft(5)
            .GoDown(1).GoLeft(1)
            .GoDown(4);
        let path = new Path2D(svgPathStringBuilder.Build());
        this.Context.beginPath();
        this.Context.lineWidth = 3;
        this.Context.strokeStyle = '#eb345e';
        this.Context.fillStyle = this.GetFillColor(object.Health);
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
