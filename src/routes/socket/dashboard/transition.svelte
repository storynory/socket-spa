<script>
import { crossfade, } from 'svelte/transition';
import { quintOut, circInOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 600),

	fallback(node, params) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 1200,
			easing: circInOut,
			css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
		};
	}
});

</script>

<style>
    
</style>