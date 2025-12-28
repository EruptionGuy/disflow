import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";

export class Log extends BaseNode {
    static title: string = "Log";
    static category: string = "Console";

    protected onBuild(): void {
        this.addInput("content", FlowIOTypes.Any);
    }

    nodeToCode(generator: BaseGenerator): string {
        const logValue = generator.valueToCode(this, 1);

        return `console.log(${logValue});`;
    }
}