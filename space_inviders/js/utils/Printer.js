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
class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
}
class TextSize {
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
    constructor(context, width, height, fpsCalculator, scoreCalculator, algorithm) {
        this._margin = 5;
        this._textFillStyle = "white";
        this._textFont = "16px arial";
        this._context = context;
        this._width = width;
        this._height = height;
        this._fpsCalculator = fpsCalculator;
        this._scoreCalculator = scoreCalculator;
        this._algorithm = algorithm;
    }
    PrintGameStop() {
        let pauseText = "GAME COMPLETE";
        this._context.fillStyle = '#66AADD';
        this._context.font = "60px serif";
        this._context.textBaseline = "middle";
        this._context.textAlign = "center";
        this._context.fillText(pauseText, this._width / 2, this._height / 2);
    }
    PrintPause() {
        let pauseText = "PAUSE";
        this._context.fillStyle = 'green';
        this._context.font = "54px serif";
        this._context.textBaseline = "middle";
        this._context.textAlign = "center";
        this._context.fillText(pauseText, this._width / 2, this._height / 2);
    }
    PrintInfo() {
        this._height = this._height;
        // let lastX: number = 0;
        let lastY = 0;
        // print time info
        let actualTextSize = this.PrintTimeInfo(0, 0, TextPositioning.RIGHT | TextPositioning.BELOW);
        lastY += actualTextSize.Height;
        // this.DrawBowAround(0, 0, actualTextSize);
        // print fps
        actualTextSize = this.PrintFps(0, lastY, TextPositioning.RIGHT | TextPositioning.BELOW);
        // this.DrawBowAround(0, lastY, actualTextSize);
        // print score
        lastY = 0;
        actualTextSize = this.PrintScore(this._width, 0, TextPositioning.LEFT | TextPositioning.BELOW);
        // this.DrawBowAround(this._width - actualTextSize.Width, 0, actualTextSize);
        // lastY += actualTextSize.Height;
        // actualTextSize = this.PrintScore(this._width, lastY, TextPositioning.LEFT | TextPositioning.BELOW);
        // this.DrawBowAround(this._width - actualTextSize.Width, lastY, actualTextSize);
        // lastY += actualTextSize.Height;
        // actualTextSize = this.PrintScore(this._width, lastY, TextPositioning.LEFT | TextPositioning.BELOW);
        // this.DrawBowAround(this._width - actualTextSize.Width, lastY, actualTextSize);
        // lastY += actualTextSize.Height;
        // actualTextSize = this.PrintScore(this._width, lastY, TextPositioning.LEFT | TextPositioning.BELOW);
        // this.DrawBowAround(this._width - actualTextSize.Width, lastY, actualTextSize);
        // lastY += actualTextSize.Height;
        // this.DrawBowAround(textSize.Width, textSize.Height, textSize);
        actualTextSize = this.PrintSpeed(this._width, actualTextSize.Height, TextPositioning.LEFT | TextPositioning.BELOW);
        actualTextSize = this.PrintTimeInfo(0, this._height, TextPositioning.RIGHT | TextPositioning.ABOVE);
        actualTextSize = this.PrintTimeInfo(0, this._height - actualTextSize.Height, TextPositioning.RIGHT | TextPositioning.ABOVE);
        actualTextSize = this.PrintTimeInfo(this._width, this._height, TextPositioning.LEFT | TextPositioning.ABOVE);
        actualTextSize = this.PrintTimeInfo(this._width, this._height - actualTextSize.Height, TextPositioning.LEFT | TextPositioning.ABOVE);
        actualTextSize = this.PrintTimeInfo(this._width - actualTextSize.Width, this._height - actualTextSize.Height, TextPositioning.LEFT | TextPositioning.ABOVE);
    }
    PrintTimeInfo(x, y, positioning) {
        let dateTime = new Date();
        let text = dateTime.toUTCString();
        return this.PrintText(x, y, text, positioning);
    }
    PrintFps(x, y, positioning) {
        let text = `${this._fpsCalculator.MostRepeatableFPS.toString()} FPS`;
        return this.PrintText(x, y, text, positioning);
    }
    PrintScore(x, y, positioning) {
        let text = `Score: ${this._scoreCalculator.Score}`;
        return this.PrintText(x, y, text, positioning);
    }
    PrintSpeed(x, y, positioning) {
        let text = `Speed: ${this._algorithm.GetCurrentSpeed()}`;
        return this.PrintText(x, y, text, positioning);
    }
    PrintText(x, y, text, positioning) {
        this._context.fillStyle = this._textFillStyle;
        this._context.font = this._textFont;
        this._context.textBaseline = this.GetTextBaseline(positioning);
        this._context.textAlign = this.GetTextAlign(positioning);
        let metrics = this._context.measureText(text);
        let baseDotCoordinates = this.GetBaseDotCoordinates(x, y, positioning);
        let actualOccupiedSize = this.GetOccupiedTextSize(x, y, metrics, baseDotCoordinates, positioning);
        this._context.fillText(text, baseDotCoordinates.x, baseDotCoordinates.y);
        return actualOccupiedSize;
    }
    GetTextAlign(positioning) {
        if ((positioning & TextPositioning.LEFT) === TextPositioning.LEFT) {
            return "right";
        }
        if ((positioning & TextPositioning.RIGHT) === TextPositioning.RIGHT) {
            return "left";
        }
        return "center";
    }
    GetTextBaseline(positioning) {
        if ((positioning & TextPositioning.ABOVE) === TextPositioning.ABOVE) {
            return "bottom";
        }
        if ((positioning & TextPositioning.BELOW) === TextPositioning.BELOW) {
            return "top";
        }
        return "middle";
    }
    GetOccupiedTextSize(x, y, metrics, baseDotCoordinates, positioning) {
        let actualWidth = 0;
        let actualHeight = 0;
        if ((positioning & TextPositioning.LEFT) === TextPositioning.LEFT) {
            actualWidth = x - baseDotCoordinates.x + metrics.actualBoundingBoxLeft;
        }
        else if ((positioning & TextPositioning.RIGHT) === TextPositioning.RIGHT) {
            actualWidth = x + baseDotCoordinates.x + metrics.actualBoundingBoxRight;
        }
        if ((positioning & TextPositioning.ABOVE) === TextPositioning.ABOVE) {
            actualHeight = y - baseDotCoordinates.y + metrics.actualBoundingBoxAscent;
        }
        else if ((positioning & TextPositioning.BELOW) === TextPositioning.BELOW) {
            actualHeight = baseDotCoordinates.y + metrics.actualBoundingBoxDescent - y;
        }
        return new TextSize(actualWidth, actualHeight);
    }
    GetBaseDotCoordinates(x, y, positioning) {
        let px = 0;
        let py = 0;
        if ((positioning & TextPositioning.LEFT) === TextPositioning.LEFT) {
            px = x - this._margin;
        }
        if ((positioning & TextPositioning.RIGHT) === TextPositioning.RIGHT) {
            px = x + this._margin;
        }
        if ((positioning & TextPositioning.ABOVE) === TextPositioning.ABOVE) {
            py = y - this._margin;
        }
        if ((positioning & TextPositioning.BELOW) === TextPositioning.BELOW) {
            py = y + this._margin;
        }
        return new Point(px, py);
    }
}
