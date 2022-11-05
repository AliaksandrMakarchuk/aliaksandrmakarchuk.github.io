define(["require", "exports", "./CollisionSide", "./Engine/Position"], function (require, exports, CollisionSide_1, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollisionHelper = void 0;
    var CollisionHelper = /** @class */ (function () {
        function CollisionHelper() {
        }
        CollisionHelper.CheckFieldCollision = function (ball, minWidth, maxWidth, minHeight, maxHeight) {
            if (ball.Coords.X + ball.Radius >= maxWidth) {
                return CollisionSide_1.CollisionSide.RIGHT;
            }
            if (ball.Coords.X - ball.Radius <= minWidth) {
                return CollisionSide_1.CollisionSide.LEFT;
            }
            if (ball.Coords.Y + ball.Radius >= maxHeight) {
                return CollisionSide_1.CollisionSide.BOTTOM;
            }
            if (ball.Coords.Y - ball.Radius <= minHeight) {
                return CollisionSide_1.CollisionSide.TOP;
            }
            return undefined;
        };
        CollisionHelper.CheckBlockCollision = function (block, ball) {
            var closestPoint = this.FindClosestPoint(block, ball);
            var distance = this.GetDistance(ball.Coords.X, ball.Coords.Y, closestPoint[1].X, closestPoint[1].Y);
            return [closestPoint[0], distance, closestPoint[1]];
        };
        CollisionHelper.FindClosestPoint = function (block, ball) {
            // check top-bottom
            if (ball.Coords.X >= block.Coords.X &&
                ball.Coords.X <= block.Coords.X + block.Size.Width) {
                if (ball.Coords.Y < block.Coords.Y) {
                    return [CollisionSide_1.CollisionSide.TOP, new Position_1.Position(ball.Coords.X, block.Coords.Y)];
                }
                else {
                    return [CollisionSide_1.CollisionSide.BOTTOM, new Position_1.Position(ball.Coords.X, block.Coords.Y + block.Size.Height)];
                }
            }
            // check left-right
            if (ball.Coords.Y >= block.Coords.Y &&
                ball.Coords.Y <= block.Coords.Y + block.Size.Height) {
                if (ball.Coords.X < block.Coords.X) {
                    return [CollisionSide_1.CollisionSide.LEFT, new Position_1.Position(block.Coords.X, ball.Coords.Y)];
                }
                else {
                    return [CollisionSide_1.CollisionSide.RIGHT, new Position_1.Position(block.Coords.X + block.Size.Width, ball.Coords.Y)];
                }
            }
            // find closest corner
            var d1 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X, block.Coords.Y);
            var d2 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X + block.Size.Width, block.Coords.Y);
            var d3 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X, block.Coords.Y + block.Size.Height);
            var d4 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X + block.Size.Width, block.Coords.Y + block.Size.Height);
            var distX = 0;
            var distY = 0;
            var collisionSide = CollisionSide_1.CollisionSide.TOP;
            if (d1 < d2 && d1 < d3 && d1 < d4) {
                distX = Math.abs(ball.Coords.X - block.Coords.X);
                distY = Math.abs(ball.Coords.Y - block.Coords.Y);
                collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide_1.CollisionSide.LEFT, CollisionSide_1.CollisionSide.TOP);
                return [collisionSide, new Position_1.Position(block.Coords.X, block.Coords.Y)];
            }
            if (d2 < d1 && d2 < d3 && d2 < d4) {
                distX = Math.abs(ball.Coords.X - (block.Coords.X + block.Size.Width));
                distY = Math.abs(ball.Coords.Y - block.Coords.Y);
                collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide_1.CollisionSide.RIGHT, CollisionSide_1.CollisionSide.TOP);
                return [collisionSide, new Position_1.Position(block.Coords.X + block.Size.Width, block.Coords.Y)];
            }
            if (d3 < d1 && d3 < d2 && d3 < d4) {
                distX = Math.abs(ball.Coords.X - block.Coords.X);
                distY = Math.abs(ball.Coords.Y - (block.Coords.Y + block.Size.Height));
                collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide_1.CollisionSide.LEFT, CollisionSide_1.CollisionSide.BOTTOM);
                return [collisionSide, new Position_1.Position(block.Coords.X, block.Coords.Y + block.Size.Height)];
            }
            distX = Math.abs(ball.Coords.X - (block.Coords.X + block.Size.Width));
            distY = Math.abs(ball.Coords.Y - (block.Coords.Y + block.Size.Height));
            collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide_1.CollisionSide.RIGHT, CollisionSide_1.CollisionSide.BOTTOM);
            return [collisionSide, new Position_1.Position(block.Coords.X + block.Size.Width, block.Coords.Y + block.Size.Height)];
        };
        CollisionHelper.DefineCollisionSide = function (distX, distY, ySideMessage, xSideMessage) {
            if (distY < distX) {
                return ySideMessage;
            }
            else {
                return xSideMessage;
            }
        };
        CollisionHelper.GetDistance = function (fromX, fromY, toX, toY) {
            return Math.sqrt(Math.pow(fromY - toY, 2) + Math.pow(fromX - toX, 2));
        };
        return CollisionHelper;
    }());
    exports.CollisionHelper = CollisionHelper;
});
