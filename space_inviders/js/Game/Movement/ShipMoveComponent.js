import { Directions } from "../../Directions.js";
import { ShipMovementStrategyNotMove } from "./ShipMovementStrategy/ShipMovementStrategyNotMove.js";
import { ShipMovementStrategyLeft } from "./ShipMovementStrategy/ShipMovementStrategyLeft.js";
import { ShipMovementStrategyRight } from "./ShipMovementStrategy/ShipMovementStrategyRight.js";
export class ShipMoveComponent {
    /**
     *
     */
    constructor(ship, canvasArea) {
        this._moveStrategy = new ShipMovementStrategyNotMove();
        this._canvasArea = canvasArea;
        this._ship = ship;
    }
    UpdateDirection(direction) {
        switch (direction) {
            case Directions.LEFT:
                this._moveStrategy = new ShipMovementStrategyLeft(this._ship, this._canvasArea);
                break;
            case Directions.RIGHT:
                this._moveStrategy = new ShipMovementStrategyRight(this._ship, this._canvasArea);
                break;
            default:
                this._moveStrategy = new ShipMovementStrategyNotMove();
        }
    }
    GetCorrespondingObject(gameObjects) {
        return gameObjects.GetCannon();
    }
    CheckMovementState(_gameObjects, _secondsPassed) { }
    Move(gameObject, secondsPassed) {
        this._moveStrategy.Move(Math.round(gameObject.Speed * secondsPassed));
    }
}
