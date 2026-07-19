<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import createSanitizer from 'dompurify';

	export let content: string;
	let container: HTMLDivElement;

	onMount(() => {
		const sanitizer = createSanitizer(window);
		container.innerHTML = sanitizer.sanitize(marked.parse(content, { mangle: false, headerIds: false }));
	});
</script>

<div class="chat-markdown" bind:this={container} />
