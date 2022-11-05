define(["require", "exports", "./Colors"], function (require, exports, Colors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Field = void 0;
    var Field = /** @class */ (function () {
        function Field(canvas, context) {
            this._canvas = canvas;
            this._context = context;
        }
        Field.prototype.Draw = function () {
            this._context.beginPath();
            this._context.fillStyle = Colors_1.Colors.Field;
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.fill();
            this._context.closePath();
        };
        return Field;
    }());
    exports.Field = Field;
});
