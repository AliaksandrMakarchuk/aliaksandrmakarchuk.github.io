import { Block } from './Block';
import { BlockColor } from './BlockColor';
import { Direction } from './Direction';

export class Snake {
    private _head: Block
    private _speed: number;
    private _blockSize: number;
    private _length: number;

    constructor(x: number, y: number, speed: number) {
        this._head = new Block(x, y, speed);
        this._head.UpdateColor(BlockColor.Snake);
        this._blockSize = speed;
        this._speed = speed;
        this._length = 1;
    }

    public Move(): void {
        this._head.Move(this._speed);
        this._head.UpdateDirections();
    }

    public ChangeDirection(direction: Direction): void {
        this._head.ChangeDirection(direction);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        this._head.Draw(context);

        var tail = this._head.Next;
        while (tail != null) {
            tail.Draw(context);
            tail = tail.Next;
        }
    }

    public Eat(block: Block): void {
        let tail = this._head;

        while (tail.Next != null) {
            tail = tail.Next;
        }

        this._length += 1;

        tail.Next = block;
        tail.Next.UpdateCoords(tail);
        tail.InitializeDirectionTo(tail.Next);
        tail.Next.UpdateColor(BlockColor.Snake);
    }

    public CheckSelfEating(): boolean {
        var block = this._head.Next;

        while (block != null) {
            if (this._head.HasCollision(block)) {
                return true;
            }
            block = block.Next;
        }

        return false;
    }

    public IsOutOfBoundaries(width: number, height: number): boolean {
        return this._head.X < 0
            || this._head.Y < 0
            || this._head.X + this._blockSize > width
            || this._head.Y + this._blockSize > height;
    }

    public GetLength(): number {
        return this._length;
    }

    public GetX(): number {
        return this._head.X;
    }

    public GetY(): number {
        return this._head.Y;
    }
}