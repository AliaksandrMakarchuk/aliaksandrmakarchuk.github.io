import { Field } from "./Game/Models/Field.js";
import { FPSCalculator } from "./Engine/Utilities/FPSCalculator.js";
import { Cannon } from "./Game/Models/Cannon.js";
import { Printer } from "./Engine/Utilities/Printer.js";
import { DrawableComponentsFactory } from "./Game/Render/DrawableComponentsFactory.js";
import { GameAudioModule } from "./Game/Audio/GameAudioModule.js";
import { Engine } from "./Engine/Engine.js";
import { Rectangle } from "./Engine/Utilities/Rectangle.js";
import { ScoreCalculator } from "./Game/ScoreCalculator.js";
import { BotBulletVisibilityChecker } from "./Game/Render/VisibilityModule/BotBulletVisibilityChecker.js";
import { CollisionModuleFactory } from "./Game/Collision/CollisionModuleFactory.js";
import { BotsMoveComponent } from "./Game/Movement/BotsMoveComponent.js";
import { GameObjects } from "./Game/Models/GameObjects.js";
import { BulletsMoveComponent } from "./Game/Movement/BulletsMoveComponent.js";
import { ShipMoveComponent } from "./Game/Movement/ShipMoveComponent.js";
import { ShipBulletVisibilityChecker } from "./Game/Render/VisibilityModule/ShipBulletVisibilityChecker.js";
import { UserGameInputModule } from "./Game/UserInputModule/UserGameInputModule.js";
import { MisteryBotVisibilityChecker } from "./Game/Render/VisibilityModule/MisteryBotVisibilityChecker.js";
import { MovementModule } from "./Engine/Movement/MovementModule.js";
import { RenderModule } from "./Engine/Render/RenderModule.js";
import { CollisionModule } from "./Engine/Collision/CollisionModule.js";
import { VisibilityModule } from "./Engine/Render/VisibilityModule/VisibilityModule.js";
import { GameLogicComponentsFactory } from "./Game/GameLogic/GameLogicComponentsFactory.js";
import { UserInputEvent } from "./Game/UserInputModule/UserInputEvent.js";
import { Directions } from "./Directions.js";
import { BotMovementOriginal } from "./Game/Movement/Algorithms/BotMovementOriginal.js";
import { TextPosition } from "./Engine/Printer/PrintModuleBase.js";
import { ScorePrintComponent } from "./Game/Printer/ScorePrintComponent.js";
import { DateTimePrintComponent } from "./Game/Printer/DateTimePrintComponent.js";
import { FpsPrintComponent } from "./Game/Printer/FpsPrintComponent.js";
import { SpeedPrintComponet } from "./Game/Printer/SpeedPrintComponent.js";
import { GameLogicModule } from "./Engine/GameLogic/GameLogicModule.js";
import { TimeModule } from "./Game/TimeModule/TimeModule.js";
import { ShipHealthPrintComponent } from "./Game/Printer/ShipHealthPrintComponent.js";
import { BotsGeneratorV2 } from "./Game/ObjectsGenerators/BotsGeneratorV2.js";
import { DebugPrintComponent } from "./Game/Printer/DebugPrintComponent.js";
import { DebugComponent } from "./DebugComponent.js";
import { MenuItemPrintComponet } from "./Game/Printer/MenuItemPrintComponent.js";
import { MenuItem } from "./Game/Menu/MenuItem.js";
import { MenuPrinter } from "./Engine/Menu/MenuPrinter.js";
import { MenuPrintModule } from "./Engine/Printer/MenuPirntModule.js";
import { PrintModule } from "./Engine/Printer/PrintModule.js";
import { EngineStateFactory } from "./Game/State/EngineStateFactory.js";
import { UserMenuInputModule } from "./Game/UserInputModule/UserMenuInputModule.js";
import { PausedGameState } from "./Game/State/PausedGameState.js";
import { MenuBuilder } from "./Game/Menu/MenuBuilder.js";
export class Game {
    constructor(window) {
        //#region Configure canvas
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        let fieldWidth = width - 20;
        let fieldHeight = height - 25;
        let canvas = document.getElementById("canvas");
        canvas.width = fieldWidth;
        canvas.height = fieldHeight;
        let context = canvas.getContext("2d");
        let canvasArea = new Rectangle(0, 0, fieldWidth, fieldHeight);
        //#endregion
        //#region Game objects
        let field = new Field(fieldWidth, fieldHeight);
        let ship = new Cannon(fieldWidth / 2, fieldHeight - 40);
        // let bots: IBot[] = new SimpleBotsGenerator(7, 4).Generate();
        //#region Generate Bots
        // 12 - max bot width
        // 3 - cell size in px
        let maxBotWidth = 12 * 3;
        let temp = Math.ceil(fieldWidth / maxBotWidth);
        let freeWidth = fieldWidth - (temp * maxBotWidth);
        let startX = freeWidth / 2;
        let botsAreaWidth = Math.round(fieldWidth / 2);
        let bots = new BotsGeneratorV2(botsAreaWidth, startX, 50).Generate();
        let gameObjects = new GameObjects(field, bots, ship);
        // gameObjects.GetHelpBots().push(new HelpBot(0, 100));
        //#endregion
        //#endregion
        //#region Audio
        let gameOverAudioHtmlElement = new Audio();
        gameOverAudioHtmlElement.id = "game_over";
        gameOverAudioHtmlElement.preload = "auto";
        gameOverAudioHtmlElement.src = "game_over.mp3";
        let backgroundAudioHtmlElement = new Audio();
        backgroundAudioHtmlElement.id = "background";
        backgroundAudioHtmlElement.preload = "auto";
        backgroundAudioHtmlElement.src = "background.mp3";
        backgroundAudioHtmlElement.loop = true;
        let audioArea = document.getElementById("audio_area");
        let audioModule = new GameAudioModule(document, audioArea, gameOverAudioHtmlElement, backgroundAudioHtmlElement);
        //#endregion
        let shipMoveComponent = new ShipMoveComponent(ship, canvasArea);
        let botsMovementAlgorithm = new BotMovementOriginal(canvasArea.Width, canvasArea.Height, gameObjects.GetBots());
        // let botsMovementAlgorithm: IBotMovementAlgorithm = new BotMovementByCircle();
        //#region Movement
        let moveComponents = [
            new BulletsMoveComponent(Directions.DOWN, x => x.GetBotBullets()),
            new BulletsMoveComponent(Directions.UP, x => x.GetCannonBullets()),
            new BotsMoveComponent(botsMovementAlgorithm),
            shipMoveComponent
        ];
        let movementModule = new MovementModule(moveComponents);
        //#endregion
        let fpsCalculator = new FPSCalculator();
        let scoreCalculator = new ScoreCalculator();
        let printer = new Printer(context, canvasArea.Width, canvasArea.Height);
        // let actionModule: IGameLogicModule<GameObjects> = new GameLogicModule([
        //     new BotsGameLogicComponent(),
        //     new HelpBotGameLogicComponent()
        // ]);
        let visibilityModule = new VisibilityModule([
            new BotBulletVisibilityChecker(),
            new ShipBulletVisibilityChecker(),
            new MisteryBotVisibilityChecker()
        ]);
        let drawableComponentsFactory = new DrawableComponentsFactory(context);
        let renderModule = new RenderModule(context, canvasArea, drawableComponentsFactory.GenerateDrawableComponents());
        //#region Collision
        let collisionModuleComponentsFactory = new CollisionModuleFactory(audioModule, scoreCalculator);
        let collisionModule = new CollisionModule(collisionModuleComponentsFactory.GenerateComponents());
        //#endregion
        let timeModule = new TimeModule();
        let debugComponent = new DebugComponent();
        let gameLogicComponentsFactory = new GameLogicComponentsFactory();
        let gameLogicModule = new GameLogicModule(gameLogicComponentsFactory.GenerateComponents(timeModule, gameObjects, debugComponent));
        let userGameInputModule = new UserGameInputModule(ship, gameObjects.GetCannonBullets(), audioModule, shipMoveComponent);
        let printComponents = [
            new DateTimePrintComponent(TextPosition.LEFT | TextPosition.TOP, false),
            new SpeedPrintComponet(botsMovementAlgorithm, TextPosition.RIGHT | TextPosition.TOP, false),
            new ScorePrintComponent(scoreCalculator, TextPosition.RIGHT | TextPosition.TOP, false),
            new FpsPrintComponent(fpsCalculator, TextPosition.RIGHT | TextPosition.BOTTOM, false),
            new ShipHealthPrintComponent(ship, TextPosition.LEFT | TextPosition.BOTTOM, false),
            new DebugPrintComponent(debugComponent, TextPosition.LEFT | TextPosition.BOTTOM, true)
        ];
        let printModule = new PrintModule(printer, canvasArea, printComponents);
        let engineStateFactory;
        let titlePrintComponent = new MenuItemPrintComponet(new MenuItem(0, "MENU", false, _ => { }), TextPosition.LEFT | TextPosition.TOP);
        let startTheGameAction = e => {
            e.ChangeEngineState(engineStateFactory.GetEngineState(1));
            e.TogglePause();
        };
        let menuBuilder = new MenuBuilder();
        menuBuilder
            .AddMenuItem("Item 1")
            .SelectItem()
            .AddMenuItem("Item #2")
            .AddMenuItem("Start the Game")
            .SetAction(startTheGameAction);
        let menu = menuBuilder.Build();
        let menuItemPrintComponents = menu.MenuItems.map(item => {
            return new MenuItemPrintComponet(item, TextPosition.LEFT | TextPosition.TOP);
        });
        let menuPrintModule = new MenuPrintModule(printer, canvasArea, menuItemPrintComponents, titlePrintComponent);
        let menuPrinter = new MenuPrinter(context, canvasArea, menuPrintModule);
        let userMenuInputModule = new UserMenuInputModule(audioModule, menu);
        engineStateFactory = new EngineStateFactory(userGameInputModule, userMenuInputModule);
        this._engine = new Engine(window, canvasArea, renderModule, collisionModule, movementModule, audioModule, visibilityModule, fpsCalculator, printer, gameObjects, gameLogicModule, (e) => new PausedGameState(e, gameObjects, scoreCalculator), printModule, timeModule, menuPrinter, engineStateFactory.GetEngineState(0));
        document.addEventListener('keydown', (e) => this._engine.HandleUserInput(new UserInputEvent(e, false)));
        document.addEventListener('keyup', (e) => this._engine.HandleUserInput(new UserInputEvent(e, true)));
        audioModule.EnableAudio();
    }
    Start() {
        this._engine.Start();
    }
}
// Fonts.VcrOsdMono1001;
// let game: Game = new Game(window);
// game.Start();
window.onpageshow = () => {
    // this is used ONLY to make sure that font is loaded!!!!
    // actually concrete font is uploaded via .css
    var junction_font = new FontFace('myFont', 'url(./js/Engine/Assets/Fonts/myFont2.ttf)');
    junction_font.load().then(function (loaded_face) {
        console.log(`${loaded_face}`);
        // loaded_face holds the loaded FontFace
        // document.fonts.add(loaded_face);
        document.body.style.fontFamily = '"myFont", Arial';
        let game = new Game(window);
        game.Start();
    }).catch(function (error) {
        console.log(`Font load error: ${error}`);
        // error occurred
    });
    // alert("load");
};
