import { Directions } from "../../Directions.js";
export class BotBulletsMoveComponent {
    CheckMovementState(gameObjects, secondsPassed) {
        gameObjects = gameObjects;
        secondsPassed = secondsPassed;
    }
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetBotBullets();
    }
    Move(gameObject, secondsPassed) {
        if (secondsPassed > 0.1) {
            return;
        }
        gameObject.Move(secondsPassed, Directions.DOWN);
    }
}
