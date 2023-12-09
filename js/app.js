(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var BlockColor_1 = require("./BlockColor");
var BlockContext_1 = require("./BlockContext");
var BlockState = __importStar(require("./BlockState"));
var Block = (function () {
    function Block(x, y, size) {
        this.X = x;
        this.Y = y;
        this._size = size;
        this._color = BlockColor_1.BlockColor.Free;
        this._blockContext = new BlockContext_1.BlockContext(new BlockState.EmptyState());
    }
    Block.prototype.Move = function (speed) {
        this._blockContext.Move(speed, this);
        if (this.Next != undefined) {
            this.Next.Move(speed);
        }
    };
    Block.prototype.UpdateColor = function (color) {
        this._color = color;
    };
    Block.prototype.ChangeDirection = function (direction) {
        this._blockContext.UpdateState(direction);
    };
    Block.prototype.InitializeDirectionTo = function (tail) {
        this._blockContext.InitializeDirection(tail);
    };
    Block.prototype.Draw = function (context) {
        context.fillStyle = this._color.toString();
        context.beginPath();
        context.fillRect(this.X, this.Y, this._size, this._size);
        context.strokeStyle = 'B0C4DE';
        context.strokeRect(this.X, this.Y, this._size, this._size);
        context.fill();
    };
    Block.prototype.UpdateCoords = function (previousBlock) {
        var xIncrement = previousBlock._blockContext.GetNextTailXIncrement();
        var yIncrement = previousBlock._blockContext.GetNextTailYIncrement();
        this.X = previousBlock.X + this._size * xIncrement;
        this.Y = previousBlock.Y + this._size * yIncrement;
    };
    Block.prototype.HasCollision = function (block) {
        return this.X == block.X && this.Y == block.Y;
    };
    Block.prototype.UpdateDirections = function () {
        this.UpdateDirection(this);
    };
    Block.prototype.clone = function () {
        return new Block(this.X, this.Y, this._size);
    };
    Block.prototype.UpdateDirection = function (block) {
        if (block.Next != null) {
            this.UpdateDirection(block.Next);
            block.Next.ChangeDirection(block._blockContext.GetDirection());
        }
    };
    return Block;
}());
exports.Block = Block;

},{"./BlockColor":2,"./BlockContext":3,"./BlockState":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockColor = void 0;
var BlockColor;
(function (BlockColor) {
    BlockColor["Free"] = "green";
    BlockColor["Snake"] = "#FFFAF0";
    BlockColor["Border"] = "#B0C4DE";
})(BlockColor = exports.BlockColor || (exports.BlockColor = {}));

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContext = void 0;
var Direction_1 = require("./Direction");
var BlockState = __importStar(require("./BlockState"));
var BlockContext = (function () {
    function BlockContext(state) {
        this._state = state;
        this._currentDirection = Direction_1.Direction.Unknown;
    }
    BlockContext.prototype.GetState = function () {
        return this._state;
    };
    BlockContext.prototype.GetDirection = function () {
        return this._currentDirection;
    };
    BlockContext.prototype.Move = function (speed, block) {
        this._state.move(speed, block);
    };
    BlockContext.prototype.UpdateDirection = function (headState) {
        this._state = headState;
    };
    BlockContext.prototype.UpdateState = function (direction) {
        if (this._currentDirection != Direction_1.Direction.Unknown &&
            (direction == this._currentDirection
                || (direction == Direction_1.Direction.Up && this._currentDirection == Direction_1.Direction.Down)
                || (direction == Direction_1.Direction.Left && this._currentDirection == Direction_1.Direction.Right)
                || (direction == Direction_1.Direction.Down && this._currentDirection == Direction_1.Direction.Up)
                || (direction == Direction_1.Direction.Right && this._currentDirection == Direction_1.Direction.Left))) {
            return;
        }
        switch (direction) {
            case Direction_1.Direction.Up:
                this.SetState(new BlockState.MoveUpState());
                break;
            case Direction_1.Direction.Right:
                this.SetState(new BlockState.MoveRightState());
                break;
            case Direction_1.Direction.Down:
                this.SetState(new BlockState.MoveDownState());
                break;
            case Direction_1.Direction.Left:
                this.SetState(new BlockState.MoveLeftState());
                break;
        }
        this._currentDirection = direction;
    };
    BlockContext.prototype.InitializeDirection = function (block) {
        block.ChangeDirection(this._currentDirection);
    };
    BlockContext.prototype.GetNextTailXIncrement = function () {
        switch (this._currentDirection) {
            case Direction_1.Direction.Up:
                return 0;
            case Direction_1.Direction.Right:
                return -1;
            case Direction_1.Direction.Down:
                return 0;
            case Direction_1.Direction.Left:
                return 1;
            default:
                return 0;
        }
    };
    BlockContext.prototype.GetNextTailYIncrement = function () {
        switch (this._currentDirection) {
            case Direction_1.Direction.Up:
                return 1;
            case Direction_1.Direction.Right:
                return 0;
            case Direction_1.Direction.Down:
                return -1;
            case Direction_1.Direction.Left:
                return 0;
            default:
                return 0;
        }
    };
    BlockContext.prototype.SetState = function (state) {
        this._state = state;
    };
    return BlockContext;
}());
exports.BlockContext = BlockContext;

},{"./BlockState":4,"./Direction":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = exports.MoveLeftState = exports.MoveDownState = exports.MoveRightState = exports.MoveUpState = void 0;
var MoveUpState = (function () {
    function MoveUpState() {
    }
    MoveUpState.prototype.move = function (speed, block) {
        block.Y -= speed;
    };
    return MoveUpState;
}());
exports.MoveUpState = MoveUpState;
var MoveRightState = (function () {
    function MoveRightState() {
    }
    MoveRightState.prototype.move = function (speed, block) {
        block.X += speed;
    };
    return MoveRightState;
}());
exports.MoveRightState = MoveRightState;
var MoveDownState = (function () {
    function MoveDownState() {
    }
    MoveDownState.prototype.move = function (speed, block) {
        block.Y += speed;
    };
    return MoveDownState;
}());
exports.MoveDownState = MoveDownState;
var MoveLeftState = (function () {
    function MoveLeftState() {
    }
    MoveLeftState.prototype.move = function (speed, block) {
        block.X -= speed;
    };
    return MoveLeftState;
}());
exports.MoveLeftState = MoveLeftState;
var EmptyState = (function () {
    function EmptyState() {
    }
    EmptyState.prototype.move = function (speed, block) {
        this._speed = speed;
        this._block = block.clone();
        this._block.X = this._speed;
    };
    return EmptyState;
}());
exports.EmptyState = EmptyState;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Unknown"] = 0] = "Unknown";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Left"] = 4] = "Left";
})(Direction = exports.Direction || (exports.Direction = {}));

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
var Field = (function () {
    function Field(canvas, context) {
        this._canvas = canvas;
        this._context = context;
    }
    Field.prototype.Draw = function () {
        this._context.fillStyle = 'gray';
        this._context.beginPath();
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fill();
    };
    return Field;
}());
exports.Field = Field;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
var Block_1 = require("./Block");
var BlockColor_1 = require("./BlockColor");
var Snake = (function () {
    function Snake(x, y, speed) {
        this._head = new Block_1.Block(x, y, speed);
        this._head.UpdateColor(BlockColor_1.BlockColor.Snake);
        this._blockSize = speed;
        this._speed = speed;
        this._length = 1;
    }
    Snake.prototype.Move = function () {
        this._head.Move(this._speed);
        this._head.UpdateDirections();
    };
    Snake.prototype.ChangeDirection = function (direction) {
        this._head.ChangeDirection(direction);
    };
    Snake.prototype.Draw = function (context) {
        this._head.Draw(context);
        var tail = this._head.Next;
        while (tail != null) {
            tail.Draw(context);
            tail = tail.Next;
        }
    };
    Snake.prototype.Eat = function (block) {
        var tail = this._head;
        while (tail.Next != null) {
            tail = tail.Next;
        }
        this._length += 1;
        tail.Next = block;
        tail.Next.UpdateCoords(tail);
        tail.InitializeDirectionTo(tail.Next);
        tail.Next.UpdateColor(BlockColor_1.BlockColor.Snake);
    };
    Snake.prototype.CheckSelfEating = function () {
        var block = this._head.Next;
        while (block != null) {
            if (this._head.HasCollision(block)) {
                return true;
            }
            block = block.Next;
        }
        return false;
    };
    Snake.prototype.IsOutOfBoundaries = function (width, height) {
        return this._head.X < 0
            || this._head.Y < 0
            || this._head.X + this._blockSize > width
            || this._head.Y + this._blockSize > height;
    };
    Snake.prototype.GetLength = function () {
        return this._length;
    };
    Snake.prototype.GetX = function () {
        return this._head.X;
    };
    Snake.prototype.GetY = function () {
        return this._head.Y;
    };
    return Snake;
}());
exports.Snake = Snake;

},{"./Block":1,"./BlockColor":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeTheGame = void 0;
var Direction_1 = require("./Direction");
var Field_1 = require("./Field");
var Snake_1 = require("./Snake");
var Block_1 = require("./Block");
window.onload = function () {
    var game = new SnakeTheGame(document, 500, 500);
    document.addEventListener('keydown', function (e) { return game.HandleKeyDown(e); });
    game.Start();
    console.log("Document loaded. Game started");
};
var SnakeTheGame = (function () {
    function SnakeTheGame(document, width, height) {
        this._gameKeyCodes = [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'KeyP'
        ];
        this._canvas = document.getElementById("canvas");
        this._canvas.width = width;
        this._canvas.height = height;
        this._context = this._canvas.getContext("2d");
        this._gridCellSize = 20;
        this._gameSpeed = 1;
        this._isPause = false;
    }
    SnakeTheGame.prototype.Start = function () {
        var _this = this;
        this._field = new Field_1.Field(this._canvas, this._context);
        this._snake = new Snake_1.Snake(20, 20, this._gridCellSize);
        this._snake.ChangeDirection(Direction_1.Direction.Right);
        this._field.Draw();
        this._snake.Draw(this._context);
        this.GenerateEmptyBlock();
        if (this._emptyBlock) {
            this._emptyBlock.Draw(this._context);
        }
        this._timerId = setInterval(function () { return _this.Move(); }, this.GetCurrentTimeInterval());
    };
    SnakeTheGame.prototype.PlayOrPause = function () {
        var _this = this;
        if (this._isPause) {
            this._timerId = setInterval(function () { return _this.Move(); }, this.GetCurrentTimeInterval());
            this._isPause = false;
            return;
        }
        this._context.fillText("PAUSE", this._canvas.width / 2 - 30, this._canvas.height / 2);
        clearInterval(this._timerId);
        this._isPause = true;
    };
    SnakeTheGame.prototype.HandleKeyDown = function (event) {
        if (this.IsAllowedKey(event.code)) {
            switch (event.code) {
                case 'ArrowLeft':
                    this.ChangeDirection(Direction_1.Direction.Left);
                    break;
                case 'ArrowRight':
                    this.ChangeDirection(Direction_1.Direction.Right);
                    break;
                case 'ArrowUp':
                    this.ChangeDirection(Direction_1.Direction.Up);
                    break;
                case 'ArrowDown':
                    this.ChangeDirection(Direction_1.Direction.Down);
                    break;
                case 'KeyP':
                    this.PlayOrPause();
                    break;
            }
        }
    };
    SnakeTheGame.prototype.IsAllowedKey = function (key) {
        return this._gameKeyCodes.indexOf(key) >= 0;
    };
    SnakeTheGame.prototype.ChangeDirection = function (direction) {
        if (this._isAllowChangeDirection) {
            this._isAllowChangeDirection = false;
            if (this._snake) {
                this._snake.ChangeDirection(direction);
            }
        }
    };
    SnakeTheGame.prototype.Move = function () {
        if (this._snake) {
            this._snake.Move();
        }
        this.CheckCollision();
        if (this._field) {
            this._field.Draw();
        }
        if (this._snake) {
            this._snake.Draw(this._context);
        }
        if (this._emptyBlock) {
            this._emptyBlock.Draw(this._context);
        }
        this._isAllowChangeDirection = true;
        this.PrintGameDetails();
        if (!this.CheckCanFinishGame()) {
            return;
        }
        this.EndGame();
    };
    SnakeTheGame.prototype.CheckCollision = function () {
        if (this._snake && this._emptyBlock && this._snake.GetX() == this._emptyBlock.X
            && this._snake.GetY() == this._emptyBlock.Y) {
            this._snake.Eat(this._emptyBlock);
            this.TryUpdateGameSpeed();
            this.GenerateEmptyBlock();
        }
    };
    SnakeTheGame.prototype.CheckCanFinishGame = function () {
        return this._snake != undefined && (this._snake.CheckSelfEating()
            || this._snake.IsOutOfBoundaries(this._canvas.width, this._canvas.height));
    };
    SnakeTheGame.prototype.EndGame = function () {
        clearInterval(this._timerId);
        this._context.font = "40pt Calibri";
        this._context.fillText("Game Over", 100, 100);
    };
    SnakeTheGame.prototype.PrintGameDetails = function () {
        this._context.font = "15pt Calibri";
        this._context.fillText("Score: " + (this._snake != undefined ? this._snake.GetLength() : 0), this._canvas.width - 100, 30);
        this._context.fillText("Speed: " + this._gameSpeed, this._canvas.width - 100, 60);
    };
    SnakeTheGame.prototype.GenerateEmptyBlock = function () {
        var randX = this.GetEmptyBlockPosition(this._canvas.width, this._gridCellSize);
        var randY = this.GetEmptyBlockPosition(this._canvas.height, this._gridCellSize);
        this._emptyBlock = new Block_1.Block(randX, randY, this._gridCellSize);
    };
    SnakeTheGame.prototype.GetEmptyBlockPosition = function (boundary, blockSize) {
        var randomValue = Math.floor(Math.random() * boundary);
        var mod = randomValue % blockSize;
        if (mod > 0) {
            randomValue += blockSize - mod;
        }
        if (randomValue >= boundary) {
            randomValue = boundary - blockSize;
        }
        return randomValue;
    };
    SnakeTheGame.prototype.TryUpdateGameSpeed = function () {
        var _this = this;
        if (this._snake && this._snake.GetLength() % 20 == 0) {
            this._gameSpeed += 1;
            clearInterval(this._timerId);
            this._timerId = setInterval(function () { return _this.Move(); }, this.GetCurrentTimeInterval());
        }
    };
    SnakeTheGame.prototype.GetCurrentTimeInterval = function () {
        var timeInterval = 200 - this._gameSpeed * 20;
        if (timeInterval < 0) {
            timeInterval = 0;
        }
        return timeInterval;
    };
    return SnakeTheGame;
}());
exports.SnakeTheGame = SnakeTheGame;

},{"./Block":1,"./Direction":5,"./Field":6,"./Snake":7}]},{},[8]);
