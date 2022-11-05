define(["require", "exports", "./CollisionHelper", "./Colors", "./Field", "./GameBuilder", "./Engine/Position", "./CollisionSide", "./Speed", "./Engine/Size"], function (require, exports, CollisionHelper_1, Colors_1, Field_1, GameBuilder_1, Position_1, CollisionSide_1, Speed_1, Size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    // window.onload = () => {
    //     const game: Game = new Game(document, window);
    //     console.log('The Game created')
    //     document.addEventListener("keydown", e => game.HandleKeyDown(e), false);
    //     document.addEventListener("keyup", e => game.HandleKeyUp(e), false);
    //     game.Start(false);
    // }
    var Game = /** @class */ (function () {
        function Game(document, window) {
            this._requestId = undefined;
            this._pressedRight = false;
            this._pressedLeft = false;
            this._collatedX = false;
            this._collatedY = false;
            // private _closestPoint: Position;
            this._prevDistance = Number.MAX_VALUE;
            this._minDistance = Number.MAX_VALUE;
            this._canvas = document.getElementById('canvas');
            this._canvas.width = window.innerWidth - 20;
            this._canvas.height = window.innerHeight - 20;
            this._context = this._canvas.getContext('2d');
            this._field = new Field_1.Field(this._canvas, this._context);
            this._speed = 3;
            this._ballSpeed = new Speed_1.Speed(this._speed, this._speed, Speed_1.SpeedCoefficient.FORWARD, Speed_1.SpeedCoefficient.FORWARD);
            var builder = new GameBuilder_1.GameBuilder(3, new Size_1.Size(this._canvas.width, this._canvas.height));
            builder.AddPlayer(120, 20, 1)
                .AddBall(4)
                .AddWall(this._canvas.width, 5, 40, 20)
                .Build();
            this._ball = builder.Ball;
            this._player = builder.Player;
            this._wall = builder.Wall;
            // this._closestPoint = new Position(0, 0);
            this.ConfigureKeyHandlers(document);
        }
        Game.prototype.ConfigureKeyHandlers = function (document) {
            document.addEventListener('keydown', function (e) { return game.HandleKeyDown(e); }, false);
            document.addEventListener('keyup', function (e) { return game.HandleKeyUp(e); }, false);
        };
        Game.prototype.Start = function () {
            this.GameCycle(false);
        };
        Game.prototype.GameCycle = function (autoRequestNextFrame) {
            // update
            this.UpdateGameState();
            // render
            this.Draw();
            if (autoRequestNextFrame && this._requestId !== undefined) {
                this._requestId = requestAnimationFrame(this.GameCycle.bind(this, autoRequestNextFrame));
            }
        };
        Game.prototype.HandleKeyUp = function (event) {
            switch (event.code) {
                case 'KeyP':
                    this.TriggerPause();
                    return;
                case 'ArrowRight':
                    this._pressedRight = false;
                    return;
                case 'ArrowLeft':
                    this._pressedLeft = false;
                    return;
            }
        };
        Game.prototype.HandleKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowRight':
                    if (this._requestId) {
                        this._pressedRight = true;
                    }
                    return;
                case 'ArrowLeft':
                    if (this._requestId) {
                        this._pressedLeft = true;
                    }
                    return;
            }
        };
        Game.prototype.TriggerPause = function () {
            if (this._requestId !== undefined) {
                // tslint:disable-next-line:no-console
                console.log('Paused');
                cancelAnimationFrame(this._requestId);
                this._requestId = undefined;
                return;
            }
            // tslint:disable-next-line:no-console
            console.log('Unpaused');
            this._requestId = requestAnimationFrame(this.GameCycle.bind(this, true));
            return;
        };
        Game.prototype.UpdateGameState = function () {
            this.UpdateCollision();
            this.UpdatePlayerPosition();
            this.UpdateBallPosition();
        };
        Game.prototype.UpdatePlayerPosition = function () {
            if (this._pressedRight) {
                var limitX = this._canvas.width - this._player.Size.Width;
                if (this._player.Coords.X + this._speed <= limitX) {
                    this._player.Coords = new Position_1.Position(this._player.Coords.X + 10, this._player.Coords.Y);
                }
                else {
                    this._player.Coords = new Position_1.Position(limitX, this._player.Coords.Y);
                }
            }
            else if (this._pressedLeft) {
                if (this._player.Coords.X - this._speed >= 0) {
                    this._player.Coords = new Position_1.Position(this._player.Coords.X - 10, this._player.Coords.Y);
                }
                else {
                    this._player.Coords = new Position_1.Position(0, this._player.Coords.Y);
                }
            }
        };
        Game.prototype.UpdateBallPosition = function () {
            var maxX = this._canvas.width - this._ball.Radius;
            var maxY = this._canvas.height - this._ball.Radius;
            var minX = this._ball.Radius;
            var minY = this._ball.Radius;
            this._ball.Coords = new Position_1.Position(this._ballSpeed.X > 0 ?
                Math.min(this._ball.Coords.X + this._ballSpeed.X, maxX) :
                Math.max(this._ball.Coords.X + this._ballSpeed.X, minX), this._ballSpeed.Y > 0 ?
                Math.min(this._ball.Coords.Y + this._ballSpeed.Y, maxY) :
                Math.max(this._ball.Coords.Y + this._ballSpeed.Y, minY));
        };
        Game.prototype.UpdateCollision = function () {
            var _this = this;
            this._prevDistance = Number.MAX_VALUE;
            this._minDistance = Number.MAX_VALUE;
            var collisionSide = CollisionHelper_1.CollisionHelper.CheckFieldCollision(this._ball, 0, this._canvas.width, 0, this._canvas.height);
            if (collisionSide !== undefined) {
                if (collisionSide === CollisionSide_1.CollisionSide.TOP) {
                    this._ballSpeed.ChangeYDirection();
                    return;
                }
                if (collisionSide === CollisionSide_1.CollisionSide.BOTTOM) {
                    this.StopGame();
                    return;
                }
                if (collisionSide === CollisionSide_1.CollisionSide.LEFT || collisionSide === CollisionSide_1.CollisionSide.RIGHT) {
                    this._ballSpeed.ChangeXDirection();
                    return;
                }
            }
            var hasCollated = this.HasCollated(this._player);
            if (hasCollated) {
                return;
            }
            this._prevDistance = Number.MAX_VALUE;
            this._minDistance = Number.MAX_VALUE;
            this._collatedX = false;
            this._collatedY = false;
            // let killedCount: number = 0;
            this._wall.forEach(function (block) {
                if (!block.IsActive) {
                    return;
                }
                hasCollated = _this.HasCollated(block);
                if (hasCollated) {
                    block.IsActive = false;
                    // killedCount++;
                }
            });
            // pause when collate with block
            // if (killedCount > 0) {
            //   this.TriggerPause();
            // }
            // if (this._minDistance < 100) {
            //   this._ballSpeed.Set(1);
            // } else {
            //   this._ballSpeed.Set(this._speed);
            // }
        };
        Game.prototype.HasCollated = function (block) {
            var collision = CollisionHelper_1.CollisionHelper.CheckBlockCollision(block, this._ball);
            this._minDistance = Math.min(this._minDistance, collision[1]);
            if (collision[1] > this._ball.Radius) {
                if (collision[1] - this._ball.Radius < this._ballSpeed.X) {
                    this._ballSpeed.Set(Math.ceil(collision[1] - this._ball.Radius));
                    // tslint:disable-next-line:no-console
                    console.log("Corrected from ".concat(collision[1], " to ").concat(this._ballSpeed));
                }
                else {
                    this._ballSpeed.Set(this._speed);
                }
                if (collision[1] < this._prevDistance) {
                    this._prevDistance = collision[1];
                    // this._closestPoint = collision[2];
                }
                return false;
            }
            if (collision[0] === CollisionSide_1.CollisionSide.TOP || collision[0] === CollisionSide_1.CollisionSide.BOTTOM) {
                if (!this._collatedY) {
                    this._ballSpeed.ChangeYDirection();
                    this._collatedY = true;
                }
            }
            else {
                if (!this._collatedX) {
                    this._ballSpeed.ChangeXDirection();
                    this._collatedX = true;
                }
            }
            return true;
        };
        Game.prototype.Draw = function () {
            var _this = this;
            this._field.Draw();
            // --- print wall ---
            this._wall.forEach(function (block) {
                if (block.IsActive) {
                    _this.PrintBlock(block, Colors_1.Colors.Brick);
                }
            });
            // ------------------
            // --- print player ---
            this.PrintBlock(this._player, Colors_1.Colors.Player);
            // --------------------
            // --- print ball ---
            this._context.beginPath();
            this._context.fillStyle = Colors_1.Colors.Ball;
            this._context.arc(this._ball.Coords.X, this._ball.Coords.Y, this._ball.Radius, 0, Math.PI * 2, false);
            this._context.fill();
            this._context.closePath();
            // ------------------
            // this.DrawRouteToClosestPoint();
        };
        Game.prototype.PrintBlock = function (block, color) {
            this._context.beginPath();
            this._context.fillStyle = color;
            this._context.fillRect(block.Coords.X, block.Coords.Y, block.Size.Width, block.Size.Height);
            this._context.fill();
            this._context.closePath();
        };
        // private DrawRouteToClosestPoint(): void {
        //   this._context.beginPath();
        //   this._context.strokeStyle = Colors.TraceToClosest;
        //   this._context.moveTo(this._ball.Coords.X, this._ball.Coords.Y);
        //   this._context.lineTo(this._closestPoint.X, this._closestPoint.Y);
        //   this._context.stroke();
        //   this._context.closePath();
        // }
        Game.prototype.StopGame = function () {
            this.TriggerPause();
        };
        return Game;
    }());
    exports.Game = Game;
    var game = new Game(document, window);
    game.Start();
});
