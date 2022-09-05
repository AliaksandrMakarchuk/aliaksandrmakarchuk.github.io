"use strict";
// import { ICollisionDetector } from "../../Engine/Collision/ICollisionDetector.js";
// import { ICollisionModuleComponent } from "../../Engine/Collision/ICollisionModuleComponent.js";
// import { ICollisionResolver } from "../../Engine/Collision/ICollisionResolver.js";
// import { GameAudioModuleBase } from "../Audio/GameAudioModuleBase.js";
// import { GameObjects } from "../Models/GameObjects.js";
// import { IBot } from "../Models/IBot.js";
// import { MisteryBotBulletCollisionDetector } from "./MisteryBotBulletCollisionDetector.js";
// import { MisteryBotBulletCollisionResolver } from "./MisteryBotBulletCollisionResolver.js";
// export class MisteryBotBulletCollisionModule implements ICollisionModuleComponent<IBot, GameObjects>{
//     private _collisionDetector: ICollisionDetector<IBot, GameObjects>;
//     private _collisionResolver: ICollisionResolver<IBot, GameObjects>;
//     /**
//      *
//      */
//     constructor(audioModule: GameAudioModuleBase) {
//         this._collisionDetector = new MisteryBotBulletCollisionDetector();
//         this._collisionResolver = new MisteryBotBulletCollisionResolver(audioModule);
//     }
//     public get CollisionDetector(): ICollisionDetector<IBot, GameObjects> {
//         return this._collisionDetector;
//     }
//     public get CollisionResolver(): ICollisionResolver<IBot, GameObjects> {
//         return this._collisionResolver;
//     }
// }
