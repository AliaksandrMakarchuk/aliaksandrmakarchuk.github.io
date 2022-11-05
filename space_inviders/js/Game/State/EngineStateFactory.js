import { EngineInGameState } from "../../Engine/State/EngineStates/EngineInGameState.js";
import { EngineInMenuState } from "../../Engine/State/EngineStates/EngineInMenuState.js";
export class EngineStateFactory {
    /**
     *
     */
    constructor(userGameInputModel, userMenuInputModel) {
        this._userGameInputModel = userGameInputModel;
        this._userMenuInputModel = userMenuInputModel;
        this._userGameInputModel = this._userGameInputModel;
    }
    GetEngineState(state) {
        if (state === 0) {
            return new EngineInMenuState(this._userMenuInputModel);
        }
        return new EngineInGameState(this._userGameInputModel);
    }
}
