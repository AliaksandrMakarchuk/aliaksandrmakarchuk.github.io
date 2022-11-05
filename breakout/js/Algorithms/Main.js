import { Field } from '../Field.js';
import { Position } from '../Engine/Position.js';
import { Colors } from '../Colors.js';
import { Block } from '../Block.js';
import { Ball } from '../Ball.js';
import { Size } from '../Engine/Size.js';
window.onload = () => {
    const main = new Main(document, window);
    document.addEventListener("mousedown", e => main.HandleMouseDown(e), false);
    document.addEventListener("mouseup", () => main.HandleMouseUp(), false);
    document.addEventListener("mousemove", e => main.HandleMouseMove(e), false);
    main.Start();
};
export class Main {
    constructor(document, window) {
        this._canvas = document.getElementById("canvas");
        this._canvas.width = window.innerWidth - 20;
        this._canvas.height = window.innerHeight - 20;
        this._context = this._canvas.getContext("2d");
        this._field = new Field(this._canvas, this._context);
        this._requestId = undefined;
        this._ball = new Ball(50);
        this._block = new Block(new Size(100, 100), 0, new Position(this._canvas.width / 2, this._canvas.height / 2));
        // --- initialize ball position ---
        this._ball.Coords = new Position(this._canvas.width / 2, this._ball.Radius * 5);
        this._x = this._ball.Coords.X;
        this._y = this._ball.Coords.Y;
        this._closestPoint = this.FindClosestPoint();
    }
    get ShouldUpdate() {
        return this._requestId !== undefined;
    }
    Start() {
        // update
        this.UpdateState();
        // render
        this.Draw();
    }
    HandleMouseMove(event) {
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
    }
    HandleMouseDown(event) {
        if (!this.CanUpdateBallPosition(event.clientX, event.clientY)) {
            return;
        }
        this._requestId = requestAnimationFrame(this.Start.bind(this));
    }
    HandleMouseUp() {
        if (this._requestId !== undefined) {
            cancelAnimationFrame(this._requestId);
            this._requestId = undefined;
            return;
        }
    }
    CanUpdateBallPosition(clientX, clientY) {
        const distance = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, clientX, clientY);
        return distance < this._ball.Radius;
    }
    UpdateState() {
        this._closestPoint = this.FindClosestPoint();
        this.CheckCollision();
        this.UpdateBallPosition();
    }
    FindClosestPoint() {
        // check top-bottom
        if (this._ball.Coords.X >= this._block.Coords.X &&
            this._ball.Coords.X <= this._block.Coords.X + this._block.Size.Width) {
            // // tslint:disable-next-line:no-console
            // console.log('In Top-Bottom');
            // identify Top or Bottom
            if (this._ball.Coords.Y < this._block.Coords.Y) {
                // tslint:disable-next-line:no-console
                console.log('In Top');
                return new Position(this._ball.Coords.X, this._block.Coords.Y);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log('In Bottom');
                return new Position(this._ball.Coords.X, this._block.Coords.Y + this._block.Size.Height);
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
                return new Position(this._block.Coords.X, this._ball.Coords.Y);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log('In Right');
                return new Position(this._block.Coords.X + this._block.Size.Width, this._ball.Coords.Y);
            }
        }
        // find closest corner
        const d1 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X, this._block.Coords.Y);
        const d2 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y);
        const d3 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X, this._block.Coords.Y + this._block.Size.Height);
        const d4 = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y + this._block.Size.Height);
        let distX = 0;
        let distY = 0;
        if (d1 < d2 && d1 < d3 && d1 < d4) {
            distX = Math.abs(this._ball.Coords.X - this._block.Coords.X);
            distY = Math.abs(this._ball.Coords.Y - this._block.Coords.Y);
            this.DefineCollisionSide(distX, distY, 'Collate Left', 'Collate Top');
            return new Position(this._block.Coords.X, this._block.Coords.Y);
        }
        if (d2 < d1 && d2 < d3 && d2 < d4) {
            distX = Math.abs(this._ball.Coords.X - (this._block.Coords.X + this._block.Size.Width));
            distY = Math.abs(this._ball.Coords.Y - this._block.Coords.Y);
            this.DefineCollisionSide(distX, distY, 'Collate Right', 'Collate Top');
            return new Position(this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y);
        }
        if (d3 < d1 && d3 < d2 && d3 < d4) {
            distX = Math.abs(this._ball.Coords.X - this._block.Coords.X);
            distY = Math.abs(this._ball.Coords.Y - (this._block.Coords.Y + this._block.Size.Height));
            this.DefineCollisionSide(distX, distY, 'Collate Left', 'Collate Bottom');
            return new Position(this._block.Coords.X, this._block.Coords.Y + this._block.Size.Height);
        }
        distX = Math.abs(this._ball.Coords.X - (this._block.Coords.X + this._block.Size.Width));
        distY = Math.abs(this._ball.Coords.Y - (this._block.Coords.Y + this._block.Size.Height));
        this.DefineCollisionSide(distX, distY, 'Collate Right', 'Collate Bottom');
        return new Position(this._block.Coords.X + this._block.Size.Width, this._block.Coords.Y + this._block.Size.Height);
    }
    DefineCollisionSide(distX, distY, ySideMessage, xSideMessage) {
        if (distY < distX) {
            // tslint:disable-next-line:no-console
            console.log(ySideMessage);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(xSideMessage);
        }
    }
    GetDistance(fromX, fromY, toX, toY) {
        return Math.sqrt(Math.pow(fromY - toY, 2) + Math.pow(fromX - toX, 2));
    }
    CheckCollision() {
        const distance = this.GetDistance(this._ball.Coords.X, this._ball.Coords.Y, this._closestPoint.X, this._closestPoint.Y);
        if (distance > this._ball.Radius) {
            return false;
        }
        return true;
    }
    UpdateBallPosition() {
        // const maxX = this._canvas.width - this._ball.Radius;
        // const maxY = this._canvas.height - this._ball.Radius;
        // const minX = this._ball.Radius;
        // const minY = this._ball.Radius;
        this._ball.Coords = new Position(this._x, this._y);
    }
    Draw() {
        this._field.Draw();
        this.PrintBlock(this._block, Colors.Brick);
        // --- print ball ---
        this.DrawBall();
        // ------------------
        if (!this.CheckCollision()) {
            this.DrawRouteToClosestPoint();
        }
        else {
            this.DrawCollision();
        }
    }
    DrawCollision() {
        // rect
        this._context.beginPath();
        this._context.strokeStyle = Colors.Red;
        this._context.rect(this._block.Coords.X, this._block.Coords.Y, this._block.Size.Width, this._block.Size.Height);
        this._context.stroke();
        this._context.closePath();
        // circle
        this._context.beginPath();
        this._context.strokeStyle = Colors.Red;
        this._context.arc(this._ball.Coords.X, this._ball.Coords.Y, this._ball.Radius, 0, Math.PI * 2, false);
        this._context.stroke();
        this._context.closePath();
    }
    DrawRouteToClosestPoint() {
        this._context.beginPath();
        this._context.strokeStyle = Colors.TraceToClosest;
        this._context.moveTo(this._ball.Coords.X, this._ball.Coords.Y);
        this._context.lineTo(this._closestPoint.X, this._closestPoint.Y);
        this._context.stroke();
        this._context.closePath();
    }
    DrawBall() {
        this._context.beginPath();
        this._context.fillStyle = Colors.Ball;
        this._context.arc(this._ball.Coords.X, this._ball.Coords.Y, this._ball.Radius, 0, Math.PI * 2, false);
        this._context.fill();
        this._context.closePath();
    }
    PrintBlock(block, color) {
        this._context.beginPath();
        this._context.fillStyle = color;
        this._context.fillRect(block.Coords.X, block.Coords.Y, block.Size.Width, block.Size.Height);
        this._context.fill();
        this._context.closePath();
    }
}
