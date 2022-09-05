export class GameVisibilityCheckersFactory {
    /**
     *
     */
    constructor(checkers) {
        this._checkers = checkers;
    }
    GenerateVisibilityCheckers() {
        return this._checkers;
    }
}
