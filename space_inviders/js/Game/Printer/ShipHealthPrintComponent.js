import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class ShipHealthPrintComponent extends PrintComponentBase {
    /**
     *
     */
    constructor(ship, position, isNewLine) {
        super(position, isNewLine);
        this._ship = ship;
    }
    get Text() {
        return `Health: ${this._ship.Health}`;
    }
}
