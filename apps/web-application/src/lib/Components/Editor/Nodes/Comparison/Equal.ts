import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";

export class Equal extends BaseNode {
    static title: string = "Equal";
    static category: string = "Comparison";
    static noFlows: boolean = true;

    protected onBuild(): void {
        this.addInput("A", FlowIOTypes.Any);
        this.addInput("B", FlowIOTypes.Any);

        this.addOutput("out", FlowIOTypes.Boolean);
    }

    nodeToCode(generator: BaseGenerator): string {
        const a = generator.valueToCode(this, 0);
        const b = generator.valueToCode(this, 1);

        return `${a} === ${b}`;
    }
}