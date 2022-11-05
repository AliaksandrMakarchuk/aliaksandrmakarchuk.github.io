define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventCodeHandler = void 0;
    var EventCodeHandler = /** @class */ (function () {
        function EventCodeHandler(eventCode, event, handler) {
            this._code = eventCode;
            this._event = event;
            this._handler = handler;
        }
        Object.defineProperty(EventCodeHandler.prototype, "Code", {
            get: function () {
                return this._code;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventCodeHandler.prototype, "Event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventCodeHandler.prototype, "Handler", {
            get: function () {
                return this._handler;
            },
            enumerable: false,
            configurable: true
        });
        return EventCodeHandler;
    }());
    exports.EventCodeHandler = EventCodeHandler;
});
