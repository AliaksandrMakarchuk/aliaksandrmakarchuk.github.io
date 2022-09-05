import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class ScorePrintComponent extends PrintComponentBase {
    /**
     *
     */
    constructor(scoreCalculator, position, isNewLine) {
        super(position, isNewLine);
        this._scoreCalculator = scoreCalculator;
    }
    get Text() {
        return `SCORE: ${this._scoreCalculator.Score} |`;
    }
}
