import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class SpeedPrintComponet extends PrintComponentBase {
    /**
     *
     */
    constructor(algorithm, position, isNewLine) {
        super(position, isNewLine);
        this._algorithm = algorithm;
    }
    get Text() {
        return `SPEED: ${this._algorithm.GetCurrentSpeed()}`;
    }
}
