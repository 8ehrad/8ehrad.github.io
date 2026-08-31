<script lang="ts">
	import { onMount } from 'svelte';
	import 'uno.css';
	import '$lib/index.scss';
	import SiteNav from '$lib/components/SiteNav/SiteNav.svelte';
	import ChatWidget from '$lib/components/ChatWidget/ChatWidget.svelte';
	import { initialiseRum } from '$lib/rum';

	onMount(() => void initialiseRum());
</script>

<div class="site-frame">
	<SiteNav />
	<main><slot /></main>
	<ChatWidget />
</div>
