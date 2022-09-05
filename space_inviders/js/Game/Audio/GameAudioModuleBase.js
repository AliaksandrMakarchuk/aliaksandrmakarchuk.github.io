import { AudioModuleBase } from "../../Engine/Audio/AudioModuleBase.js";
export class GameAudioModuleBase extends AudioModuleBase {
    /**
     *
     */
    constructor(document, audioElement, gameOverAudioHtmlElement, backgroundAudioHtmlElement) {
        super(audioElement, gameOverAudioHtmlElement, backgroundAudioHtmlElement);
        this._document = document;
    }
    get Document() {
        return this._document;
    }
}
