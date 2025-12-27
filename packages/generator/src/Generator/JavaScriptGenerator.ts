import type { LGraph } from "litegraph.js";
import { BaseNode, OnProgramStartNode, RootNode } from "../nodes";
import { BaseGenerator, GenerationError } from "./BaseGenerator";

export enum JavaScriptConstantStrings {
    Null = "null",
    Undefined = "undefined",
    NoOp = "// NO OPERATION"
}

export class JavaScriptGenerator extends BaseGenerator {
    valueToCode(node: BaseNode, inputIndex: number): string {
        const iNode = node.getInputNode(inputIndex) as BaseNode | null;
        const iInfo = node.getInputInfo(inputIndex);

        if (!iInfo || this.isExecutionPin(iInfo.type) || !iNode) {
            console.warn(`WARNING: Attemped to generate code for input ${inputIndex} of ${node.title} but input was not found or was a flow type.`);
            return JavaScriptConstantStrings.Null;
        }

        if (!this.hasGenerator(iNode)) {
            console.warn(`WARNING: Attemped to generate code for input ${inputIndex} of ${node.title} but input node was not registered with the JavaScript generator for code generation.`);
            return JavaScriptConstantStrings.Null;
        }

        return this.executeGeneratorFunction(iNode)!;
    }

    statementToCode(node: BaseNode, outputIndex: number): string {
        let finalCode = "";
        const oNodes = node.getOutputNodes(outputIndex) as BaseNode[];
        const oInfo = node.getOutputInfo(outputIndex);

        if (!oInfo || !this.isExecutionPin(oInfo.type) || oNodes.length === 0 || oInfo.links.length > 1) {
            console.warn(`WARNING: Attemped to generate statement code for output ${outputIndex} of ${node.title} but output was not found or was not a flow type or there was more than 1 way to flow which confused the engine.`);
            return JavaScriptConstantStrings.NoOp;
        }

        const oNode = oNodes[0];

        if (!this.hasGenerator(oNode)) {
            console.warn(`WARNING: Attemped to generate statement code for output ${outputIndex} of ${node.title} but output node was not registered with the JavaScript generator for code generation.`);
            return JavaScriptConstantStrings.NoOp;
        }

        finalCode = this.executeGeneratorFunction(oNode)!;

        finalCode += `\n${this.walkDownStream(oNode)}`;

        return node.indentExec ? this.indent(finalCode) : finalCode;
    }

    /**
     * Walk down all the "exec" path
     * @param node The starting node
     */
    walkDownStream(node: BaseNode) {
        const code: string[] = [];

        const visited = new Set<number>();

        let processingNode = this.getExecOutputNode(node);

        while(processingNode) {
            // safe guard against possible infinite loop in case graph contains a circle
            if(visited.has(processingNode.id)) break;
            visited.add(processingNode.id);
            
            if(!this.hasGenerator(processingNode)) {
                console.log(`WARNING: Node ${processingNode.title} does not have a generator function`)
                code.push(JavaScriptConstantStrings.NoOp);
                continue;
            }

            code.push(this.executeGeneratorFunction(processingNode)!);

            processingNode = this.getExecOutputNode(processingNode);
        }

        return code.join("\n")
    }

    graphToCode(graph: LGraph): string {
        let codeString: string[] = [];

        // @ts-expect-error
        const nodes = graph._nodes as BaseNode[];

        // filter all the 'roots'
        const roots = nodes.filter((node) => node instanceof RootNode);

        if (roots.length === 0) throw new GenerationError("Node roots were found in the graph.");

        const defaultRootIndex = roots.findIndex((node) => node instanceof OnProgramStartNode);

        if (defaultRootIndex === -1) throw new GenerationError("No 'On Program Start' root node found in the graph.");

        const defaultRoot = roots.splice(defaultRootIndex, 1)[0] as OnProgramStartNode;
        roots.unshift(defaultRoot);
        // process each root node
        for (const root of roots) {
            if(!this.hasGenerator(root)) {
                console.warn(`Cannot generate code for ${root.title}. This is a root node and nothing for this branch will be generated.`);
                continue;
            }

            codeString.push(this.executeGeneratorFunction(root)!);
        }

        return codeString.join("\n");
    }
}