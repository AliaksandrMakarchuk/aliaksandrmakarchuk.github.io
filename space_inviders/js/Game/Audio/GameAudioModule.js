import { GameAudioModuleBase } from "./GameAudioModuleBase.js";
export class GameAudioModule extends GameAudioModuleBase {
    /**
     *
     */
    constructor(document, audioElement, gameOverAudioHtmlElement, backgroundAudioHtmlElement) {
        super(document, audioElement, gameOverAudioHtmlElement, backgroundAudioHtmlElement);
        //"audio_area"
        this._shipFireAudio = new Audio();
        this._hitAudio = new Audio();
        this._helpBotHitAudio = new Audio();
        this.InitializeGameSpecificAudio();
    }
    InitializeGameSpecificAudio() {
        this._shipFireAudio.id = "ship_fire";
        this._shipFireAudio.preload = "auto";
        this._shipFireAudio.src = "js/Engine/Assets/Audio/fire.mp3";
        this._hitAudio.id = "hit";
        this._hitAudio.preload = "auto";
        this._hitAudio.src = "js/Engine/Assets/Audio/hit.mp3";
        this._helpBotHitAudio.id = "help_bot_hit";
        this._helpBotHitAudio.preload = "auto";
        this._helpBotHitAudio.src = "js/Engine/Assets/Audio/help_bot_hit.mp3";
        this.AudioElement.appendChild(this._shipFireAudio);
        this.AudioElement.appendChild(this._hitAudio);
        this.AudioElement.appendChild(this._helpBotHitAudio);
    }
    InitializeBackgroundAudio() {
        throw new Error("Method not implemented.");
    }
    PlayCannonFire() {
        if (!this.IsEnabled) {
            return;
        }
        this._shipFireAudio.pause();
        this._shipFireAudio.currentTime = 0;
        this._shipFireAudio.play();
    }
    PlayBotHit() {
        if (!this.IsEnabled) {
            return;
        }
        this._hitAudio.pause();
        this._hitAudio.currentTime = 0;
        this._hitAudio.play();
    }
    PlayHelpBotHit() {
        if (!this.IsEnabled) {
            return;
        }
        this._helpBotHitAudio.play();
    }
}
