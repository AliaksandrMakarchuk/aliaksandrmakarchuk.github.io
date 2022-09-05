export class BotBulletVisibilityChecker {
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetBotBullets();
    }
    RemoveInvisibleObjects(gameObjects, canvasArea) {
        let areWithinRectangle = gameObjects.filter(b => this.RectCircleColliding(b, canvasArea));
        gameObjects.splice(0);
        areWithinRectangle.forEach(b => gameObjects.push(b));
    }
    RectCircleColliding(bullet, rectangle) {
        var distX = Math.abs(bullet.X - rectangle.X - rectangle.Width / 2);
        var distY = Math.abs(bullet.Y - rectangle.Y - rectangle.Height / 2);
        if (distX > (rectangle.Width / 2 + bullet.Radius)) {
            return false;
        }
        if (distY > (rectangle.Height / 2 + bullet.Radius)) {
            return false;
        }
        if (distX <= (rectangle.Width / 2)) {
            return true;
        }
        if (distY <= (rectangle.Height / 2)) {
            return true;
        }
        var dx = distX - rectangle.Width / 2;
        var dy = distY - rectangle.Height / 2;
        return (dx * dx + dy * dy <= (bullet.Radius * bullet.Radius));
    }
}
