export class BulletsMoveComponent {
    /**
     *
     */
    constructor(movementDirection, bulletsGetter) {
        this._direction = movementDirection;
        this._bulletsGetter = bulletsGetter;
    }
    CheckMovementState(_gameObjects, _secondsPassed) { }
    GetCorrespondingObject(gameObjects) {
        return this._bulletsGetter(gameObjects);
    }
    Move(gameObject, secondsPassed) {
        if (secondsPassed > 0.1) {
            return;
        }
        gameObject.forEach(b => this.MoveBullet(b, secondsPassed));
    }
    MoveBullet(bullet, secondsPassed) {
        bullet.Move(secondsPassed, this._direction);
    }
}
