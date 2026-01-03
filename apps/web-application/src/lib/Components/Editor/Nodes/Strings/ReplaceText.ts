import { BaseNode, FlowIOTypes, BaseGenerator } from "@disflow-team/code-gen";
import { NodeCategoryColor } from "../Colors";
import { LiteGraph } from "litegraph.js";

export class ReplaceText extends BaseNode {

    static title: string = "Replace Text";
    static category: string = "Text Tools";
    static noFlows: boolean = true;


    protected onBuild(): void {
        this.setNodeColor(NodeCategoryColor.TextTools);
        this.addInput("Text", FlowIOTypes.Any);
        this.addInput("Replace", FlowIOTypes.Any);
        this.addInput("With", FlowIOTypes.Any);
        this.addOutput("Text", FlowIOTypes.String);

        this.addProperty("intext", "Your Text", FlowIOTypes.String);
        this.addWidget("text", "In Text", "Your Text", (v: string) => {
            // if(v.trim() === "") this.addInput("content", FlowIOTypes.Any);
            // else this.removeInput(1);
            this.properties.intext = v;
        }, {
            property: "intext"
        })

        this.addProperty("replace", "Your", FlowIOTypes.String);
        this.addWidget("text", "Replace", "Your", (v: string) => {
            this.properties.replace = v;
        }, {
            property: "replace"
        })

        this.addProperty("with", "My", FlowIOTypes.String);
        this.addWidget("text", "With", "My", (v: string) => {
            this.properties.with = v;
        }, {
            property: "with"
        })
    }

    nodeToCode(generator: BaseGenerator): string {
        const inText =
            this.properties.intext.trim() !== ""
                ? JSON.stringify(this.properties.intext)
                : `String(${generator.valueToCode(this, 0)})`;
    
        const replace =
            this.properties.replace.trim() !== ""
                ? JSON.stringify(this.properties.replace)
                : `String(${generator.valueToCode(this, 1)})`;
    
        const withText =
            this.properties.with.trim() !== ""
                ? JSON.stringify(this.properties.with)
                : `String(${generator.valueToCode(this, 2)})`;
    
        return `${inText}.replaceAll(${replace}, ${withText});`;
    }
    
}