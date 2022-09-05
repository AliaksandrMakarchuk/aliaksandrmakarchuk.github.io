export class PrintComponentBase {
    /**
     *
     */
    constructor(position, isNewLine) {
        this._position = position;
        this._isNewLine = isNewLine;
    }
    get Position() {
        return this._position;
    }
    ;
    get NewLine() {
        return this._isNewLine;
    }
    ;
}
