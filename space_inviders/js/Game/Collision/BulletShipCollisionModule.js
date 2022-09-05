import { BulletShipCollisionDetector } from "./BulletShipCollisionDetector.js";
import { BulletShipCollisionResolver } from "./BulletShipCollisionResolver.js";
export class BulletShipCollisionModule {
    /**
     *
     */
    constructor() {
        this._collisionDetector = new BulletShipCollisionDetector();
        this._collisionResolver = new BulletShipCollisionResolver();
    }
    get CollisionDetector() {
        return this._collisionDetector;
    }
    get CollisionResolver() {
        return this._collisionResolver;
    }
}
