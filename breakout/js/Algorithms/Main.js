define(["require", "exports", "../Field", "../Engine/Position", "../Colors", "../Block", "../Ball", "../Engine/Size"], function (require, exports, Field_1, Position_1, Colors_1, Block_1, Ball_1, Size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Main = void 0;
    window.onload = function () {
        var main = new Main(document, window);
        document.addEventListener("mousedown", function (e) { return main.HandleMouseDown(e); }, false);
        document.addEventListener("mouseup", function () { return main.HandleMouseUp(); }, false);
        document.addEventListener("mousemove", function (e) { return main.HandleMouseMove(e); }, false);
        main.Start();
    };
    var Main = /** @class */ (function () {
        function Main(document, window) {
            this._canvas = document.getElementById("canvas");
            this._canvas.width = window.innerWidth - 20;
            this._canvas.height = window.innerHeight - 20;
            this._context = this._canvas.getContext("2d");
            this._field = new Field_1.Field(this._canvas, this._context);
            this._requestId = undefined;
            this._ball = new Ball_1.Ball(50);
            this._block = new Block_1.Block(new Size_1.Size(100, 100), 0, new Position_1.Position(this._canvas.width / 2, this._canvas.height / 2));
            // --- initialize ball position ---
            this._ball.Coords = new Position_1.Position(this._canvas.width / 2, this._ball.Radius * 5);
            this._x = this._ball.Coords.X;
            this._y = this._ball.Coords.Y;
            this._closestPoint = this.FindClosestPoint();
        }
        Object.defineProperty(Main.prototype, "ShouldUpdate", {
            get: function () {
                return this._requestId !== undefined;
            },
            enumerable: false,
            configurable: true
        });
        Main.prototype.Start = function () {
            // update
            this.UpdateState();
            // render
            this.Draw();
        };
        Main.prototype.HandleMouseMove = function (event) {
            if (!this.ShouldUpdate) {
                if (this._requestId !== undefined) {
                    cancelAnimationFrame(this._requestId);
                    this._requestId = undefined;
                    return;
                }
                return;
            }
            this._requestId = requestAnimationFrame(this.Start.bind(this));
            this._x = event.clientX;
            this._y = event.clientY;
        };
        Main.prototype.HandleMouseDown = function (event) {
            if (!this.CanUpdateBallPosition(event.clientX, event.clientY)) {
                return;
            }
            this._requestId = requestAnimationFrame(this.Start.bind(this));
        };
        Main.prototype.HandleMouseUp = function () {
            if (this._requestId !== undefined) {
                cancelAnimationFrame(this._requestId);
                this._requestId = undefined;
                return;
            }
        };
        Main.prototype.CanUpdateBallPosition = function (clientX, clientY) {
            var distance = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, clientX, clientY);
            return distance < this._ball.Radius;
        };
        Main.prototype.UpdateState = function () {
            this._closestPoint = this.FindClosestPoint();
            this.CheckCollision();
            this.UpdateBallPosition();
        };
        Main.prototype.FindClosestPoint = function () {
            // check top-bottom
            if (this._ball.Coords.X >= this._block.Coords.X &&
                this._ball.Coords.X <= this._block.Coords.X + this._block.Size.Width) {
                // // tslint:disable-next-line:no-console
                // console.log('In Top-Bottom');
                // identify Top or Bottom
                if (this._ball.Coords.Y < this._block.Coords.Y) {
                    // tslint:disable-next-line:no-console
                    console.log('In Top');
                    return new Position_1.Position(this._ball.Coords.X, this._block.Coords.Y);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log('In Bottom');
                    return new Position_1.Position(this._ball.Coords.X, this._block.Coords.Y + this._block.Size.Height);
                }
            }
            // check left-right
            if (this._ball.Coords.Y >= this._block.Coords.Y &&
                this._ball.Coords.Y <= this._block.Coords.Y + this._block.Size.Height) {
                // // tslint:disable-next-line:no-console
                // console.log('In Left-Right');
                // identify Left or Right
                if (this._ball.Coords.X < this._block.Coords.X) {
                    // tslint:disable-next-line:no-console
                    console.log('In Left');
                    return new Position_1.Position(this._block.Coords.X, this._ball.Coords.Y);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log('In Right');
                    return new Position_1.Position(this._block.Coords.X + this._block.Size.Width, this._ball.Coords.Y);
                }
            }
            // find closest corner
            var d1 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X, this._block.Coords.Y);
            var d2 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y);
            var d3 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X, this._block.Coords.Y + this._block.Size.Height);
            var d4 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y + this._block.Size.Height);
            var distX = 0;
            var distY = 0;
            if (d1 < d2 && d1 < d3 && d1 < d4) {
                distX = Math.abs(this._ball.Coords.X - this._block.Coords.X);
                distY = Math.abs(this._ball.Coords.Y - this._block.Coords.Y);
                this.DefineCollisionSide(distX, distY, 'Collate Left', 'Collate Top');
                return new Position_1.Position(this._block.Coords.X, this._block.Coords.Y);
            }
            if (d2 < d1 && d2 < d3 && d2 < d4) {
                distX = Math.abs(this._ball.Coords.X - (this._block.Coords.X + this._block.Size.Width));
                distY = Math.abs(this._ball.Coords.Y - this._block.Coords.Y);
                this.DefineCollisionSide(distX, distY, 'Collate Right', 'Collate Top');
                return new Position_1.Position(this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y);
            }
            if (d3 < d1 && d3 < d2 && d3 < d4) {
                distX = Math.abs(this._ball.Coords.X - this._block.Coords.X);
                distY = Math.abs(this._ball.Coords.Y - (this._block.Coords.Y + this._block.Size.Height));
                this.DefineCollisionSide(distX, distY, 'Collate Left', 'Collate Bottom');
                return new Position_1.Position(this._block.Coords.X, this._block.Coords.Y + this._block.Size.Height);
            }
            distX = Math.abs(this._ball.Coords.X - (this._block.Coords.X + this._block.Size.Width));
            distY = Math.abs(this._ball.Coords.Y - (this._block.Coords.Y + this._block.Size.Height));
            this.DefineCollisionSide(distX, distY, 'Collate Right', 'Collate Bottom');
            return new Position_1.Position(this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y + this._block.Size.Height);
        };
        Main.prototype.DefineCollisionSide = function (distX, distY, ySideMessage, xSideMessage) {
            if (distY < distX) {
                // tslint:disable-next-line:no-console
                console.log(ySideMessage);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log(xSideMessage);
            }
        };
        Main.prototype.GetDistance = function (fromX, fromY, toX, toY) {
            return Math.sqrt(Math.pow(fromY - toY, 2) + Math.pow(fromX - toX, 2));
        };
        Main.prototype.CheckCollision = function () {
            var distance = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._closestPoint.X, this._closestPoint.Y);
            if (distance > this._ball.Radius) {
                return false;
            }
            return true;
        };
        Main.prototype.UpdateBallPosition = function () {
            // const maxX = this._canvas.width - this._ball.Radius;
            // const maxY = this._canvas.height - this._ball.Radius;
            // const minX = this._ball.Radius;
            // const minY = this._ball.Radius;
            this._ball.Coords = new Position_1.Position(this._x, this._y);
        };
        Main.prototype.Draw = function () {
            this._field.Draw();
            this.PrintBlock(this._block, Colors_1.Colors.Brick);
            // --- print ball ---
            this.DrawBall();
            // ------------------
            if (!this.CheckCollision()) {
                this.DrawRouteToClosestPoint();
            }
            else {
                this.DrawCollision();
            }
        };
        Main.prototype.DrawCollision = function () {
            // rect
            this._context.beginPath();
            this._context.strokeStyle = Colors_1.Colors.Red;
            this._context.rect(this._block.Coords.X, this._block.Coords.Y, this._block.Size.Width, this._block.Size.Height);
            this._context.stroke();
            this._context.closePath();
            // circle
            this._context.beginPath();
            this._context.strokeStyle = Colors_1.Colors.Red;
            this._context.arc(this._ball.Coords.X, this._ball.Coords.Y, this._ball.Radius, 0, Math.PI * 2, false);
            this._context.stroke();
            this._context.closePath();
        };
        Main.prototype.DrawRouteToClosestPoint = function () {
            this._context.beginPath();
            this._context.strokeStyle = Colors_1.Colors.TraceToClosest;
            this._context.moveTo(this._ball.Coords.X, this._ball.Coords.Y);
            this._context.lineTo(this._closestPoint.X, this._closestPoint.Y);
            this._context.stroke();
            this._context.closePath();
        };
        Main.prototype.DrawBall = function () {
            this._context.beginPath();
            this._context.fillStyle = Colors_1.Colors.Ball;
            this._context.arc(this._ball.Coords.X, this._ball.Coords.Y, this._ball.Radius, 0, Math.PI * 2, false);
            this._context.fill();
            this._context.closePath();
        };
        Main.prototype.PrintBlock = function (block, color) {
            this._context.beginPath();
            this._context.fillStyle = color;
            this._context.fillRect(block.Coords.X, block.Coords.Y, block.Size.Width, block.Size.Height);
            this._context.fill();
            this._context.closePath();
        };
        return Main;
    }());
    exports.Main = Main;
});
