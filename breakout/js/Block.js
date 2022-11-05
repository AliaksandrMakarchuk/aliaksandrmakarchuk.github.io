import { Colors } from "./Colors.js";
import { Position } from "./Engine/Position.js";
export class Block {
    constructor(size, padding, coords) {
        this.Coords = coords !== null && coords !== void 0 ? coords : new Position(0, 0);
        this._size = size;
        this._color = Colors.Player;
        this._padding = padding;
        this.IsActive = true;
    }
    get Size() {
        return this._size;
    }
    get Color() {
        return this._color;
    }
    get Padding() {
        return this._padding;
    }
}
