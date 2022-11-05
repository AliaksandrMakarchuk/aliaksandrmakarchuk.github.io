export class UserMenuInputModule {
    /**
     *
     */
    constructor(audioModule, menu) {
        this._allowedGameKeyCodes = [
            'ArrowUp',
            'ArrowDown',
            'Enter'
        ];
        this._audioModule = audioModule;
        this._menu = menu;
    }
    HandleUserInputEvent(event, engine) {
        if (!event.IsKeyUp) {
            this.HandleKeyDown(event.Event, engine);
        }
    }
    IsAllowedKey(key) {
        return this._allowedGameKeyCodes.indexOf(key) >= 0;
    }
    HandleKeyDown(e, engine) {
        engine = engine;
        if (this.IsAllowedKey(e.code)) {
            switch (e.code) {
                case 'ArrowUp':
                    // go previous menu item
                    this._menu.SelectPreviousItem();
                    break;
                case 'ArrowDown':
                    // go next menu item
                    this._menu.SelectNextItem();
                    break;
                case 'Enter':
                    // execute selected item
                    this._menu.ExecuteSelectedItem(engine);
                    break;
            }
            this._audioModule.PlaySelectMenuItem();
        }
    }
}
