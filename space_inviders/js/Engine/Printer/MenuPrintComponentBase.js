import { PrintComponentBase } from "./PrintComponentBase.js";
export class MenuPrintComponentBase extends PrintComponentBase {
    /**
     *
     */
    constructor(menuItem, position, isNewLine) {
        super(position, isNewLine);
        this._menuItem = menuItem;
    }
    get MenuItem() {
        return this._menuItem;
    }
    get IsSelected() {
        return this._menuItem.IsSelected;
    }
}
