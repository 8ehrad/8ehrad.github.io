<script lang="ts">
	import 'uno.css';
	import '$lib/index.scss';
	import SiteNav from '$lib/components/SiteNav/SiteNav.svelte';
	import ChatWidget from '$lib/components/ChatWidget/ChatWidget.svelte';
</script>

<div class="site-frame">
	<SiteNav />
	<main><slot /></main>
	<ChatWidget />
</div>
