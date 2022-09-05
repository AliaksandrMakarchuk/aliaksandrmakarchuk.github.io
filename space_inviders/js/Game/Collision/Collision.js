export class Collision {
    /**
     * Creates a Collision
     */
    constructor(bullet, gameObject) {
        this._bullet = bullet;
        this._gameObject = gameObject;
    }
    get Bullet() {
        return this._bullet;
    }
    get GameObject() {
        return this._gameObject;
    }
}
