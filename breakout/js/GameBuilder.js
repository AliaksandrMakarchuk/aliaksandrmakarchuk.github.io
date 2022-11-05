define(["require", "exports", "./Ball", "./Block", "./Engine/Position", "./Engine/Size"], function (require, exports, Ball_1, Block_1, Position_1, Size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameBuilder = void 0;
    var GameBuilder = /** @class */ (function () {
        function GameBuilder(wallPadding, fieldSize) {
            this._ball = undefined;
            this._player = undefined;
            this._wall = undefined;
            this._wallPadding = wallPadding;
            this._fieldSize = fieldSize;
        }
        Object.defineProperty(GameBuilder.prototype, "Ball", {
            get: function () {
                if (this._ball === undefined) {
                    throw new Error('Initialization not completed. Add the ball');
                }
                return this._ball;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameBuilder.prototype, "Player", {
            get: function () {
                if (this._player === undefined) {
                    throw new Error('Initialization not completed. Add the player');
                }
                return this._player;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameBuilder.prototype, "Wall", {
            get: function () {
                if (this._wall === undefined) {
                    throw new Error('Initialization not completed. Add the wall');
                }
                return this._wall;
            },
            enumerable: false,
            configurable: true
        });
        GameBuilder.prototype.AddBall = function (radius) {
            var y = this._fieldSize.Height - this.Player.Size.Height * 2;
            this._ball = new Ball_1.Ball(radius);
            this._ball.Coords = new Position_1.Position(this._fieldSize.Width / 2, y - this._ball.Radius * 5);
            return this;
        };
        GameBuilder.prototype.AddPlayer = function (width, height, padding) {
            var x = (this._fieldSize.Width / 2);
            var y = this._fieldSize.Height - height;
            this._player = new Block_1.Block(new Size_1.Size(width, height), padding);
            this._player.Coords = new Position_1.Position(x, y);
            return this;
        };
        GameBuilder.prototype.AddWall = function (fieldWidth, rows, blockWidth, blockHeight) {
            var widthBlockNumber = Math.floor(fieldWidth / (blockWidth + this._wallPadding));
            var leftWidth = fieldWidth - (widthBlockNumber * (blockWidth + this._wallPadding) - this._wallPadding);
            this._wall = new Array();
            for (var row = 0; row < rows; row++) {
                var posY = row * (blockHeight + this._wallPadding) + this._wallPadding;
                for (var col = 0; col < widthBlockNumber; col++) {
                    // create wall block
                    var posX = col * (blockWidth + this._wallPadding) + (leftWidth / 2);
                    this._wall.push(new Block_1.Block(new Size_1.Size(blockWidth, blockHeight), this._wallPadding, new Position_1.Position(posX, posY)));
                }
            }
            return this;
        };
        GameBuilder.prototype.Build = function () {
            if (this._ball === undefined || this._player === undefined || this._wall === undefined) {
                throw new Error('Initialization not completed');
            }
        };
        return GameBuilder;
    }());
    exports.GameBuilder = GameBuilder;
});
