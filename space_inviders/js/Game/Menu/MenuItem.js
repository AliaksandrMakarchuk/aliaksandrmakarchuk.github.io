export class MenuItem {
    /**
     *
     */
    constructor(order, text, isSelected, action) {
        this._order = order;
        this._text = text;
        this._isSelected = isSelected;
        this._action = action;
    }
    get Order() {
        return this._order;
    }
    get Text() {
        return this._text;
    }
    get IsSelected() {
        return this._isSelected;
    }
    get Action() {
        return this._action;
    }
    ToggleSelection() {
        this._isSelected = !this._isSelected;
    }
}
