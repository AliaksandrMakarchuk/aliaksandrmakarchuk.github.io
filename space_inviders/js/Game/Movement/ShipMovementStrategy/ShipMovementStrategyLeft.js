export class ShipMovementStrategyLeft {
    /**
     *
     */
    constructor(ship, canvasArea) {
        this._canvasArea = canvasArea;
        this._ship = ship;
    }
    Move(speed) {
        let nextX = this._ship.X - speed;
        this._ship.X = Math.max.apply(null, [this._canvasArea.X, nextX]);
    }
}
