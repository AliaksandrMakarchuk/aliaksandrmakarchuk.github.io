export class AudioModuleBase {
    constructor(audioElement, gameOverAudioHtmlElement, backgroundAudioHtmlElement) {
        this._enabled = false;
        this._audioElement = audioElement;
        this._gameOverAudio = gameOverAudioHtmlElement;
        this._backgroundAudio = backgroundAudioHtmlElement;
        this._audioElement.appendChild(this._gameOverAudio);
    }
    get IsEnabled() {
        return this._enabled;
    }
    get AudioElement() {
        return this._audioElement;
    }
    EnableAudio() {
        this._enabled = true;
    }
    DisableAudio() {
        this._enabled = false;
    }
    PlayBackground() {
        if (!this._enabled) {
            return;
        }
        this._backgroundAudio.play();
    }
    PauseBackground() {
        this._backgroundAudio.pause();
    }
    PlayGameOver() {
        if (!this._enabled) {
            return;
        }
        this._gameOverAudio.play();
    }
    PlaySelectMenuItem() {
        //TODO: Implement
    }
}
