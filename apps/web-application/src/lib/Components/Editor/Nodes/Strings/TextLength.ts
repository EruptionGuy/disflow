import { BaseNode, FlowIOTypes, BaseGenerator } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class TextLength extends BaseNode {
    static title: string = "Text Length";
    static category: string = "Text Tools";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.TextTools);

        this.addInput("Text", FlowIOTypes.Any);
        this.addProperty("txt", "Your Text", FlowIOTypes.String);
        this.addWidget("text", "Text", "Your Text", (v: string) => {
            this.properties.txt = v;
        }, {
            property: "txt"
        })

        this.addOutput("Text", FlowIOTypes.String);
    }

    nodeToCode(generator: BaseGenerator): string {
        const text =
            this.properties.txt.trim() !== ""
                ? JSON.stringify(this.properties.txt)
                : `String(${generator.valueToCode(this, 0)})`;
        return `${text}.length()`;
    }
}