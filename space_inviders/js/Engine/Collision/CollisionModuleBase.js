export class CollisionModuleBase {
    /**
     *
     */
    constructor(collisionModuleComponents) {
        this._components = collisionModuleComponents;
    }
    get Components() {
        return this._components;
    }
}
