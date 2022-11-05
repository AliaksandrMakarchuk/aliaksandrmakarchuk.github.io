export var TextPositioning;
(function (TextPositioning) {
    TextPositioning[TextPositioning["UNDEFINED"] = 0] = "UNDEFINED";
    TextPositioning[TextPositioning["LEFT"] = 1] = "LEFT";
    TextPositioning[TextPositioning["RIGHT"] = 2] = "RIGHT";
    TextPositioning[TextPositioning["ABOVE"] = 4] = "ABOVE";
    TextPositioning[TextPositioning["BELOW"] = 8] = "BELOW"; // 1000
    // All = ~(~0 << 4)
    // let traits = Traits.Mean | Traits.Funny; // (0010 | 0100) === 0110
    // if ((traits & Traits.Mean) === Traits.Mean) {
    //     console.log(":(");
    // }
})(TextPositioning || (TextPositioning = {}));
var Align;
(function (Align) {
    Align["Right"] = "right";
    Align["Left"] = "left";
    Align["Center"] = "center";
})(Align || (Align = {}));
var BaseLine;
(function (BaseLine) {
    BaseLine["Bottom"] = "bottom";
    BaseLine["Top"] = "top";
    BaseLine["Middle"] = "middle";
})(BaseLine || (BaseLine = {}));
export class TextSize {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
}
export class Printer {
    constructor(context, width, height) {
        this._defaultTextFillStyle = "white";
        this._defaultTextFont = "18px PixelFont";
        this._context = context;
        this._width = width;
        this._height = height;
    }
    get Margin() {
        return 5;
    }
    PrintGameStop() {
        let pauseText = "GAME OVER";
        this._context.fillStyle = '#66AADD';
        this._context.font = "72px PixelFont";
        this._context.textBaseline = BaseLine.Middle;
        this._context.textAlign = Align.Center;
        this._context.fillText(pauseText, this._width / 2, this._height / 2);
    }
    PrintPause() {
        let pauseText = "PAUSE";
        this._context.fillStyle = 'green';
        this._context.font = "60px PixelFont";
        this._context.textBaseline = BaseLine.Middle;
        this._context.textAlign = Align.Center;
        this._context.fillText(pauseText, this._width / 2, this._height / 2);
    }
    PrintText(x, y, text, positioning) {
        return this.PrintColoredText(x, y, text, positioning, this._defaultTextFillStyle, this._defaultTextFont);
    }
    PrintColoredText(x, y, text, positioning, textFillStyle, textFont) {
        this._context.fillStyle = textFillStyle === undefined ? this._defaultTextFillStyle : textFillStyle;
        this._context.font = textFont === undefined ? this._defaultTextFont : textFont;
        this._context.textBaseline = this.GetTextBaseline(positioning);
        this._context.textAlign = this.GetTextAlign(positioning);
        let metrics = this._context.measureText(text);
        let actualOccupiedSize = this.GetOccupiedTextSize(metrics, positioning);
        this._context.fillText(text, x, y);
        return actualOccupiedSize;
    }
    GetTextAlign(positioning) {
        if ((positioning & TextPositioning.LEFT) === TextPositioning.LEFT) {
            return Align.Right;
        }
        if ((positioning & TextPositioning.RIGHT) === TextPositioning.RIGHT) {
            return Align.Left;
        }
        return Align.Center;
    }
    GetTextBaseline(positioning) {
        if ((positioning & TextPositioning.ABOVE) === TextPositioning.ABOVE) {
            return BaseLine.Bottom;
        }
        if ((positioning & TextPositioning.BELOW) === TextPositioning.BELOW) {
            return BaseLine.Top;
        }
        return BaseLine.Middle;
    }
    GetOccupiedTextSize(metrics, positioning) {
        let actualWidth = 0;
        let actualHeight = 0;
        if ((positioning & TextPositioning.LEFT) === TextPositioning.LEFT) {
            actualWidth = metrics.actualBoundingBoxLeft;
        }
        else if ((positioning & TextPositioning.RIGHT) === TextPositioning.RIGHT) {
            actualWidth = metrics.actualBoundingBoxRight;
        }
        if ((positioning & TextPositioning.ABOVE) === TextPositioning.ABOVE) {
            actualHeight = metrics.actualBoundingBoxAscent;
        }
        else if ((positioning & TextPositioning.BELOW) === TextPositioning.BELOW) {
            actualHeight = metrics.actualBoundingBoxDescent;
        }
        return new TextSize(actualWidth, actualHeight);
    }
}
