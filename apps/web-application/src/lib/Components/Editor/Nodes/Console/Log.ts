import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";

export class Log extends BaseNode {
    static title: string = "Log";
    static category: string = "Console";

    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.Actions);
        this.addInput("content", FlowIOTypes.Any);
    }

    nodeToCode(generator: BaseGenerator): string {
        const logValue = generator.valueToCode(this, 1);

        return `console.log(${logValue});`;
    }
}