define(["require", "exports", "./Colors", "./Engine/Position"], function (require, exports, Colors_1, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Block = void 0;
    var Block = /** @class */ (function () {
        function Block(size, padding, coords) {
            this.Coords = coords !== null && coords !== void 0 ? coords : new Position_1.Position(0, 0);
            this._size = size;
            this._color = Colors_1.Colors.Player;
            this._padding = padding;
            this.IsActive = true;
        }
        Object.defineProperty(Block.prototype, "Size", {
            get: function () {
                return this._size;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "Color", {
            get: function () {
                return this._color;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "Padding", {
            get: function () {
                return this._padding;
            },
            enumerable: false,
            configurable: true
        });
        return Block;
    }());
    exports.Block = Block;
});
