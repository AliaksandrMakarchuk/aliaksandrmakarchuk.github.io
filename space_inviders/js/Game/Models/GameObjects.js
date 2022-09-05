export class GameObjects {
    /**
     *
     */
    constructor(field, bots, ship) {
        this._field = field;
        this._bots = bots;
        this._cannon = ship;
        this._botBullets = [];
        this._shipBullets = [];
    }
    GetBots() {
        return this._bots;
    }
    GetCannon() {
        return this._cannon;
    }
    GetBotBullets() {
        return this._botBullets;
    }
    GetCannonBullets() {
        return this._shipBullets;
    }
    GetField() {
        return this._field;
    }
}
