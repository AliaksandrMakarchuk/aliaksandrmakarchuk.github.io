import { HelpBotBulletCollisionDetector } from "./HelpBotBulletCollisionDetector.js";
import { HelpBotBulletCollisionResolver } from "./HelpBotBulletCollisionResolver.js";
export class HelpBotBulletCollisionModule {
    /**
     *
     */
    constructor(audioModule) {
        this._collisionDetector = new HelpBotBulletCollisionDetector();
        this._collisionResolver = new HelpBotBulletCollisionResolver(audioModule);
    }
    get CollisionDetector() {
        return this._collisionDetector;
    }
    get CollisionResolver() {
        return this._collisionResolver;
    }
}
