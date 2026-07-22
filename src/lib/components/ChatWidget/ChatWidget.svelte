<script lang="ts">
	import { onMount } from 'svelte';
	import ChatMessage from './ChatMessage.svelte';

	type Message = {
		id: string;
		role: 'user' | 'assistant';
		content: string;
		error?: boolean;
	};

	const API_URL = import.meta.env.VITE_TWIN_API_URL || 'https://6a17qjsrw3.execute-api.eu-west-2.amazonaws.com';
	const prompts = [
		'What data science problems has Behrad worked on?',
		'Tell me about his AI engineering work',
		'Which project best demonstrates his technical range?',
		'What achievement is Behrad most proud of?'
	];

	let open = false;
	let input = '';
	let loading = false;
	let sessionId = '';
	let messages: Message[] = [];
	let textarea: HTMLTextAreaElement;
	let scrollArea: HTMLDivElement;

	const uid = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

	onMount(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && open) open = false;
		};
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});

	$: if (open) {
		setTimeout(() => textarea?.focus({ preventScroll: true }), 80);
	}

	$: if (messages.length || loading) {
		setTimeout(() => scrollArea?.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' }), 0);
	}

	async function send(override?: string) {
		const content = (override ?? input).trim();
		if (!content || loading) return;

		messages = [...messages, { id: uid(), role: 'user', content }];
		input = '';
		loading = true;

		try {
			const response = await fetch(`${API_URL}/chat`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: content, session_id: sessionId || undefined })
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.detail || 'The twin is temporarily unavailable.');

			sessionId = data.session_id;
			messages = [...messages, { id: uid(), role: 'assistant', content: data.response }];
		} catch (error) {
			messages = [
				...messages,
				{
					id: uid(),
					role: 'assistant',
					content: error instanceof Error ? error.message : 'The twin is temporarily unavailable. Please try again.',
					error: true
				}
			];
		} finally {
			loading = false;
			setTimeout(() => textarea?.focus({ preventScroll: true }), 50);
		}
	}

	function clearChat() {
		messages = [];
		sessionId = '';
		input = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			send();
		}
	}
</script>

