<script>
	import { createEventDispatcher } from 'svelte';
	import TrackerCommon from './TrackerCommon.svelte';

	const dispatch = createEventDispatcher();

	export let step = 1;
	export let value;
	export let label;
	export let expanded = false;

	let clazz;
	export { clazz as class };

	function change(amt) {
		dispatch('change', value + amt);
	}
</script>

<TrackerCommon class={clazz} {label} {expanded}>
	<div class="row">
		<button on:click={() => change(step * -1)}>-</button>
		<span class="value">{value}</span>
		<button on:click={() => change(step)}>+</button>
	</div>
</TrackerCommon>
