import { Collision } from "./Collision.js";
export class HelpBotBulletCollisionDetector {
    Detect(gameObjects) {
        let collisions = [];
        let shipBullets = gameObjects.GetShipBullets();
        let helpBots = gameObjects.GetHelpBots();
        shipBullets.forEach(bullet => {
            let affectedBot = helpBots.find(bot => this.RectCircleColliding(bullet, bot));
            if (affectedBot !== undefined) {
                collisions.push(new Collision(bullet, affectedBot));
            }
        });
        return collisions;
    }
    RectCircleColliding(bullet, bot) {
        var distX = Math.abs(bullet.X - bot.X - bot.Width / 2);
        var distY = Math.abs(bullet.Y - bot.Y - bot.Height / 2);
        if (distX > (bot.Width / 2 + bullet.Radius)) {
            return false;
        }
        if (distY > (bot.Height / 2 + bullet.Radius)) {
            return false;
        }
        if (distX <= (bot.Width / 2)) {
            return true;
        }
        if (distY <= (bot.Height / 2)) {
            return true;
        }
        var dx = distX - bot.Width / 2;
        var dy = distY - bot.Height / 2;
        return (dx * dx + dy * dy <= (bullet.Radius * bullet.Radius));
    }
}
