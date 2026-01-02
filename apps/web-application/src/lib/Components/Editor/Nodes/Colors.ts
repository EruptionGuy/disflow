import { FlowIOTypes } from "@disflow-team/code-gen";
import { LiteGraph } from "litegraph.js";

// LiteGraph.NODE_TEXT_COLOR = "#FFFFFF";
// LiteGraph.NODE_TITLE_COLOR = "#FFFFFF";

// LiteGraph.NODE_DEFAULT_BGCOLOR = "#111111";
// LiteGraph.NODE_DEFAULT_BOXCOLOR = "#000000";

// LiteGraph.LINK_COLOR = "#E0E0E0";
// LiteGraph.EVENT_LINK_COLOR = "#FFFFFF";
// LiteGraph.CONNECTING_LINK_COLOR = "#AAAAAA";

LiteGraph.NODE_TEXT_COLOR = "#FFFFFF";
LiteGraph.NODE_TITLE_COLOR = "#FFFFFF";
LiteGraph.NODE_DEFAULT_BOXCOLOR = "#0E0E0E";
LiteGraph.NODE_DEFAULT_BGCOLOR = "#1A1A1A";
LiteGraph.EVENT_LINK_COLOR = "#FFFFFF";
LiteGraph.LINK_COLOR = "#CFCFCF";


export enum NodeCategoryColor {
    Events = "#C83A3A",
    Comparison = "#B8961E",
    Variables = "#8E5ACF",
    Control = "#3F7FCC",
    Console = "#2FA59A",
    Maths = "#2FBF73",
    TextTools = "#C97A2B"
}

export enum FlowIOColor {
    // 🟠 Text / manipulation → Text Tools
    String  = "#F29E4C",
  
    // 🟢 Numeric / precision → Maths
    Number  = "#3DDC84",
  
    // 🔵 Structured data → Variables / Control
    Object  = "#4C8DFF",
  
    // 🟣 Collections / containers → Variables
    Array   = "#A66BFF",
  
    // ⚪ Neutral / unknown
    Any     = "#9CA3AF",
  
    // 🔴 Conditionals / branching → Comparison
    Boolean = "#FF5C5C",
  
    // 🔴 Execution / signals → Events
    Flow    = "#E5484D"
  }
  