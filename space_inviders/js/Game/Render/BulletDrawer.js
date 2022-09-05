import { DrawerBase } from "../../Engine/Render/DrawerBase.js";
export class BulletDrawer extends DrawerBase {
    /**
     *
     */
    constructor(context) {
        super(context);
    }
    Draw(object) {
        object.forEach(b => this.DrawBullet(b));
    }
    DrawBullet(bullet) {
        this.Context.fillStyle = 'brown';
        this.Context.beginPath();
        this.Context.ellipse(bullet.X, bullet.Y, bullet.Radius, bullet.Radius, 0, 0, 2 * Math.PI);
        this.Context.fill();
    }
}
