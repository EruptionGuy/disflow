import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

const controls = {
    "let": "let",
    "const": "const",
    "var": "var",
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
        const keyword = controls[this.properties.keyword as keyof typeof controls];
        const valueInput = this.inputs.find(i => i.name === "value");
        const hasValue = valueInput?.link != null;
    
        if (keyword === "const" && !hasValue) {
            return `const ${this.properties.name} = undefined;`;
        }
    
        if (hasValue) {
            return `${keyword} ${this.properties.name} = ${generator.valueToCode(this, 1)};`;
        }
    
        return `${keyword} ${this.properties.name};`;
    }
    
}