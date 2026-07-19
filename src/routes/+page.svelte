<script lang="ts">
	import { education, experience, principles, profile, projects, proofPoints, skillGroups } from '$lib/data/portfolio';

	const openTwin = () => (document.querySelector<HTMLButtonElement>('.chat-launcher')?.click());
</script>

<svelte:head>
	<title>Behrad Zabihi — Data Scientist & AI Engineer</title>
	<meta name="description" content="Behrad Zabihi builds production machine learning, data and agentic AI systems. Explore his work or speak with his AI digital twin." />
	<meta property="og:title" content="Behrad Zabihi — Data Scientist & AI Engineer" />
	<meta property="og:description" content="Production ML, data platforms and agentic AI — built to work in the real world." />
</svelte:head>

<section class="hero shell">
	<div class="hero-orbit orbit-one"></div>
	<div class="hero-orbit orbit-two"></div>
	<div class="hero-copy">
		<div class="status-pill"><i></i> Building production AI in Manchester</div>
		<p class="kicker">DATA SCIENTIST <span>×</span> AI ENGINEER</p>
		<h1>Turning ambitious AI ideas into <em>working systems.</em></h1>
		<p class="hero-summary">{profile.summary}</p>
		<div class="hero-actions">
			<a class="button primary" href="#work">
				Explore selected work
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
			</a>
			<button class="button secondary" on:click={openTwin}>
				<span class="mini-twin">B<i></i></span>
				Ask my digital twin
			</button>
		</div>
		<p class="work-auth"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 12 3 3 7-7" /><circle cx="12" cy="12" r="9" /></svg>{profile.availability}</p>
	</div>

	<div class="hero-visual" aria-label="Profile of Behrad Zabihi">
		<div class="portrait-frame">
			<div class="portrait-index">01 / PROFILE</div>
			<img src="/behrad.jpg" alt="Behrad Zabihi" />
			<div class="portrait-gradient"></div>
			<div class="portrait-caption"><span>{profile.name}</span><small>{profile.location}</small></div>
			<div class="signal-card">
				<div class="signal-bars"><i></i><i></i><i></i><i></i><i></i></div>
				<span>MODELS → PRODUCTS</span>
			</div>
		</div>
	</div>

	<div class="hero-scroll"><span>SCROLL TO EXPLORE</span><i></i></div>
</section>

<section class="proof-strip">
	<div class="shell proof-grid">
		{#each proofPoints as point, index}
			<div class="proof-item">
				<span>0{index + 1}</span>
				<strong>{point.value}</strong>
				<p>{point.label}</p>
			</div>
		{/each}
	</div>
</section>

<section id="work" class="section shell projects-section">
	<div class="section-heading">
		<div>
			<p class="section-label">01 / SELECTED WORK</p>
			<h2>Systems, not demos.</h2>
		</div>
		<p>Recent work across production AI, agent orchestration, data engineering and measurable machine learning.</p>
	</div>

	<div class="project-grid">
		{#each projects as project, index}
			<a class:featured={project.featured} class="project-card project-{index + 1}" href={project.href} target="_blank" rel="noreferrer">
				<div class="project-top">
					<span class="project-number">0{index + 1}</span>
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
				</div>
				<div class="project-art" aria-hidden="true">
					<div class="art-ring"></div><div class="art-dot"></div><div class="art-line"></div>
				</div>
				<div class="project-content">
					<p>{project.eyebrow}</p>
					<h3>{project.name}</h3>
					<span class="project-proof">{project.proof}</span>
					<div class="project-details">{project.description}</div>
					<div class="tag-list">{#each project.stack as tag}<span>{tag}</span>{/each}</div>
				</div>
			</a>
		{/each}
	</div>
	<a class="text-link" href={profile.github} target="_blank" rel="noreferrer">View all repositories <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>
</section>

<section id="experience" class="section experience-section">
	<div class="shell">
		<div class="section-heading">
			<div>
				<p class="section-label">02 / EXPERIENCE</p>
				<h2>Impact, end to end.</h2>
			</div>
			<p>A progression from statistical research and NLP into cloud-native data products and production AI systems.</p>
		</div>

		<div class="timeline">
			{#each experience as item, index}
				<article class="timeline-item">
					<div class="timeline-rail"><span class:current={item.current}></span>{#if index < experience.length - 1}<i></i>{/if}</div>
					<div class="timeline-meta"><strong>{item.period}</strong><span>{item.location}</span></div>
					<div class="timeline-content">
						<div class="role-title"><h3>{item.role}</h3>{#if item.current}<span>NOW</span>{/if}</div>
						<h4>{item.company}</h4>
						<p>{item.summary}</p>
						<ul>{#each item.highlights as highlight}<li>{highlight}</li>{/each}</ul>
						<div class="tag-list">{#each item.stack as tag}<span>{tag}</span>{/each}</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="skills" class="section shell skills-section">
	<div class="section-heading">
		<div>
			<p class="section-label">03 / CAPABILITIES</p>
			<h2>Depth across the stack.</h2>
		</div>
		<p>The technical range to move from raw data and experiments to reliable, user-facing AI products.</p>
	</div>
	<div class="skills-grid">
		{#each skillGroups as group, index}
			<article class="skill-card">
				<div class="skill-icon icon-{index}"><span></span><span></span><span></span></div>
				<p>0{index + 1}</p>
				<h3>{group.name}</h3>
				<div class="skill-description">{group.description}</div>
				<div class="skill-list">{#each group.skills as skill}<span>{skill}</span>{/each}</div>
			</article>
		{/each}
	</div>
</section>

<section id="about" class="section about-section">
	<div class="shell about-grid">
		<div class="about-intro">
			<p class="section-label">04 / HOW I THINK</p>
			<h2>Good AI is an engineering discipline.</h2>
			<p>{profile.positioning}</p>
			<a class="text-link" href="mailto:{profile.email}">Start a conversation <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>
		</div>
		<div class="principles">
			{#each principles as principle, index}
				<article><span>0{index + 1}</span><div><h3>{principle[0]}</h3><p>{principle[1]}</p></div></article>
			{/each}
		</div>
	</div>
</section>

<section class="section education-section shell">
	<div class="section-heading compact">
		<div><p class="section-label">05 / FOUNDATIONS</p><h2>Education & recognition.</h2></div>
	</div>
	<div class="education-grid">
		{#each education as item, index}
			<article>
				<div class="education-number">0{index + 1}</div>
				<div><p>{item.period}</p><h3>{item.degree}</h3><h4>{item.institution}</h4><strong>{item.result}</strong><span>{item.detail}</span></div>
			</article>
		{/each}
	</div>
</section>

<section class="cta-section shell">
	<div class="cta-orbit"></div>
	<p class="section-label">THE INTERACTIVE CV</p>
	<h2>There’s more behind the bullet points.</h2>
	<p>Ask my digital twin about a project, a role, my working style, or whether my experience fits your team.</p>
	<button class="button primary" on:click={openTwin}><span class="mini-twin">B<i></i></span> Start a conversation <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></button>
</section>

<footer>
	<div class="shell footer-grid">
		<div><a class="brand-footer" href="/">BZ<i></i></a><p>Building intelligent systems<br />that earn their place in production.</p></div>
		<div><span>CONNECT</span><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href="mailto:{profile.email}">Email</a></div>
		<div><span>DOCUMENTS</span><a href="/BehradZabihi.pdf" target="_blank" rel="noreferrer">Résumé</a><button on:click={openTwin}>Digital twin</button></div>
		<small>© {new Date().getFullYear()} Behrad Zabihi<br />Manchester, United Kingdom</small>
	</div>
</footer>
