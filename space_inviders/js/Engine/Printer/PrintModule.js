import { TextSize } from "../Utilities/Printer.js";
import { PrintModuleBase, Utils } from "./PrintModuleBase.js";
export class PrintModule extends PrintModuleBase {
    PrintTemplate(componentsByGroup) {
        var _a;
        let x;
        let y;
        let textSize;
        let utils = new Utils();
        let position = (_a = componentsByGroup[0]) === null || _a === void 0 ? void 0 : _a.Position;
        if (!position) {
            throw new Error("Some component has incorrect position");
        }
        x = utils.GetInitialX(position, this.CanvasArea, this.Printer);
        y = utils.GetInitialY(position, this.CanvasArea, this.Printer);
        textSize = new TextSize(0, 0);
        componentsByGroup.forEach(component => {
            x = utils.GetX(x, component, this.CanvasArea, textSize, this.Printer.Margin);
            y = utils.GetY(y, component, textSize, this.Printer.Margin);
            textSize = this.Printer.PrintText(x, y, component.Text, utils.GetPositioning(component.Position));
        });
    }
}
