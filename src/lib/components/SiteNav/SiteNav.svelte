<script lang="ts">
	import { onMount } from 'svelte';

	let menuOpen = false;
	let scrolled = false;

	onMount(() => {
		const update = () => (scrolled = window.scrollY > 24);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	const links = [
		{ label: 'Work', href: '/#work' },
		{ label: 'Experience', href: '/#experience' },
		{ label: 'Skills', href: '/#skills' },
		{ label: 'About', href: '/#about' }
	];
</script>

<header class:scrolled class="site-header">
	<nav class="site-nav shell" aria-label="Main navigation">
		<a class="brand" href="/" aria-label="Behrad Zabihi — home">
			<span>BZ</span>
			<i></i>
		</a>
		<div class:open={menuOpen} class="nav-links">
			{#each links as link}
				<a href={link.href} on:click={() => (menuOpen = false)}>{link.label}</a>
			{/each}
			<a class="nav-resume" href="/BehradZabihi.pdf" target="_blank" rel="noreferrer">
				Résumé
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
			</a>
		</div>
		<button class:open={menuOpen} class="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} on:click={() => (menuOpen = !menuOpen)}>
			<span></span><span></span>
		</button>
	</nav>
</header>

<style lang="scss">
	.site-header { position: fixed; top: 0; right: 0; left: 0; z-index: 50; border-bottom: 1px solid transparent; transition: background 180ms ease, border-color 180ms ease; }
	.site-header.scrolled { border-color: rgba(255,255,255,.07); background: rgba(8,10,14,.78); backdrop-filter: blur(18px); }
	.site-nav { display: flex; height: 76px; align-items: center; justify-content: space-between; }
	.brand { position: relative; display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,.16); border-radius: 12px; color: #f4f6f8; font-family: var(--font-display); font-size: 12px; font-weight: 800; letter-spacing: -.03em; text-decoration: none; }
	.brand i { position: absolute; right: 5px; bottom: 5px; width: 5px; height: 5px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 8px var(--lime); }
	.nav-links { display: flex; align-items: center; gap: 30px; }
	.nav-links a { color: #a5a9b3; font-size: 12px; font-weight: 500; text-decoration: none; }
	.nav-links a:hover { color: white; }
	.nav-resume { display: inline-flex; align-items: center; gap: 7px; margin-left: 8px; padding: 10px 14px; border: 1px solid rgba(255,255,255,.14); border-radius: 10px; color: white !important; }
	.nav-resume:hover { border-color: rgba(216,255,92,.5); background: rgba(216,255,92,.06); }
	.nav-resume svg { width: 14px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
	.menu-button { display: none; }

	@media (max-width: 720px) {
		.site-nav { height: 66px; }
		.menu-button { position: relative; z-index: 2; display: grid; place-content: center; gap: 6px; width: 42px; height: 42px; padding: 0; border: 1px solid rgba(255,255,255,.12); border-radius: 11px; background: #11141a; }
		.menu-button span { display: block; width: 17px; height: 1px; background: white; transition: transform 180ms ease; }
		.menu-button.open span:first-child { transform: translateY(3.5px) rotate(45deg); }
		.menu-button.open span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
		.nav-links { position: fixed; top: 0; right: 0; left: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 0; padding: 92px 22px 25px; border-bottom: 1px solid rgba(255,255,255,.09); background: rgba(8,10,14,.97); transform: translateY(-110%); transition: transform 220ms ease; }
		.nav-links.open { transform: translateY(0); }
		.nav-links a { width: 100%; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.07); font-size: 16px; }
		.nav-resume { width: auto !important; margin: 14px 0 0; padding: 11px 14px !important; border: 1px solid rgba(255,255,255,.14) !important; }
	}
</style>

