"use strict";
// import { IObjectsFactory } from "./IObjectsFactory.js";
// import { IObjectsFactoryComponent } from "./IObjectsFactoryComponent.js";
// import { IObject } from "../Model/IObject.js";
// import { IObjects } from "../Model/IObjects.js";
// export abstract class GameObjectsFactoryBase<TGameObjects extends IObjects> implements IObjectsFactory<TGameObjects>{
//     private _gameObjectsFactoryComponents: IObjectsFactoryComponent<IObject>[];
//     public get GameObjectsFactoryComponents(): IObjectsFactoryComponent<IObject>[] {
//         return this._gameObjectsFactoryComponents;
//     }
//     /**
//      *
//      */
//     constructor(gameObjectsFactoryComponents: IObjectsFactoryComponent<IObject>[], c: new () => TGameObjects) {
//         this._gameObjectsFactoryComponents = gameObjectsFactoryComponents;
//     }
//     public abstract Generate(): TGameObjects;
// }
