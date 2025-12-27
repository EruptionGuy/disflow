import type { LGraph } from "litegraph.js";
import { BaseNode } from "../nodes";
import { LiteGraph } from "litegraph.js";

export class GenerationError extends Error {}

export abstract class BaseGenerator {
    nodes = new Map<string, (node: BaseNode, gen: BaseGenerator) => string>();

    abstract valueToCode(node: BaseNode, inputIndex: number): string;
    abstract statementToCode(node: BaseNode, inputIndex: number): string;
    abstract graphToCode(graph: LGraph): string;

    isExecutionPin(type: string | number): boolean {
        return type === LiteGraph.ACTION || type === LiteGraph.EVENT || type === -1;
    }

    indent(str: string) {
        return str.split("\n").map(l => `\t${l}`).join("\n");
    }

    getExecOutputNode(node: BaseNode): BaseNode | null {
        const outputData = node.outputs.findIndex((output) => output.name === "exec" && this.isExecutionPin(output.type));
        if (outputData === -1) return null;
        const outputNode = node.getOutputNodes(outputData) as BaseNode[] | null;

        return outputNode && outputNode.length > 0 ? outputNode[0] : null;
    }

    hasGenerator(node: BaseNode) {
        return this.nodes.has(node.buildReferenceName());
    }

    executeGeneratorFunction(node: BaseNode) {
        const refName = this.nodes.get(node.buildReferenceName());

        if(refName) return refName(node, this);
    }
}