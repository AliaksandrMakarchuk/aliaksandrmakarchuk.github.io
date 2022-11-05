define(["require", "exports", "./EventCodeHandler", "./KeyboardEvents"], function (require, exports, EventCodeHandler_1, KeyboardEvents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyboardEventsHandler = void 0;
    var KeyboardEventsHandler = /** @class */ (function () {
        function KeyboardEventsHandler() {
            this._keyboardEventHandlerMap = new Array();
        }
        KeyboardEventsHandler.prototype.AddKeyCodeHandler = function (code, event, handler) {
            if (this.GetKeyEventIndex(code, event) !== -1) {
                throw new Error("Handler for the code ".concat(code, " already exists"));
            }
            this._keyboardEventHandlerMap.push(new EventCodeHandler_1.EventCodeHandler(code, event, handler));
        };
        KeyboardEventsHandler.prototype.HandleKeyPressed = function (code) {
            this.HandleKey(code, KeyboardEvents_1.KeyboardEvents.PRESSED);
        };
        KeyboardEventsHandler.prototype.HandleKeyReleased = function (code) {
            this.HandleKey(code, KeyboardEvents_1.KeyboardEvents.RELEASED);
        };
        KeyboardEventsHandler.prototype.HandleKey = function (code, event) {
            var codeIndex = this.GetKeyEventIndex(code, event);
            if (codeIndex === -1) {
                // tslint:disable-next-line:no-console
                console.log("Key ".concat(code, " does not have a handler"));
                return;
            }
            this._keyboardEventHandlerMap[codeIndex].Handler();
        };
        KeyboardEventsHandler.prototype.GetKeyEventIndex = function (code, event) {
            return this._keyboardEventHandlerMap.findIndex(function (x) {
                return x.Code === code && x.Event === event;
            });
        };
        return KeyboardEventsHandler;
    }());
    exports.KeyboardEventsHandler = KeyboardEventsHandler;
});
