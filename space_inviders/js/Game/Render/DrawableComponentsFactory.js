import { BulletDrawer } from "./BulletDrawer.js";
import { FieldDrawer } from "./FieldDrawer.js";
import { ShipDrawer } from "./ShipDrawer.js";
import { DrawableComponent } from "../../Engine/Render/DrawableComponent.js";
import { BotBaseDrawer } from "./BotBaseDrawer.js";
export class DrawableComponentsFactory {
    /**
     *
     */
    constructor(context) {
        this._context = context;
    }
    GenerateDrawableComponents() {
        return [
            this.GetFieldDrawableComponent(),
            this.GetBotBulletsDrawableComponent(),
            this.GetShipBulletsDrawableComponent(),
            this.GetBotsDrawableComponent(),
            this.GetShipDrawableComponent()
        ];
    }
    GetFieldDrawableComponent() {
        return new DrawableComponent(new FieldDrawer(this._context), x => x.GetField());
    }
    GetBotBulletsDrawableComponent() {
        return new DrawableComponent(new BulletDrawer(this._context), x => x.GetBotBullets());
    }
    GetShipBulletsDrawableComponent() {
        return new DrawableComponent(new BulletDrawer(this._context), x => x.GetCannonBullets());
    }
    GetBotsDrawableComponent() {
        return new DrawableComponent(new BotBaseDrawer(this._context), x => x.GetBots());
    }
    GetShipDrawableComponent() {
        return new DrawableComponent(new ShipDrawer(this._context), x => x.GetCannon());
    }
}
