import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class SetVariable extends BaseNode {
    static title: string = "Set Variable";
    static category: string = "Variables";

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.Variables);
        this.addProperty("name", "Name", FlowIOTypes.String);
        this.addWidget("text", "Name", "myVariable", (v: string) => {
            if(v.trim() === "") this.addInput("name", FlowIOTypes.String);

            this.properties.name = v;
        }, {
            property: "name"
        })
        this.addInput("value", FlowIOTypes.Any);
    }

    nodeToCode(generator: BaseGenerator): string {
        return `${this.properties.name} = ${generator.valueToCode(this, 1)};`;
    }
}