import { TextSize } from "../Utilities/Printer.js";
import { PrintModuleBase, Utils } from "./PrintModuleBase.js";
export class MenuPrintModule extends PrintModuleBase {
    constructor(printer, canvasArea, components, title) {
        super(printer, canvasArea, components);
        this._title = title;
    }
    PrintTemplate(componentsByGroup) {
        var _a;
        let x;
        let y;
        let textSize;
        let utils = new Utils();
        let position = (_a = this.Components[0]) === null || _a === void 0 ? void 0 : _a.Position;
        if (!position) {
            throw new Error("Some of Menu component has incorrect position");
        }
        x = utils.GetInitialX(position, this.CanvasArea, this.Printer);
        y = utils.GetInitialY(position, this.CanvasArea, this.Printer);
        textSize = new TextSize(0, 0);
        textSize = this.PrintTitle(this._title, utils, x, y, textSize);
        componentsByGroup.forEach(component => {
            x = utils.GetX(x, component, this.CanvasArea, textSize, this.Printer.Margin);
            y = utils.GetY(y, component, textSize, this.Printer.Margin);
            let fill;
            if (component.IsSelected) {
                fill = 'yellow';
            }
            textSize = this.Printer.PrintColoredText(x, y, component.Text, utils.GetPositioning(component.Position), fill, undefined);
        });
    }
    PrintTitle(title, utils, initialX, initialY, textSize) {
        let x = utils.GetX(initialX, title, this.CanvasArea, textSize, this.Printer.Margin);
        let y = utils.GetY(initialY, title, textSize, this.Printer.Margin);
        return this.Printer.PrintColoredText(x, y, title.Text, utils.GetPositioning(title.Position), '#a1b2c3', '30px PixelFont');
    }
}
