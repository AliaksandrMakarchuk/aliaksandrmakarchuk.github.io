import { Collision } from "./Collision.js";
export class BulletShipCollisionDetector {
    Detect(gameObjects) {
        let collisions = [];
        let botBullets = gameObjects.GetBotBullets();
        let cannon = gameObjects.GetCannon();
        botBullets.forEach(bullet => {
            let isHit = this.RectShipCircleColliding(bullet, cannon);
            if (isHit) {
                collisions.push(new Collision(bullet, cannon));
            }
        });
        return collisions;
    }
    RectShipCircleColliding(bullet, ship) {
        var distX = Math.abs(bullet.X - ship.X - ship.Width / 2);
        var distY = Math.abs(bullet.Y - ship.Y - ship.Height / 2);
        if (distX > (ship.Width / 2 + bullet.Radius)) {
            return false;
        }
        if (distY > (ship.Height / 2 + bullet.Radius)) {
            return false;
        }
        if (distX <= (ship.Width / 2)) {
            return true;
        }
        if (distY <= (ship.Height / 2)) {
            return true;
        }
        var dx = distX - ship.Width / 2;
        var dy = distY - ship.Height / 2;
        return (dx * dx + dy * dy <= (bullet.Radius * bullet.Radius));
    }
}
