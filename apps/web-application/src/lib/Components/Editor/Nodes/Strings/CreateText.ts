import { BaseNode, FlowIOTypes, BaseGenerator } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class CreateText extends BaseNode {

    static title: string = "Create Text With";
    static category: string = "Text Tools";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.TextTools);
        this.addInput("A", FlowIOTypes.Any);
        this.addInput("B", FlowIOTypes.Any);
        this.addOutput("Text", FlowIOTypes.String);

        this.addProperty("A", "Your Text", FlowIOTypes.String);
        this.addWidget("text", "A", "Your Text", (v: string) => {
            this.properties.A = v;
        }, {
            property: "A"
        })

        this.addProperty("B", "Your Text", FlowIOTypes.String);
        this.addWidget("text", "B", "Your Text", (v: string) => {
            this.properties.B = v;
        }, {
            property: "B"
        })
    }

    nodeToCode(generator: BaseGenerator): string {
        const A =
            this.properties.A.trim() !== ""
                ? JSON.stringify(this.properties.A)
                : `String(${generator.valueToCode(this, 0)})`;

        const B =
            this.properties.A.trim() !== ""
                ? JSON.stringify(this.properties.A)
                : `String(${generator.valueToCode(this, 1)})`;
        
        return `(${A} + ${B})`
    }
}