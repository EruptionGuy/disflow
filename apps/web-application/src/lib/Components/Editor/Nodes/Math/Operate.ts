import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

const controls = {
    "+": "+",
    "-": "-",
    "×": "*",
    "÷": "/"
}

export class Operate extends BaseNode {
    static title: string = "Operate";
    static category: string = "Maths";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.Math);
        this.addInput("A", FlowIOTypes.Number);
        this.addInput("B", FlowIOTypes.Number);

        this.addProperty("type", "+", FlowIOTypes.String);

        this.addWidget("combo", "Type", "+", (v) => {
            this.properties.type = v;
        }, {
            property: "type",
            values: Object.keys(controls)
        })

        this.addOutput("Result", FlowIOTypes.Number);
    }

    nodeToCode(generator: BaseGenerator): string {
        return `(${generator.valueToCode(this, 0)} ${controls[this.properties.type as keyof typeof controls]} ${generator.valueToCode(this, 1)})`
    }
}