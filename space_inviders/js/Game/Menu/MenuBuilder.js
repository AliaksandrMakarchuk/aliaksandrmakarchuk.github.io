import { Menu } from "./Menu.js";
import { MenuItem } from "./MenuItem.js";
export class MenuBuilder {
    constructor() {
        this._menuItems = new Array();
        this._emptyMenuItemAction = _ => { };
        this._temporaryMenuItemIsSelected = false;
    }
    AddMenuItem(text) {
        this.AddTemporaryMenuItemIfReady();
        this._temporaryMenuItemText = text;
        return this;
    }
    SelectItem() {
        this._temporaryMenuItemIsSelected = true;
        return this;
    }
    SetAction(action) {
        this._temporaryMenuItemAction = action;
        return this;
    }
    Build() {
        this.AddTemporaryMenuItemIfReady();
        let selectedItemsCount = 0;
        this._menuItems.forEach(item => {
            if (item.IsSelected) {
                selectedItemsCount += 1;
            }
        });
        if (selectedItemsCount !== 1) {
            throw new Error("There should be selected 1 element");
        }
        return new Menu(this._menuItems);
    }
    AddTemporaryMenuItemIfReady() {
        var _a;
        if (this._temporaryMenuItemText !== undefined) {
            let menuItem = new MenuItem(this.GetLastOrder() + 1, this._temporaryMenuItemText, this._temporaryMenuItemIsSelected, (_a = this._temporaryMenuItemAction) !== null && _a !== void 0 ? _a : this._emptyMenuItemAction);
            this._menuItems.push(menuItem);
        }
        this._temporaryMenuItemText = undefined;
        this._temporaryMenuItemAction = undefined;
        this._temporaryMenuItemIsSelected = false;
    }
    GetLastOrder() {
        let lastOrder = 0;
        this._menuItems.forEach(item => {
            if (item.Order > lastOrder) {
                lastOrder = item.Order;
            }
        });
        return lastOrder;
    }
}
