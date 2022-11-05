define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollisionSide = void 0;
    var CollisionSide;
    (function (CollisionSide) {
        CollisionSide[CollisionSide["LEFT"] = 0] = "LEFT";
        CollisionSide[CollisionSide["TOP"] = 1] = "TOP";
        CollisionSide[CollisionSide["RIGHT"] = 2] = "RIGHT";
        CollisionSide[CollisionSide["BOTTOM"] = 3] = "BOTTOM";
    })(CollisionSide = exports.CollisionSide || (exports.CollisionSide = {}));
});
