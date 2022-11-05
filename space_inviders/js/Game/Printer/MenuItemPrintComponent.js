import { MenuPrintComponentBase } from "../../Engine/Printer/MenuPrintComponentBase.js";
export class MenuItemPrintComponet extends MenuPrintComponentBase {
    /**
     *
     */
    constructor(menuItem, position) {
        super(menuItem, position, true);
        this._menuItem_1 = menuItem;
    }
    get Text() {
        let item = "";
        if (this._menuItem_1.Order != 0) {
            item += `${this._menuItem_1.Order}: `;
        }
        item += this._menuItem_1.Text;
        return item;
    }
}
