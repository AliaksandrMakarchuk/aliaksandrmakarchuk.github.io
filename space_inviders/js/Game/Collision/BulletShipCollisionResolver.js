export class BulletShipCollisionResolver {
    Resolve(collisions, gameObjects) {
        if (collisions.length === 0) {
            return;
        }
        collisions.forEach(x => this.ProcessCollision(x, gameObjects));
    }
    /**
     * Remove bullets that hit Ship and decrease health of the Ship
     * @param collision
     * @param gameObjects
     */
    ProcessCollision(collision, gameObjects) {
        let botBullets = gameObjects.GetBotBullets();
        let leftBullets = botBullets.filter(bullet => bullet !== collision.Bullet);
        this.UpdateArray(botBullets, leftBullets);
        collision.GameObject.DecreaseHealth();
    }
    UpdateArray(currentArray, newArray) {
        currentArray.splice(0);
        newArray.forEach(b => currentArray.push(b));
    }
}
