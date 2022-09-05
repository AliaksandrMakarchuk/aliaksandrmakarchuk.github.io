export class BulletBotCollisionResolver {
    /**
     *
     */
    constructor(audioModule, scoreCalculator) {
        this._audioModule = audioModule;
        this._scoreCalculator = scoreCalculator;
    }
    Resolve(collisions, gameObjects) {
        collisions.forEach(collision => this.ProcessCollision(collision, gameObjects));
        // remove dead Bots
        let bots = gameObjects.GetBots();
        let deadBots = collisions.map(b => b.GameObject).filter(x => !x.IsAlive);
        let aliveBots = bots.filter(bot => deadBots.findIndex(y => y === bot) === -1);
        this.UpdateArray(bots, aliveBots);
        this._scoreCalculator.UpdateScore(deadBots);
    }
    /**
     * Remove bullets that hit Bots and decrease health of all affected Bots
     * @param collision
     * @param gameObjects
     */
    ProcessCollision(collision, gameObjects) {
        let shipBullets = gameObjects.GetCannonBullets();
        let leftBullets = shipBullets.filter(x => x !== collision.Bullet);
        this.UpdateArray(shipBullets, leftBullets);
        this._audioModule.PlayBotHit();
        collision.GameObject.DecreaseHealth();
    }
    UpdateArray(currentArray, newArray) {
        currentArray.splice(0);
        newArray.forEach(b => currentArray.push(b));
    }
}
