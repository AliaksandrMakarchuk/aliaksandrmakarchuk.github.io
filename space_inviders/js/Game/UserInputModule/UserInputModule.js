import { Directions } from "../../Directions.js";
export class UserInputyModule {
    /**
     *
     */
    constructor(ship, shipBullets, audioModule, shipMoveComponent) {
        this._allowedGameKeyCodes = [
            'ArrowLeft',
            'ArrowRight',
            'KeyP',
            'Space'
        ];
        this._fireReleased = true;
        this._ship = ship;
        this._shipBullets = shipBullets;
        this._audioModule = audioModule;
        this._shipMoveComponent = shipMoveComponent;
    }
    HandleUserInputEvent(event, engine) {
        if (event.IsKeyUp) {
            this.HandleKeyUp(event.Event);
            return;
        }
        this.HandleKeyDown(event.Event, engine);
    }
    Fire() {
        if (!this._fireReleased || this._shipBullets.length > 0) {
            return;
        }
        this._audioModule.PlayShipFire();
        this._shipBullets.push(this._ship.Fire());
        this._fireReleased = false;
    }
    IsAllowedKey(key) {
        console.log(key);
        return this._allowedGameKeyCodes.indexOf(key) >= 0;
    }
    HandleKeyDown(e, engine) {
        if (this.IsAllowedKey(e.code)) {
            switch (e.code) {
                case 'ArrowLeft':
                    this._movement = Directions.LEFT;
                    this._shipMoveComponent.UpdateDirection(Directions.LEFT);
                    break;
                case 'ArrowRight':
                    this._movement = Directions.RIGHT;
                    this._shipMoveComponent.UpdateDirection(Directions.RIGHT);
                    break;
                case 'KeyP':
                    engine.TogglePause();
                    break;
                case 'Space':
                    this.Fire();
                    break;
            }
        }
    }
    HandleKeyUp(e) {
        if (this.IsAllowedKey(e.code)) {
            switch (e.code) {
                case 'ArrowLeft':
                    if (this._movement === Directions.LEFT) {
                        this._shipMoveComponent.UpdateDirection(null);
                    }
                    break;
                case 'ArrowRight':
                    if (this._movement === Directions.RIGHT) {
                        this._shipMoveComponent.UpdateDirection(null);
                    }
                    break;
                case 'Space':
                    this._fireReleased = true;
                    break;
            }
        }
    }
}
