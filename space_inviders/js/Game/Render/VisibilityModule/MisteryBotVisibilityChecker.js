import { Mistery } from "../../Models/Mistery.js";
export class MisteryBotVisibilityChecker {
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetBots();
    }
    RemoveInvisibleObjects(gameObjects, canvasArea) {
        let outOfCanvasMisteryBots = gameObjects.filter(b => b instanceof Mistery).filter(b => !this.RectCircleColliding(b, canvasArea));
        let aliveBots = gameObjects.filter(bot => outOfCanvasMisteryBots.findIndex(y => y === bot) === -1);
        this.UpdateArray(gameObjects, aliveBots);
    }
    RectCircleColliding(bullet, rectangle) {
        return rectangle.X < bullet.X + bullet.Width &&
            rectangle.X + rectangle.Width > bullet.X &&
            rectangle.Y < bullet.Y + bullet.Height &&
            rectangle.Height + rectangle.Y > bullet.Y;
    }
    UpdateArray(currentArray, newArray) {
        currentArray.splice(0);
        newArray.forEach(b => currentArray.push(b));
    }
}
