import { BlockColor } from './BlockColor';
import { BlockContext } from './BlockContext';
import { Direction } from './Direction';
import * as BlockState from './BlockState';
import { IPrototype } from './IPrototype';

export class Block implements IPrototype<Block> {
    public X: number;
    public Y: number;
    public Next: Block | undefined;

    private _color: BlockColor;
    private _blockContext: BlockContext;
    private _size: number;

    constructor(x: number, y: number, size: number) {
        this.X = x;
        this.Y = y;
        this._size = size;
        this._color = BlockColor.Free;
        this._blockContext = new BlockContext(new BlockState.EmptyState());
    }

    public Move(speed: number): void {
        this._blockContext.Move(speed, this);

        if (this.Next != undefined) {
            this.Next.Move(speed);
        }
    }

    public UpdateColor(color: BlockColor): void {
        this._color = color;
    }

    public ChangeDirection(direction: Direction): void {
        this._blockContext.UpdateState(direction);
    }

    public InitializeDirectionTo(tail: Block): void {
        this._blockContext.InitializeDirection(tail);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this._color.toString();
        context.beginPath();
        context.fillRect(this.X, this.Y, this._size, this._size);
        context.strokeStyle = 'B0C4DE';
        context.strokeRect(this.X, this.Y, this._size, this._size);
        context.fill();
    }

    public UpdateCoords(previousBlock: Block): void {
        var xIncrement = previousBlock._blockContext.GetNextTailXIncrement();
        var yIncrement = previousBlock._blockContext.GetNextTailYIncrement();

        this.X = previousBlock.X + this._size * xIncrement;
        this.Y = previousBlock.Y + this._size * yIncrement;
    }

    public HasCollision(block: Block): boolean {
        return this.X == block.X && this.Y == block.Y;
    }

    public UpdateDirections(): void {
        this.UpdateDirection(this);
    }

    public clone(): Block {
        return new Block(this.X, this.Y, this._size);
    }

    private UpdateDirection(block: Block): void {
        if (block.Next != null) {
            this.UpdateDirection(block.Next);
            block.Next.ChangeDirection(block._blockContext.GetDirection());
        }
    }
}