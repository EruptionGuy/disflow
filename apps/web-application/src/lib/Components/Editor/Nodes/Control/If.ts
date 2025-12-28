import { BaseGenerator, BaseNode, FlowIOTypes } from "@disflow-team/code-gen";
import { LiteGraph } from "litegraph.js";

export class If extends BaseNode {
    static title: string = "If";
    static category: string = "Control";

    protected onBuild(): void {
        this.addInput("condition", FlowIOTypes.Boolean);

        this.addOutput("then", FlowIOTypes.Flow);

        this.addProperty("useElse", false, "boolean");

        this.addWidget("toggle", "Use Else", this.properties.useElse as boolean, (value) => {
            this.setProperty("useElse", value as boolean);
            this.updateElseOutput();
        })
    }

    updateElseOutput() {
        // 0 is execution pin, 1 is then and 2 is else
        const elseIndex = 2;

        if (this.properties.useElse && this.outputs.length < 3) {
            this.addOutput("else", FlowIOTypes.Flow);
        } else if (this.outputs.length > 2) {
            this.removeOutput(elseIndex);
        }
    }

    nodeToCode(generator: BaseGenerator): string {
        const condition = generator.valueToCode(this, 1);
        const then = generator.statementToCode(this, 1);
        let code = `if(${condition}) {\n${then}\n}`;

        if (this.properties.useElse && this.outputs.at(2) && Number(this.outputs.at(2)!.links?.length) > 0) {
            code += ` else {\n${generator.statementToCode(this, 2)}\n}`;
        }

        return code;
    }
}