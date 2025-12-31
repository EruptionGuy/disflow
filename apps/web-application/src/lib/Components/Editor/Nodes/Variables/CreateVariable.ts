import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

const controls = {
    "let": "let",
    "const": "const",
    "var": "var",
    "set": "",
}

export class CreateVariable extends BaseNode {
    static title: string = "Create Variable";
    static category: string = "Variables";

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.Variables);
        this.addProperty("name", "Name", FlowIOTypes.String);
        this.addProperty("keyword", "let", FlowIOTypes.String);
        this.addWidget('combo', "Keyword", "let", (value) => {
            this.properties.keyword = value;
        }, {
            values: Object.keys(controls),
            property: "keyword"
        })
        this.addWidget("text", "Name", "myVariable", (v: string) => {
            if(v.trim() === "") this.addInput("name", FlowIOTypes.String);

            this.properties.name = v;
        }, {
            property: "name"
        })
        this.addInput("value", FlowIOTypes.Any);
    }

    nodeToCode(generator: BaseGenerator): string {
        if (this.inputs[1].link != null) {
            return `${controls[this.properties.keyword as keyof typeof controls]} ${this.properties.name} = ${generator.valueToCode(this, 1)};`;
        } else
            return `${controls[this.properties.keyword as keyof typeof controls]} ${this.properties.name};`;
    }
}