import { BulletBotCollisionModule } from "./BulletBotCollisionModule.js";
import { BulletShipCollisionModule } from "./BulletShipCollisionModule.js";
export class CollisionModuleFactory {
    constructor(audioModule, scoreCalculator) {
        this._audioModule = audioModule;
        this._scoreCalculator = scoreCalculator;
    }
    GenerateComponents() {
        return [
            new BulletBotCollisionModule(this._audioModule, this._scoreCalculator),
            new BulletShipCollisionModule()
        ];
    }
}
