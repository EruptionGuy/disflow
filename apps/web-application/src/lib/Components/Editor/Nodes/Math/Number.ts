import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";

export class NumberNode extends BaseNode {
    static title: string = "Number";
    static category: string = "Maths";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.addProperty("number", 0, FlowIOTypes.Number)
        this.addWidget("number", "Number", 0, (v) => {
            this.properties.number = v;
        }, {
            property: "number"
        });
        this.addOutput("value", FlowIOTypes.Number);
    }

    nodeToCode(): string {
        return `${this.properties.number || 0}`;
    }
}