export class GameState {
    constructor(requestId, stateType, autoRequestNextFrame) {
        this.RequestId = requestId;
        this.StateType = stateType;
        this.AutoRequestNextFrame = autoRequestNextFrame;
    }
}
