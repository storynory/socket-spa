<script>
	//import SideDrawer from '$lib/components/navs/SideDrawer.svelte';
	import Nav from '$lib/components/navs/apNav.svelte';
	import { fade, blur } from 'svelte/transition';
	import { cubicInOut, circInOut, expoInOut } from 'svelte/easing';
	let { children, data } = $props();
	import '$lib/app.css';
</script>

{#key data.pathname}
	<div class="layout">
		<Nav />

		<main
			class="container"
			in:fade={{ easing: circInOut, duration: 200, delay: 90 }}
			out:fade={{ easing: circInOut, duration: 200 }}
		>
			{@render children()}
		</main>
	</div>
{/key}

<style>
	.layout {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		flex: 1;
		padding-top: 50px;
	}
</style>
