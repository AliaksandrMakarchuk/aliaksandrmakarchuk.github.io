import { EventCodeHandler } from './EventCodeHandler.js';
import { KeyboardEvents } from './KeyboardEvents.js';
export class KeyboardEventsHandler {
    constructor() {
        this._keyboardEventHandlerMap = new Array();
    }
    AddKeyCodeHandler(code, event, handler) {
        if (this.GetKeyEventIndex(code, event) !== -1) {
            throw new Error(`Handler for the code ${code} already exists`);
        }
        this._keyboardEventHandlerMap.push(new EventCodeHandler(code, event, handler));
    }
    HandleKeyPressed(code) {
        this.HandleKey(code, KeyboardEvents.PRESSED);
    }
    HandleKeyReleased(code) {
        this.HandleKey(code, KeyboardEvents.RELEASED);
    }
    HandleKey(code, event) {
        const codeIndex = this.GetKeyEventIndex(code, event);
        if (codeIndex === -1) {
            // tslint:disable-next-line:no-console
            console.log(`Key ${code} does not have a handler`);
            return;
        }
        this._keyboardEventHandlerMap[codeIndex].Handler();
    }
    GetKeyEventIndex(code, event) {
        return this._keyboardEventHandlerMap.findIndex((x) => {
            return x.Code === code && x.Event === event;
        });
    }
}
