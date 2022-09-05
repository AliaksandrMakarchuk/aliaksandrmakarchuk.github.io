export class ShipMovementStrategyRight {
    /**
     *
     */
    constructor(ship, canvasArea) {
        this._canvasArea = canvasArea;
        this._ship = ship;
    }
    Move(speed) {
        let nextX = this._ship.X + Math.round(speed);
        this._ship.X = Math.min.apply(null, [this._canvasArea.Width - this._ship.Width, nextX]);
    }
}
