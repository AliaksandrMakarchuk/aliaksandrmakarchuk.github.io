import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
export class FieldDrawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
        this._bgColor = "#222";
    }
    Draw(object) {
        this.Context.fillStyle = this._bgColor;
        this.Context.beginPath();
        this.Context.fillRect(0, 0, object.Width, object.Height);
        this.Context.fill();
    }
}
