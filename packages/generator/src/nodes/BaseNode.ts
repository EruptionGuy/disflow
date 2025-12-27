import { LGraphNode, LiteGraph } from "litegraph.js";
import { BaseGenerator } from "../Generator";

export abstract class BaseNode extends LGraphNode {
    static title: string;
    static category: string;
    static noFlows = false;

    title: string;
    category: string;
    indentExec = true;

    constructor() {
        super();

        const childNode = (this.constructor as typeof BaseNode);

        if (!childNode.noFlows) {
            this.addInput("exec", LiteGraph.ACTION);
            this.addOutput("exec", LiteGraph.EVENT);
        }

        this.onBuild();

        this.title = childNode.title;
        this.category = childNode.category;
    }

    static buildReferenceName() {
        return `${this.category}/${this.title}`;
    }

    static forEngine(engine: BaseGenerator) {
        engine.nodes.set(this.buildReferenceName(), (node, gen) => {
            return node.nodeToCode(gen);
        });
    }

    indentExecutionFlow(indent: boolean) {
        this.indentExec = indent;
    }

    buildReferenceName() {
        return `${this.category}/${this.title}`;
    }

    /**
     * Called when the node is built. Handle names and categories here.
     */
    protected abstract onBuild(): void;

    abstract nodeToCode(generator: BaseGenerator): string;
}