import { PrintComponentBase } from "../../Engine/Printer/PrintComponentBase.js";
export class DateTimePrintComponent extends PrintComponentBase {
    /**
     *
     */
    constructor(position, isNewLine) {
        super(position, isNewLine);
    }
    get Text() {
        let dateTime = new Date();
        return dateTime.toUTCString();
    }
}
