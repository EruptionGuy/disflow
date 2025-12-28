import { BaseNode, FlowIOTypes } from "@disflow-team/code-gen";

export class Text extends BaseNode {
    static title: string = "Text";
    static category: string = "Text Tools";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.addProperty("txt", "Your Text", FlowIOTypes.String);

        this.addWidget("text", "Text", "Your Text", (v) => {
            this.properties.txt = v;
        }, {
            property: "txt"
        });

        this.addOutput("out", FlowIOTypes.String);
    }

    nodeToCode(): string {
        return `"${this.properties.txt || "Your Text"}"`
    }
}