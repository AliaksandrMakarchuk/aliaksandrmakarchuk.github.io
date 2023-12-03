import { Direction } from './Direction';
import { Block } from './Block';
import * as BlockState from './BlockState';

export class BlockContext {
    private _state: BlockState.BlockState;
    private _currentDirection: Direction;

    constructor(state: BlockState.BlockState) {
        this._state = state;
        this._currentDirection = Direction.Unknown;
    }

    public GetState(): BlockState.BlockState {
        return this._state;
    }

    public GetDirection(): Direction {
        return this._currentDirection;
    }

    public Move(speed: number, block: Block): void {
        this._state.move(speed, block);
    }

    public UpdateDirection(headState: BlockState.BlockState): void {
        this._state = headState;
    }

    public UpdateState(direction: Direction): void {
        if (this._currentDirection != Direction.Unknown &&
            (direction == this._currentDirection
            || (direction == Direction.Up && this._currentDirection == Direction.Down)
            || (direction == Direction.Left && this._currentDirection == Direction.Right)
            || (direction == Direction.Down && this._currentDirection == Direction.Up)
            || (direction == Direction.Right && this._currentDirection == Direction.Left))) {
            return;
        }

        switch (direction) {
            case Direction.Up:
                this.SetState(new BlockState.MoveUpState());
                break;
            case Direction.Right:
                this.SetState(new BlockState.MoveRightState());
                break;
            case Direction.Down:
                this.SetState(new BlockState.MoveDownState());
                break;
            case Direction.Left:
                this.SetState(new BlockState.MoveLeftState());
                break;
        }

        this._currentDirection = direction;
    }

    public InitializeDirection(block: Block): void {
        block.ChangeDirection(this._currentDirection);
    }

    public GetNextTailXIncrement(): number {
        switch (this._currentDirection) {
            case Direction.Up:
                return 0;
            case Direction.Right:
                return -1;
            case Direction.Down:
                return 0;
            case Direction.Left:
                return 1;
            default:
                return 0;
        }
    }

    public GetNextTailYIncrement(): number {
        switch (this._currentDirection) {
            case Direction.Up:
                return 1;
            case Direction.Right:
                return 0;
            case Direction.Down:
                return -1;
            case Direction.Left:
                return 0;
            default:
                return 0;
        }
    }

    private SetState(state: BlockState.BlockState): void {
        this._state = state;
    }
}