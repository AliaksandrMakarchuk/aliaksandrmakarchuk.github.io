export class GameObjects {
    /**
     *
     */
    constructor(field, bots, ship, botBullets, shipBullets) {
        this._field = field;
        this._bots = bots;
        this._ship = ship;
        this._botBullets = botBullets;
        this._shipBullets = shipBullets;
        this._helpBots = [];
    }
    GetBots() {
        return this._bots;
    }
    GetShips() {
        return [this._ship];
    }
    GetBotBullets() {
        return this._botBullets;
    }
    GetShipBullets() {
        return this._shipBullets;
    }
    GetField() {
        return this._field;
    }
    GetHelpBots() {
        return this._helpBots;
    }
    GetGameObjects() {
        return this._bots.map(x => x)
            .concat(this._ship)
            .concat(this._botBullets)
            .concat(this._shipBullets)
            .concat(this._helpBots);
    }
}
