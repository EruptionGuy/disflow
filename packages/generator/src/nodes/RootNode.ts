import { BaseNode } from "./BaseNode";
import { LiteGraph } from "litegraph.js";

export abstract class RootNode extends BaseNode {
    protected onBuild(): void {
        this.indentExecutionFlow(false);
        this.addOutput("Start", LiteGraph.EVENT);
    }
}