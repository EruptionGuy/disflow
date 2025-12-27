<script lang="ts">
	import { onMount } from 'svelte';
	import { createEditor, getGraph } from '@disflow-team/utils';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/vs.css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import 'litegraph.js/css/litegraph.css';
	import { LiteGraph } from 'litegraph.js';

	let code = '';

	LiteGraph.clearRegisteredTypes();
	hljs.registerLanguage('javascript', javascript);

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		createEditor(
			canvas,
			{},
			{
				autoresize: false
			}
		);
	});
</script>

<div class="flex h-[calc(100vh-5rem)] w-screen">
	<canvas bind:this={canvas} class="h-full w-1/2"></canvas>
	<div class="bg-gray-950 h-full w-1/2">
		<button
			class="ml-3 bg-blue-950 rounded-xl mt-3 p-3 text-white font-bold cursor-pointer hover:bg-blue-900 transition-colors"
			on:click={() => {
				// TODO: Generate Code
			}}
		>
			Generate Code
		</button>

		<div class="mt-5 overflow-auto p-3 text-gray-400 bg-gray-900 h-9/12 w-11/12 rounded-lg mx-auto">
			<pre><code>{@html code}</code></pre>
		</div>
	</div>
</div>
