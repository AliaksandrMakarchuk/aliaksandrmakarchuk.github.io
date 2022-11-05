define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Size = void 0;
    var Size = /** @class */ (function () {
        function Size(width, height) {
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Size.prototype, "Width", {
            get: function () {
                return this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Size.prototype, "Height", {
            get: function () {
                return this._height;
            },
            enumerable: false,
            configurable: true
        });
        return Size;
    }());
    exports.Size = Size;
});
