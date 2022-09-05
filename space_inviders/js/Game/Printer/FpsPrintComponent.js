import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class FpsPrintComponent extends PrintComponentBase {
    /**
     *
     */
    constructor(fpsCalculator, position, isNewLine) {
        super(position, isNewLine);
        this._fpsCalculator = fpsCalculator;
    }
    get Text() {
        return `${this._fpsCalculator.MostRepeatableFPS.toString()} FPS`;
    }
}
