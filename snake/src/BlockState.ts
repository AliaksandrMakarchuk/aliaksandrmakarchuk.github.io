import { Block } from './Block';

export interface BlockState {
    move(speed: number, block: Block): void;
}

export class MoveUpState implements BlockState {
    public move(speed: number, block: Block): void {
        block.Y -= speed;
    }
}

export class MoveRightState implements BlockState {
    public move(speed: number, block: Block): void {
        block.X += speed;
    }
}

export class MoveDownState implements BlockState {
    public move(speed: number, block: Block): void {
        block.Y += speed;
    }
}

export class MoveLeftState implements BlockState {
    public move(speed: number, block: Block): void {
        block.X -= speed;
    }
}

export class EmptyState implements BlockState {
    private _speed: number | undefined;
    private _block: Block | undefined;

    public move(speed: number, block: Block): void {
        this._speed = speed;
        this._block = block.clone();

        this._block.X = this._speed;
    }
}