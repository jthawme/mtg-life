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
	export let commanders = [];

	$: commandersLength = commanders.length;

	let clazz;
	export { clazz as class };

	$: commanderGroups = commanders.map((commander, commanderIndex) => ({
		name: commander,
		players: $game.players
			.filter((player) => player.id !== id)
			.map((player) => {
				return {
					id: player.id,
					player,
					damage: value[commanderIndex]?.[player.id] ?? 0
				};
			})
	}));

	function change(playerId, commanderIndex, amt) {
		const newValue = new Array(commandersLength)
			.fill(0)
			.map((_, idx) => {
				return {
					...(value[idx] || {})
				};
			})
			.map((values, idx) => {
				if (idx === commanderIndex) {
					return {
						...values,
						[playerId]: (values[playerId] ?? 0) + amt
					};
				}

				return {
					...values
				};
			});
		console.log(newValue);

		dispatch('change', newValue);
	}
</script>

<TrackerCommon class={clazz} {label} {expanded}>
	{#if expanded}
		<div class="commander-group">
			{#each commanderGroups as commander, commanderIndex}
				<div class="commander">
					{#if commander.name !== 'Name'}
						<span class="name">{commander.name}</span>
					{/if}

					{#each commander.players as player}
						<div
							class="row"
							style={`--color-bg: ${player.player.settings.color}; --color-fg: ${player.player.settings.textColor}`}
						>
							<button on:click={() => change(player.id, commanderIndex, step * -1)}>-</button>
							<span class="value">{player.damage}</span>
							<button on:click={() => change(player.id, commanderIndex, step)}>+</button>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		{#each commanderGroups as commander}
			<div class="dots">
				{#each commander.players as player}
					<div
						class="dot"
						style={`--color-bg: ${player.player.settings.color}; --color-fg: ${player.player.settings.textColor}`}
					>
						{player.damage}
					</div>
				{/each}
			</div>
		{/each}
	{/if}
</TrackerCommon>

<style lang="scss">
	.dots {
		display: flex;

		justify-content: center;

		gap: 5px;

		&:not(:last-child) {
			border-bottom: 1px solid rgba(0, 0, 0, 0.15);
			padding-bottom: 5px;
			margin-bottom: 5px;
		}

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

		font-size: calc(var(--global-font-size, 10) * 0.25vw);
	}

	.commander-group {
		display: flex;

		.commander {
			flex-grow: 1;
		}
	}

	.name {
		display: block;

		text-align: center;

		mix-blend-mode: exclusion;
		color: white;
		font-weight: bold;
		padding-bottom: 5px;
	}
</style>
