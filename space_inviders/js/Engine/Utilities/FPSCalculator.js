import { ValueRepeating } from "./ValueRepeating.js";
export class FPSCalculator {
    constructor() {
        this._fpsValues = [];
    }
    get MostRepeatableFPS() {
        var _a, _b;
        let sorted = this._fpsValues
            .sort((a, b) => {
            if (a.Repeating == b.Repeating) {
                return a.Value > b.Value ? -1 : 1;
            }
            return a.Repeating > b.Repeating ? -1 : 1;
        });
        return (_b = (_a = sorted[0]) === null || _a === void 0 ? void 0 : _a.Value) !== null && _b !== void 0 ? _b : 0;
    }
    UpdateFps(secondsPassed) {
        let newFps = Math.round(1 / secondsPassed);
        let valueRepeating = this._fpsValues.find((v) => { return v.Value === newFps; });
        if (valueRepeating === undefined) {
            valueRepeating = new ValueRepeating(newFps);
            this._fpsValues.push(valueRepeating);
        }
        else {
            valueRepeating.IncreaseRepeating();
        }
    }
}
