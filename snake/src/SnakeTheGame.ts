import { Direction } from './Direction';
import { Field } from './Field';
import { Snake } from './Snake';
import { Block } from './Block';

/**
 * uncomment for gulp task
 */
window.onload = () => {
    let game: SnakeTheGame = new SnakeTheGame(document, 500, 500);

    document.addEventListener('keydown', (e) => game.HandleKeyDown(e));

    game.Start();
    console.log("Document loaded. Game started");
}

export class SnakeTheGame {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _field: Field | undefined;
    private _snake: Snake | undefined;
    private _emptyBlock: Block | undefined;
    private _gridCellSize: number;
    private _timerId: number | undefined;
    private _isAllowChangeDirection: boolean | undefined;
    private _gameSpeed: number;
    private _isPause: boolean;

    private _gameKeyCodes: string[] = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'KeyP'
    ];

    constructor(document: Document, width: number, height: number) {
        this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._canvas.width = width;
        this._canvas.height = height;

        this._context = <CanvasRenderingContext2D>this._canvas.getContext("2d");

        this._gridCellSize = 20;
        this._gameSpeed = 1;
        this._isPause = false;
    }

    public Start(): void {
        this._field = new Field(this._canvas, this._context);
        this._snake = new Snake(20, 20, this._gridCellSize);
        this._snake.ChangeDirection(Direction.Right);
        this._field.Draw();
        this._snake.Draw(this._context);

        this.GenerateEmptyBlock();
        
        if (this._emptyBlock) {
            this._emptyBlock.Draw(this._context);
        }

        this._timerId = setInterval(() => this.Move(), this.GetCurrentTimeInterval());
    }

    public PlayOrPause(): void {
        if (this._isPause) {
            this._timerId = setInterval(() => this.Move(), this.GetCurrentTimeInterval());
            this._isPause = false;
            return;
        }

        this._context.fillText("PAUSE", this._canvas.width / 2 - 30, this._canvas.height / 2);
        clearInterval(this._timerId);
        this._isPause = true;
    }

    public HandleKeyDown(event: KeyboardEvent): void {
        if (this.IsAllowedKey(event.code)) {
            switch (event.code) {
                case 'ArrowLeft':
                    this.ChangeDirection(Direction.Left);
                    break;
                case 'ArrowRight':
                    this.ChangeDirection(Direction.Right);
                    break;
                case 'ArrowUp':
                    this.ChangeDirection(Direction.Up);
                    break;
                case 'ArrowDown':
                    this.ChangeDirection(Direction.Down);
                    break;
                case 'KeyP':
                    this.PlayOrPause();
                    break;
            }
        }
    }

    private IsAllowedKey(key: string) {
        return this._gameKeyCodes.indexOf(key) >= 0;
    }

    private ChangeDirection(direction: Direction): void {
        if (this._isAllowChangeDirection) {
            this._isAllowChangeDirection = false;
            if (this._snake) {
                this._snake.ChangeDirection(direction);
            }
        }
    }

    private Move(): void {
        if (this._snake) {
            this._snake.Move();
        }
        this.CheckCollision();

        if (this._field) {
            this._field.Draw();
        }
        if (this._snake) {
            this._snake.Draw(this._context);
        }
        if (this._emptyBlock) {
            this._emptyBlock.Draw(this._context);
        }
        this._isAllowChangeDirection = true;
        this.PrintGameDetails();

        if (!this.CheckCanFinishGame()) {
            return;
        }

        this.EndGame();
    }

    private CheckCollision(): void {
        if (this._snake && this._emptyBlock && this._snake.GetX() == this._emptyBlock.X
            && this._snake.GetY() == this._emptyBlock.Y) {
            this._snake.Eat(this._emptyBlock);
            this.TryUpdateGameSpeed();

            this.GenerateEmptyBlock();
        }
    }

    private CheckCanFinishGame(): boolean {
        return this._snake != undefined && (this._snake.CheckSelfEating()
            || this._snake.IsOutOfBoundaries(this._canvas.width, this._canvas.height));
    }

    private EndGame(): void {
        clearInterval(this._timerId);
        this._context.font = "40pt Calibri";
        this._context.fillText("Game Over", 100, 100);
    }

    private PrintGameDetails(): void {
        this._context.font = "15pt Calibri";
        this._context.fillText("Score: " + (this._snake != undefined ? this._snake.GetLength() : 0), this._canvas.width - 100, 30);
        this._context.fillText("Speed: " + this._gameSpeed, this._canvas.width - 100, 60);
    }

    private GenerateEmptyBlock(): void {
        let randX = this.GetEmptyBlockPosition(this._canvas.width, this._gridCellSize);
        let randY = this.GetEmptyBlockPosition(this._canvas.height, this._gridCellSize);

        this._emptyBlock = new Block(randX, randY, this._gridCellSize);
    }

    private GetEmptyBlockPosition(boundary: number, blockSize: number): number {
        let randomValue = Math.floor(Math.random() * boundary);
        let mod = randomValue % blockSize;

        if (mod > 0) {
            randomValue += blockSize - mod;
        }

        if (randomValue >= boundary) {
            randomValue = boundary - blockSize;
        }

        return randomValue;
    }

    private TryUpdateGameSpeed(): void {
        if (this._snake && this._snake.GetLength() % 20 == 0) {
            this._gameSpeed += 1;
            clearInterval(this._timerId);
            this._timerId = setInterval(() => this.Move(), this.GetCurrentTimeInterval());
        }
    }

    private GetCurrentTimeInterval(): number {
        var timeInterval = 200 - this._gameSpeed * 20;
        if (timeInterval < 0) {
            timeInterval = 0;
        }
        return timeInterval;
    }
}