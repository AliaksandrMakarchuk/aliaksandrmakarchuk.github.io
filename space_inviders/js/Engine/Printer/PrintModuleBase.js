import { TextPositioning } from "../Utilities/Printer.js";
export class PrintModuleBase {
    /**
     *
     */
    constructor(printer, canvasArea, components) {
        this._printer = printer;
        this._canvasArea = canvasArea;
        this._components = components;
    }
    get CanvasArea() {
        return this._canvasArea;
    }
    get Printer() {
        return this._printer;
    }
    get Components() {
        return this._components;
    }
    Print() {
        let utils = new Utils();
        let groupedComponents = utils.GroupBy(this._components.sort(utils.Compare.bind(utils)), x => x.Position);
        groupedComponents.forEach(componentsByGroup => {
            this.PrintTemplate(componentsByGroup);
        });
    }
}
export var TextPosition;
(function (TextPosition) {
    TextPosition[TextPosition["LEFT"] = 1] = "LEFT";
    TextPosition[TextPosition["RIGHT"] = 2] = "RIGHT";
    TextPosition[TextPosition["TOP"] = 4] = "TOP";
    TextPosition[TextPosition["BOTTOM"] = 8] = "BOTTOM"; // 1000
    // All = ~(~0 << 4)
})(TextPosition || (TextPosition = {}));
export class Utils {
    constructor() {
        this._sortDict = new Map([
            [TextPosition.LEFT | TextPosition.TOP, 1],
            [TextPosition.RIGHT | TextPosition.TOP, 2],
            [TextPosition.RIGHT | TextPosition.BOTTOM, 3],
            [TextPosition.LEFT | TextPosition.BOTTOM, 4]
        ]);
        this._initDict = new Map([
            [TextPosition.LEFT | TextPosition.TOP, [(_, __) => 0, (_, __) => 0]],
            [TextPosition.RIGHT | TextPosition.TOP, [(r, __) => r.Width, (_, __) => 0]],
            [TextPosition.RIGHT | TextPosition.BOTTOM, [(r, __) => r.Width, (r, p) => r.Height - p.Margin]],
            [TextPosition.LEFT | TextPosition.BOTTOM, [(_, __) => 0, (r, p) => r.Height - p.Margin]]
        ]);
    }
    GetInitialX(position, canvasArea, printer) {
        var _a;
        let x = (_a = this._initDict.get(position)) === null || _a === void 0 ? void 0 : _a[0](canvasArea, printer);
        if (x === undefined) {
            throw new Error("Could not get X");
        }
        return x;
    }
    GetInitialY(position, canvasArea, printer) {
        var _a;
        let y = (_a = this._initDict.get(position)) === null || _a === void 0 ? void 0 : _a[1](canvasArea, printer);
        if (y === undefined) {
            throw new Error("Could not get X");
        }
        return y;
    }
    GroupBy(list, getKey) {
        const map = new Map();
        list.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return Array.from(map.values());
    }
    Compare(a, b) {
        let aValue = this._sortDict.get(a.Position);
        let bValue = this._sortDict.get(b.Position);
        if (!aValue || !bValue) {
            throw new Error("One of Print Components has incorrect Position");
        }
        if (aValue < bValue) {
            return -1;
        }
        if (aValue > bValue) {
            return 1;
        }
        return 0;
    }
    GetX(lastX, componentPosition, onNewLine, canvasArea, textSize, margin) {
        if ((componentPosition & TextPosition.LEFT) === TextPosition.LEFT) {
            return onNewLine ? margin : lastX + textSize.Width + margin;
        }
        else if ((componentPosition & TextPosition.RIGHT) === TextPosition.RIGHT) {
            return onNewLine ? canvasArea.Width - margin : lastX - textSize.Width - margin;
        }
        else {
            throw new Error("Text position should be either LEFT or RIGHT");
        }
    }
    GetY(lastY, componentPosition, onNewLine, textSize, margin) {
        if ((componentPosition & TextPosition.TOP) === TextPosition.TOP) {
            return onNewLine ? lastY + textSize.Height + margin : lastY;
        }
        else if ((componentPosition & TextPosition.BOTTOM) === TextPosition.BOTTOM) {
            return onNewLine ? lastY - textSize.Height - margin : lastY;
        }
        else {
            throw new Error("Text position should be either TOP or BOTTOM");
        }
    }
    GetPositioning(position) {
        let positioning = TextPositioning.UNDEFINED;
        if ((position & TextPosition.LEFT) === TextPosition.LEFT) {
            positioning += TextPositioning.RIGHT;
        }
        else if ((position & TextPosition.RIGHT) === TextPosition.RIGHT) {
            positioning += TextPositioning.LEFT;
        }
        else {
            throw new Error("Text position should be either LEFT or RIGHT");
        }
        if ((position & TextPosition.TOP) === TextPosition.TOP) {
            positioning += TextPositioning.BELOW;
        }
        else if ((position & TextPosition.BOTTOM) === TextPosition.BOTTOM) {
            positioning += TextPositioning.ABOVE;
        }
        else {
            throw new Error("Text position should be either TOP or BOTTOM");
        }
        return positioning;
    }
}