{#if open}
	<button class="chat-backdrop" aria-label="Close Behrad's digital twin" on:click={() => (open = false)} />
	<aside class="chat-panel" aria-label="Chat with Behrad's digital twin" aria-live="polite">
		<header class="chat-header">
			<div class="twin-mark" aria-hidden="true">
				<span>B</span>
				<i></i>
			</div>
			<div class="chat-identity">
				<strong>Behrad’s digital twin</strong>
				<span><i></i> Online · Grounded in real experience</span>
			</div>
			<div class="chat-actions">
				<button aria-label="Clear conversation" title="Clear conversation" on:click={clearChat} disabled={!messages.length || loading}>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15M10 10v7m4-7v7" /></svg>
				</button>
				<button aria-label="Close chat" title="Close chat" on:click={() => (open = false)}>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
				</button>
			</div>
		</header>

		<div class="chat-body" bind:this={scrollArea}>
			{#if messages.length === 0}
				<div class="chat-welcome">
					<div class="welcome-glyph"><span></span><span></span><span></span></div>
					<p class="eyebrow">EXPLORE THE WORK BEHIND THE PORTFOLIO</p>
					<h2>Curious about the details?</h2>
					<p>I know Behrad’s experience, projects and working style. Ask something specific — I’ll keep it grounded.</p>
					<div class="prompt-grid">
						{#each prompts as prompt}
							<button on:click={() => send(prompt)} disabled={loading}>
								<span>{prompt}</span>
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
							</button>
						{/each}
					</div>
				</div>
			{/if}

			{#each messages as message (message.id)}
				<div class:assistant={message.role === 'assistant'} class:user={message.role === 'user'} class="message-row">
					{#if message.role === 'assistant'}<div class="message-avatar">B</div>{/if}
					<div class:error={message.error} class="message-bubble">
						{#if message.role === 'assistant'}
							<ChatMessage content={message.content} />
						{:else}
							<p>{message.content}</p>
						{/if}
					</div>
				</div>
			{/each}

			{#if loading}
				<div class="message-row assistant">
					<div class="message-avatar">B</div>
					<div class="message-bubble typing"><span></span><span></span><span></span></div>
				</div>
			{/if}
		</div>

		<footer class="chat-composer">
			<div class="composer-box">
				<textarea bind:this={textarea} bind:value={input} on:keydown={handleKeydown} rows="1" maxlength="2000" placeholder="Ask about Behrad…" aria-label="Message Behrad's digital twin" disabled={loading} />
				<button class="send-button" aria-label="Send message" on:click={() => send()} disabled={!input.trim() || loading}>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14" /></svg>
				</button>
			</div>
			<p>AI answers from curated professional context · Enter to send</p>
		</footer>
	</aside>
{/if}

<button class:open class="chat-launcher" aria-label={open ? "Close Behrad's digital twin" : "Chat with Behrad's digital twin"} aria-expanded={open} on:click={() => (open = !open)}>
	{#if open}
		<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
	{:else}
		<div class="launcher-logo"><span>B</span><i></i></div>
		<span class="launcher-label"><strong>Ask my twin</strong><small>Explore my experience</small></span>
		<svg class="launcher-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
	{/if}
</button>

<style lang="scss">
	.chat-launcher {
		position: fixed;
		right: 28px;
		bottom: 26px;
		z-index: 80;
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 66px;
		padding: 8px 14px 8px 8px;
		border: 1px solid rgba(216, 255, 92, 0.35);
		border-radius: 18px;
		background: rgba(16, 18, 24, 0.92);
		color: #f5f6f8;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.38), inset 0 1px rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(18px);
		cursor: pointer;
		transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
	}

	.chat-launcher:hover { transform: translateY(-3px); border-color: #d8ff5c; background: #151820; }
	.chat-launcher.open { width: 52px; min-height: 52px; justify-content: center; padding: 0; border-radius: 50%; }
	.chat-launcher > svg { width: 21px; fill: none; stroke: currentColor; stroke-width: 1.8; }
	.launcher-logo, .twin-mark {
		position: relative;
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: #d8ff5c;
		color: #0c0e12;
		font-family: var(--font-display);
		font-size: 21px;
		font-weight: 800;
	}

	.launcher-logo i, .twin-mark i {
		position: absolute;
		right: -2px;
		bottom: -2px;
		width: 11px;
		height: 11px;
		border: 3px solid #101218;
		border-radius: 50%;
		background: #7c5cff;
	}

	.launcher-label { display: flex; flex-direction: column; align-items: flex-start; min-width: 118px; }
	.launcher-label strong { font-size: 13px; letter-spacing: 0.01em; }
	.launcher-label small { margin-top: 2px; color: #9499a8; font-size: 10px; }
	.launcher-arrow { color: #d8ff5c; }

	.chat-backdrop {
		position: fixed;
		inset: 0;
		z-index: 69;
		border: 0;
		background: rgba(3, 5, 8, 0.5);
		backdrop-filter: blur(4px);
	}

	.chat-panel {
		position: fixed;
		right: 28px;
		bottom: 108px;
		z-index: 75;
		display: flex;
		flex-direction: column;
		width: min(440px, calc(100vw - 32px));
		height: min(720px, calc(100vh - 140px));
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.11);
		border-radius: 24px;
		background: #11141a;
		color: #eef0f4;
		box-shadow: 0 40px 100px rgba(0, 0, 0, 0.55);
		animation: chat-in 240ms cubic-bezier(.2,.8,.2,1);
	}

	@keyframes chat-in { from { opacity: 0; transform: translateY(16px) scale(.98); } }
	.chat-header { display: flex; align-items: center; gap: 12px; padding: 16px; border-bottom: 1px solid rgba(255,255,255,.08); background: rgba(17,20,26,.94); }
	.twin-mark { width: 42px; height: 42px; border-radius: 12px; font-size: 18px; }
	.chat-identity { min-width: 0; display: flex; flex: 1; flex-direction: column; }
	.chat-identity strong { font-size: 14px; }
	.chat-identity > span { display: flex; align-items: center; gap: 6px; margin-top: 4px; color: #8f95a4; font-size: 10px; white-space: nowrap; }
	.chat-identity > span i { width: 6px; height: 6px; border-radius: 50%; background: #d8ff5c; box-shadow: 0 0 10px #d8ff5c; }
	.chat-actions { display: flex; gap: 4px; }
	.chat-actions button { display: grid; place-items: center; width: 34px; height: 34px; padding: 0; border: 1px solid transparent; border-radius: 9px; background: transparent; color: #8f95a4; cursor: pointer; }
	.chat-actions button:hover { border-color: rgba(255,255,255,.1); background: rgba(255,255,255,.05); color: white; }
	.chat-actions button:disabled { opacity: .3; cursor: default; }
	.chat-actions svg { width: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.6; }

	.chat-body { flex: 1; overflow-y: auto; padding: 20px 16px; background: radial-gradient(circle at 80% 0%, rgba(124,92,255,.1), transparent 32%), #0d1015; scrollbar-width: thin; }
	.chat-welcome { display: flex; min-height: 100%; flex-direction: column; justify-content: center; padding: 18px 2px; }
	.welcome-glyph { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin-bottom: 24px; }
	.welcome-glyph span { display: block; width: 7px; border-radius: 10px; background: #d8ff5c; }
	.welcome-glyph span:nth-child(1) { height: 17px; }
	.welcome-glyph span:nth-child(2) { height: 32px; background: #7c5cff; }
	.welcome-glyph span:nth-child(3) { height: 23px; }
	.eyebrow { margin: 0 0 10px; color: #d8ff5c; font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; }
	.chat-welcome h2 { margin: 0; font-family: var(--font-display); font-size: 29px; letter-spacing: -.04em; }
	.chat-welcome > p:not(.eyebrow) { max-width: 360px; margin: 12px 0 22px; color: #969cab; font-size: 13px; line-height: 1.65; }
	.prompt-grid { display: grid; gap: 8px; }
	.prompt-grid button { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 14px; border: 1px solid rgba(255,255,255,.09); border-radius: 12px; background: rgba(255,255,255,.035); color: #dfe2e8; font: inherit; font-size: 12px; text-align: left; cursor: pointer; }
	.prompt-grid button:hover { border-color: rgba(216,255,92,.35); background: rgba(216,255,92,.06); color: white; }
	.prompt-grid svg { flex: 0 0 auto; width: 16px; fill: none; stroke: #d8ff5c; stroke-width: 1.7; }

	.message-row { display: flex; align-items: flex-start; gap: 9px; margin: 0 0 18px; }
	.message-row.user { justify-content: flex-end; }
	.message-avatar { display: grid; place-items: center; flex: 0 0 auto; width: 27px; height: 27px; border-radius: 8px; background: #d8ff5c; color: #0c0e12; font-size: 11px; font-weight: 800; }
	.message-bubble { max-width: 83%; padding: 11px 13px; border: 1px solid rgba(255,255,255,.08); border-radius: 5px 15px 15px 15px; background: #181c24; color: #d9dde5; font-size: 12px; line-height: 1.65; }
	.user .message-bubble { border: 0; border-radius: 15px 15px 5px 15px; background: #7c5cff; color: white; }
	.message-bubble p { margin: 0; }
	.message-bubble.error { border-color: rgba(255,116,116,.25); background: rgba(255,116,116,.08); color: #ffb5b5; }
	.typing { display: flex; gap: 4px; padding: 15px; }
	.typing span { width: 5px; height: 5px; border-radius: 50%; background: #9aa0ae; animation: pulse 1s infinite alternate; }
	.typing span:nth-child(2) { animation-delay: .2s; }
	.typing span:nth-child(3) { animation-delay: .4s; }
	@keyframes pulse { to { opacity: .25; transform: translateY(-3px); } }

	:global(.chat-markdown p) { margin: 0 0 10px; }
	:global(.chat-markdown p:last-child) { margin-bottom: 0; }
	:global(.chat-markdown ul), :global(.chat-markdown ol) { margin: 8px 0; padding-left: 18px; }
	:global(.chat-markdown li) { margin: 4px 0; }
	:global(.chat-markdown strong) { color: #fff; font-weight: 650; }
	:global(.chat-markdown a) { color: #d8ff5c; text-underline-offset: 3px; }
	:global(.chat-markdown h1), :global(.chat-markdown h2), :global(.chat-markdown h3) { margin: 12px 0 6px; color: white; font-size: 13px; }
	:global(.chat-markdown code) { border-radius: 4px; background: #252a34; padding: 2px 4px; font-family: var(--font-mono); font-size: 10px; }

	.chat-composer { padding: 12px 14px 10px; border-top: 1px solid rgba(255,255,255,.08); background: #11141a; }
	.composer-box { display: flex; align-items: flex-end; gap: 8px; padding: 7px 7px 7px 13px; border: 1px solid rgba(255,255,255,.12); border-radius: 14px; background: #0c0f14; }
	.composer-box:focus-within { border-color: rgba(216,255,92,.55); box-shadow: 0 0 0 3px rgba(216,255,92,.06); }
	.composer-box textarea { flex: 1; min-height: 34px; max-height: 104px; resize: none; border: 0; outline: 0; background: transparent; color: white; font: inherit; font-size: 13px; line-height: 1.45; }
	.composer-box textarea::placeholder { color: #6d7380; }
	.send-button { display: grid; place-items: center; flex: 0 0 auto; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 10px; background: #d8ff5c; color: #101218; cursor: pointer; }
	.send-button:disabled { background: #262b35; color: #5e6470; cursor: default; }
	.send-button svg { width: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.6; }
	.chat-composer > p { margin: 7px 0 0; color: #5f6571; font-family: var(--font-mono); font-size: 8px; text-align: center; }

	@media (max-width: 600px) {
		.chat-panel { inset: 10px 10px 82px; width: auto; height: auto; border-radius: 20px; }
		.chat-launcher { right: 16px; bottom: 15px; }
		.chat-launcher:not(.open) { min-height: 58px; }
		.launcher-logo { width: 42px; height: 42px; }
		.launcher-label { display: none; }
		.launcher-arrow { display: none; }
	}

	@media (prefers-reduced-motion: reduce) {
		.chat-panel, .typing span { animation: none; }
		.chat-launcher { transition: none; }
	}
</style>
