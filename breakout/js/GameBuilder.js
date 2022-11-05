import { Ball } from './Ball.js';
import { Block } from './Block.js';
import { Position } from './Engine/Position.js';
import { Size } from './Engine/Size.js';
export class GameBuilder {
    constructor(wallPadding, fieldSize) {
        this._ball = undefined;
        this._player = undefined;
        this._wall = undefined;
        this._wallPadding = wallPadding;
        this._fieldSize = fieldSize;
    }
    get Ball() {
        if (this._ball === undefined) {
            throw new Error('Initialization not completed. Add the ball');
        }
        return this._ball;
    }
    get Player() {
        if (this._player === undefined) {
            throw new Error('Initialization not completed. Add the player');
        }
        return this._player;
    }
    get Wall() {
        if (this._wall === undefined) {
            throw new Error('Initialization not completed. Add the wall');
        }
        return this._wall;
    }
    AddBall(radius) {
        const y = this._fieldSize.Height - this.Player.Size.Height * 2;
        this._ball = new Ball(radius);
        this._ball.Coords = new Position(this._fieldSize.Width / 2, y - this._ball.Radius * 5);
        return this;
    }
    AddPlayer(width, height, padding) {
        const x = (this._fieldSize.Width / 2);
        const y = this._fieldSize.Height - height;
        this._player = new Block(new Size(width, height), padding);
        this._player.Coords = new Position(x, y);
        return this;
    }
    AddWall(fieldWidth, rows, blockWidth, blockHeight) {
        const widthBlockNumber = Math.floor(fieldWidth / (blockWidth + this._wallPadding));
        const leftWidth = fieldWidth - (widthBlockNumber * (blockWidth + this._wallPadding) - this._wallPadding);
        this._wall = new Array();
        for (let row = 0; row < rows; row++) {
            const posY = row * (blockHeight + this._wallPadding) + this._wallPadding;
            for (let col = 0; col < widthBlockNumber; col++) {
                // create wall block
                const posX = col * (blockWidth + this._wallPadding) + (leftWidth / 2);
                this._wall.push(new Block(new Size(blockWidth, blockHeight), this._wallPadding, new Position(posX, posY)));
            }
        }
        return this;
    }
    Build() {
        if (this._ball === undefined || this._player === undefined || this._wall === undefined) {
            throw new Error('Initialization not completed');
        }
    }
}
