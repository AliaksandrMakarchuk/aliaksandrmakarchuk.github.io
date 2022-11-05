import { CollisionSide } from './CollisionSide.js';
import { Position } from './Engine/Position.js';
export class CollisionHelper {
    static CheckFieldCollision(ball, minWidth, maxWidth, minHeight, maxHeight) {
        if (ball.Coords.X + ball.Radius >= maxWidth) {
            return CollisionSide.RIGHT;
        }
        if (ball.Coords.X - ball.Radius <= minWidth) {
            return CollisionSide.LEFT;
        }
        if (ball.Coords.Y + ball.Radius >= maxHeight) {
            return CollisionSide.BOTTOM;
        }
        if (ball.Coords.Y - ball.Radius <= minHeight) {
            return CollisionSide.TOP;
        }
        return undefined;
    }
    static CheckBlockCollision(block, ball) {
        const closestPoint = this.FindClosestPoint(block, ball);
        const distance = this.GetDistance(ball.Coords.X, ball.Coords.Y, closestPoint[1].X, closestPoint[1].Y);
        return [closestPoint[0], distance, closestPoint[1]];
    }
    static FindClosestPoint(block, ball) {
        // check top-bottom
        if (ball.Coords.X >= block.Coords.X &&
            ball.Coords.X <= block.Coords.X + block.Size.Width) {
            if (ball.Coords.Y < block.Coords.Y) {
                return [CollisionSide.TOP, new Position(ball.Coords.X, block.Coords.Y)];
            }
            else {
                return [CollisionSide.BOTTOM, new Position(ball.Coords.X, block.Coords.Y + block.Size.Height)];
            }
        }
        // check left-right
        if (ball.Coords.Y >= block.Coords.Y &&
            ball.Coords.Y <= block.Coords.Y + block.Size.Height) {
            if (ball.Coords.X < block.Coords.X) {
                return [CollisionSide.LEFT, new Position(block.Coords.X, ball.Coords.Y)];
            }
            else {
                return [CollisionSide.RIGHT, new Position(block.Coords.X + block.Size.Width, ball.Coords.Y)];
            }
        }
        // find closest corner
        const d1 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X, block.Coords.Y);
        const d2 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X + block.Size.Width, block.Coords.Y);
        const d3 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X, block.Coords.Y + block.Size.Height);
        const d4 = this.GetDistance(ball.Coords.X, ball.Coords.Y, block.Coords.X + block.Size.Width, block.Coords.Y + block.Size.Height);
        let distX = 0;
        let distY = 0;
        let collisionSide = CollisionSide.TOP;
        if (d1 < d2 && d1 < d3 && d1 < d4) {
            distX = Math.abs(ball.Coords.X - block.Coords.X);
            distY = Math.abs(ball.Coords.Y - block.Coords.Y);
            collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide.LEFT, CollisionSide.TOP);
            return [collisionSide, new Position(block.Coords.X, block.Coords.Y)];
        }
        if (d2 < d1 && d2 < d3 && d2 < d4) {
            distX = Math.abs(ball.Coords.X - (block.Coords.X + block.Size.Width));
            distY = Math.abs(ball.Coords.Y - block.Coords.Y);
            collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide.RIGHT, CollisionSide.TOP);
            return [collisionSide, new Position(block.Coords.X + block.Size.Width, block.Coords.Y)];
        }
        if (d3 < d1 && d3 < d2 && d3 < d4) {
            distX = Math.abs(ball.Coords.X - block.Coords.X);
            distY = Math.abs(ball.Coords.Y - (block.Coords.Y + block.Size.Height));
            collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide.LEFT, CollisionSide.BOTTOM);
            return [collisionSide, new Position(block.Coords.X, block.Coords.Y + block.Size.Height)];
        }
        distX = Math.abs(ball.Coords.X - (block.Coords.X + block.Size.Width));
        distY = Math.abs(ball.Coords.Y - (block.Coords.Y + block.Size.Height));
        collisionSide = this.DefineCollisionSide(distX, distY, CollisionSide.RIGHT, CollisionSide.BOTTOM);
        return [collisionSide, new Position(block.Coords.X + block.Size.Width, block.Coords.Y + block.Size.Height)];
    }
    static DefineCollisionSide(distX, distY, ySideMessage, xSideMessage) {
        if (distY < distX) {
            return ySideMessage;
        }
        else {
            return xSideMessage;
        }
    }
    static GetDistance(fromX, fromY, toX, toY) {
        return Math.sqrt(Math.pow(fromY - toY, 2) + Math.pow(fromX - toX, 2));
    }
}
