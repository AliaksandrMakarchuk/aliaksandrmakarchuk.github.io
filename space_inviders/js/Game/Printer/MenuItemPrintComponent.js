import { MenuPrintComponentBase } from "../../Engine/Printer/MenuPrintComponentBase.js";
export class MenuItemPrintComponet extends MenuPrintComponentBase {
    /**
     *
     */
    constructor(menuItem, position) {
        super(menuItem, position, true);
    }
    get Text() {
        return `${this.MenuItem.Order}:${this.MenuItem.Text}`;
    }
}
