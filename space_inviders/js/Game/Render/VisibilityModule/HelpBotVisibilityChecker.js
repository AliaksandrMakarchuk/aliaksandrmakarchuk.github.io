export class HelpBotVisibilityChecker {
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetMisteryBots();
    }
    RemoveInvisibleObjects(gameObjects, canvasArea) {
        let areWithinRectangle = gameObjects.filter(b => this.RectCircleColliding(b, canvasArea));
        gameObjects.splice(0);
        areWithinRectangle.forEach(b => gameObjects.push(b));
    }
    RectCircleColliding(bullet, rectangle) {
        return rectangle.X < bullet.X + bullet.Width &&
            rectangle.X + rectangle.Width > bullet.X &&
            rectangle.Y < bullet.Y + bullet.Height &&
            rectangle.Height + rectangle.Y > bullet.Y;
    }
}
