import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class DebugPrintComponent extends PrintComponentBase {
    /**
     *
     */
    constructor(debugComponent, position, isNewLine) {
        super(position, isNewLine);
        this._debugComponent = debugComponent;
    }
    get Text() {
        return `DEBUG: ${this._debugComponent.GetInfo()}`;
    }
}
