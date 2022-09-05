import { Directions } from "../../Directions.js";
export class ShipBulletsMoveComponent {
    CheckMovementState(gameObjects, secondsPassed) {
        gameObjects = gameObjects;
        secondsPassed = secondsPassed;
    }
    GetCorrespondingObjects(gameObjects) {
        return gameObjects.GetShipBullets();
    }
    Move(gameObject, secondsPassed) {
        gameObject.Move(secondsPassed, Directions.UP);
    }
}
