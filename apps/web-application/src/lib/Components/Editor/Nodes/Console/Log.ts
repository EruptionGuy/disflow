import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class Log extends BaseNode {
    static title: string = "Log";
    static category: string = "Console";

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.Console);
        this.addInput("Content", FlowIOTypes.Any);
        this.addProperty("content", "Hello, World!", FlowIOTypes.String);

        this.addWidget("text", "Content", "Hello, World!", (v: string) => {
            // if(v.trim() === "") this.addInput("content", FlowIOTypes.Any);
            // else this.removeInput(1);

            this.properties.content = v;
        }, {
            property: "content"
        })
    }

    nodeToCode(generator: BaseGenerator): string {
        const logValue = this.properties.content.trim() === "" ? generator.valueToCode(this, 1) : `"${this.properties.content.trim()}"`;

        return `console.log(${logValue});`;
    }
}