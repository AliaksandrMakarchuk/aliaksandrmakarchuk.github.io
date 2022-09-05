export class CollisionModule {
    /**
     *
     */
    constructor(collisionModuleComponents) {
        this._components = collisionModuleComponents;
    }
    get Components() {
        return this._components;
    }
    UpdateCollisions(gameObjects) {
        this.Components.forEach(component => {
            let collisions = component.CollisionDetector.Detect(gameObjects);
            component.CollisionResolver.Resolve(collisions, gameObjects);
        });
    }
}
