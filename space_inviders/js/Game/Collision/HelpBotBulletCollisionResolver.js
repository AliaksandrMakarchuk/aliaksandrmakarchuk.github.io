export class HelpBotBulletCollisionResolver {
    /**
     *
     */
    constructor(audioModule) {
        this._audioModule = audioModule;
    }
    Resolve(collisions, gameObjects) {
        collisions.forEach(collision => this.ProcessCollision(collision, gameObjects));
        // remove dead Bots
        let helpBots = gameObjects.GetHelpBots();
        let deadBots = collisions.map(b => b.GameObject).filter(x => !x.IsAlive);
        let aliveBots = helpBots.filter(bot => deadBots.findIndex(y => y === bot) === -1);
        this.UpdateArray(helpBots, aliveBots);
        let ship = gameObjects.GetShips()[0];
        if (ship === undefined || deadBots.length === 0) {
            return;
        }
        ship.IncreaseHealth();
    }
    /**
     * Remove bullets that hit Bots and decrease health of all affected Bots
     * @param collision
     * @param gameObjects
     */
    ProcessCollision(collision, gameObjects) {
        let shipBullets = gameObjects.GetShipBullets();
        let leftBullets = shipBullets.filter(x => x !== collision.Bullet);
        this.UpdateArray(shipBullets, leftBullets);
        this._audioModule.PlayHelpBotHit();
        collision.GameObject.DecreaseHealth();
    }
    UpdateArray(currentArray, newArray) {
        currentArray.splice(0);
        newArray.forEach(b => currentArray.push(b));
    }
}
