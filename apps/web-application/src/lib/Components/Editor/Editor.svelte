<script lang="ts">
	import { onMount } from 'svelte';
	import { createEditor, getGraph } from '@disflow-team/utils';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/vs.css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import 'litegraph.js/css/litegraph.css';
	import { LiteGraph } from 'litegraph.js';
	import { JavaScriptGenerator, OnProgramStartNode } from "@disflow-team/code-gen"
	import * as Nodes from "./Nodes";

	let code = '';

	LiteGraph.clearRegisteredTypes();
	hljs.registerLanguage('javascript', javascript);

	const engine = new JavaScriptGenerator();

	OnProgramStartNode.forEngine(engine);
	LiteGraph.registerNodeType("Events/Start", OnProgramStartNode)

	for(const Node of Object.values(Nodes)) {
		Node.forEngine(engine);
		LiteGraph.registerNodeType(Node.buildReferenceName(), Node);
	}

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		const { graph } = createEditor(
			canvas,
			{},
			{
				autoresize: false
			}
		);

		// @ts-ignore
		if(graph._nodes.length === 0) {
			const node = new OnProgramStartNode();

			node.pos = [canvas.width / 4, canvas.height / 2];

			graph.add(node);
		}
	});
</script>

<div class="flex h-[calc(100vh-5rem)] w-screen">
	<canvas bind:this={canvas} class="h-full w-1/2"></canvas>
	<div class="bg-gray-950 h-full w-1/2">
		<button
			class="ml-3 bg-blue-950 rounded-xl mt-3 p-3 text-white font-bold cursor-pointer hover:bg-blue-900 transition-colors"
			on:click={() => {
				code = hljs.highlight(engine.graphToCode(getGraph()), {
					language: "javascript"
				}).value;
			}}
		>
			Generate Code
		</button>

		<div class="mt-5 overflow-auto p-3 text-gray-400 bg-gray-900 h-9/12 w-11/12 rounded-lg mx-auto">
			<pre><code>{@html code}</code></pre>
		</div>
	</div>
</div>
