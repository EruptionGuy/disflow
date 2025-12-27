import { BaseGenerator } from "../Generator";
import { RootNode } from "./RootNode";

// on program start node
export class OnProgramStartNode extends RootNode {
    static title = "On Program Start";
    static category = "Events";
    static noFlows: boolean = true;

    nodeToCode(generator: BaseGenerator): string {
        return `// Program Start\n${generator.statementToCode(this, 0)}`;
    }
}