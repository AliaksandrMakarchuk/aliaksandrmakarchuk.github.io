export class EventCodeHandler {
    constructor(eventCode, event, handler) {
        this._code = eventCode;
        this._event = event;
        this._handler = handler;
    }
    get Code() {
        return this._code;
    }
    get Event() {
        return this._event;
    }
    get Handler() {
        return this._handler;
    }
}
