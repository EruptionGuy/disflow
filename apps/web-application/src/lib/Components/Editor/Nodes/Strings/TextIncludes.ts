import { BaseNode, FlowIOTypes, BaseGenerator } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class TextIncludes extends BaseNode {

    static title: string = "Text Includes";
    static category: string = "Text Tools";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.TextTools);
        this.addInput("Text", FlowIOTypes.Any);
        this.addInput("Includes", FlowIOTypes.Any);
        this.addOutput("Boolean", FlowIOTypes.Boolean);

        this.addProperty("txt", "Your Text", FlowIOTypes.String);
        this.addWidget("text", "Text", "Your Text", (v: string) => {
            this.properties.txt = v;
        }, {
            property: "txt"
        })

        this.addProperty("includes", "a", FlowIOTypes.String);
        this.addWidget("text", "Includes", "a", (v: string) => {
            this.properties.includes = v;
        }, {
            property: "includes"
        })
    }

    nodeToCode(generator: BaseGenerator): string {
        const txt =
            this.properties.txt.trim() !== ""
                ? JSON.stringify(this.properties.txt)
                : `String(${generator.valueToCode(this, 0)})`;

        const includes =
            this.properties.includes.trim() !== ""
                ? JSON.stringify(this.properties.includes)
                : `String(${generator.valueToCode(this, 1)})`;
        
        return `(${txt}.includes(${includes}))`
    }
}