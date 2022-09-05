export class VisibilityModule {
    /**
     *
     */
    constructor(checkers) {
        this._checkers = checkers;
    }
    CheckVisibility(gameObjects, canvasArea) {
        this._checkers.forEach(checker => {
            let correspondingObjects = checker.GetCorrespondingObjects(gameObjects);
            checker.RemoveInvisibleObjects(correspondingObjects, canvasArea);
        });
    }
}
