export class Menu {
    /**
     *
     */
    constructor(items) {
        this._items = items;
    }
    get MenuItems() {
        return this._items;
    }
    SelectNextItem() {
        let selected = this._items.find(x => x.IsSelected);
        if (selected === undefined) {
            throw new Error("No one menu item is selected");
        }
        let maxOrder = 0;
        this._items.forEach(x => {
            if (x.Order > maxOrder) {
                maxOrder = x.Order;
            }
        });
        let selecteOrder = selected.Order;
        if (selecteOrder === maxOrder) {
            return;
        }
        let nextItem = this._items.find(x => x.Order === selecteOrder + 1);
        if (nextItem === undefined) {
            throw new Error("Next menu item could not be found");
            ;
        }
        selected.ToggleSelection();
        nextItem.ToggleSelection();
    }
    SelectPreviousItem() {
        let selected = this._items.find(x => x.IsSelected);
        if (selected === undefined) {
            throw new Error("No one menu item is selected");
        }
        let minOrder = 1;
        let selecteOrder = selected.Order;
        if (selecteOrder === minOrder) {
            return;
        }
        let previousItem = this._items.find(x => x.Order === selecteOrder - 1);
        if (previousItem === undefined) {
            throw new Error("Next menu item could not be found");
            ;
        }
        selected.ToggleSelection();
        previousItem.ToggleSelection();
    }
    ExecuteSelectedItem(engine) {
        let selected = this._items.find(x => x.IsSelected);
        if (selected === undefined) {
            throw new Error("No one menu item is selected");
        }
        selected.Action(engine);
    }
}
