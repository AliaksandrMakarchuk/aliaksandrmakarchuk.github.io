import { BulletBotCollisionDetector } from "./BulletBotCollisionDetector.js";
import { BulletBotCollisionResolver } from "./BulletBotCollisionResolver.js";
export class BulletBotCollisionModule {
    /**
     *
     */
    constructor(audioModule, scoreCalculator) {
        this._collisionDetector = new BulletBotCollisionDetector();
        this._collisionResolver = new BulletBotCollisionResolver(audioModule, scoreCalculator);
    }
    get CollisionDetector() {
        return this._collisionDetector;
    }
    get CollisionResolver() {
        return this._collisionResolver;
    }
}
