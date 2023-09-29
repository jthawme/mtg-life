<script>
	import { createEventDispatcher } from 'svelte';
	import { game } from '$lib/store.js';
	import TrackerCommon from './TrackerCommon.svelte';

	const dispatch = createEventDispatcher();

	export let id;
	export let step = 1;
	export let value;
	export let label;
	export let expanded = false;

	let clazz;
	export { clazz as class };

	$: players = $game.players
		.filter((player) => player.id !== id)
		.map((player) => {
			return {
				id: player.id,
				player,
				damage: value[player.id] ?? 0
			};
		});

	function change(playerId, amt) {
		dispatch('change', {
			...value,
			[playerId]: (value[playerId] ?? 0) + amt
		});
	}
</script>

<TrackerCommon class={clazz} {label} {expanded}>
	{#if expanded}
		{#each players as player}
			<div
				class="row"
				style={`--color-bg: ${player.player.settings.color}; --color-fg: ${player.player.settings.textColor}`}
			>
				<button on:click={() => change(player.id, step * -1)}>-</button>
				<span class="value">{player.damage}</span>
				<button on:click={() => change(player.id, step)}>+</button>
			</div>
		{/each}
	{:else}
		<div class="dots">
			{#each players as player}
				<div
					class="dot"
					style={`--color-bg: ${player.player.settings.color}; --color-fg: ${player.player.settings.textColor}`}
				>
					{player.damage}
				</div>
			{/each}
		</div>
	{/if}
</TrackerCommon>

<style lang="scss">
	.dots {
		display: flex;

		justify-content: center;

		gap: 5px;

		.dot {
			width: 1.5rem;
			height: 1.5rem;

			font-size: 1em;

			background-color: var(--color-bg);
			color: var(--color-fg, inherit);

			display: flex;

			align-items: center;
			justify-content: center;

			border-radius: 100%;
		}
	}

	.row .value {
		mix-blend-mode: normal;
		background-color: var(--color-bg);
		color: var(--color-fg, inherit);
		border-radius: 5px;
	}
</style>
