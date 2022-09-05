import { BotsGameLogicComponent } from "./BotsGameLogicComponent.js";
import { MisteryBotGameLogicComponent } from "./MisteryBotGameLogicComponent.js";
export class GameLogicComponentsFactory {
    GenerateComponents(timeModule, gameObjects, debugComponent) {
        return [
            new BotsGameLogicComponent(gameObjects, debugComponent),
            new MisteryBotGameLogicComponent(timeModule, debugComponent),
        ];
    }
}
