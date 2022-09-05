export class ValueRepeating {
    constructor(value) {
        if (isNaN(value)) {
            new Error("Value cannot be NaN!");
        }
        this._value = value;
        this._repeating = 1;
    }
    get Value() {
        return this._value;
    }
    get Repeating() {
        return this._repeating;
    }
    IncreaseRepeating() {
        this._repeating += 1;
    }
}
