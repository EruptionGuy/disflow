import { BaseNode, BaseGenerator } from "@disflow-team/code-gen";

export class AddNode extends BaseNode {
    static title = "Add";
    static category = "math";

    protected onBuild() {
        this.addInput("A", "number");
        this.addInput("B", "number");
        
        this.addOutput("sum", "number");
    }

    nodeToCode(generator: BaseGenerator): string {
        const valA = generator.valueToCode(this, 1);
        const valB = generator.valueToCode(this, 2);

        const outputVar = `node_${this.id}_result`;

        // Return the statement
        return `const ${outputVar} = ${valA} + ${valB};`;
    }
}