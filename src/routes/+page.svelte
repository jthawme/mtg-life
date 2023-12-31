<script>
	import SettingsIcon from '$lib/icons/settings.svg?component';
	import { game, app } from '$lib/store.js';
	import PlayerTile from '../lib/components/PlayerTile.svelte';
	import Modal from '../lib/components/Modal.svelte';
	import Settings from '../lib/components/Settings.svelte';

	function onPlayerUpdate({ detail }) {
		const { action, id, key, value } = detail;

		switch (action) {
			case 'mod':
				if (key === 'life') {
					game.changeLife(id, value);
				} else {
					game.modNumericPlayerValue(id, key, value);
				}
				break;
			case 'change':
				if (key.startsWith('settings.')) {
					game.setPlayerSettings(id, key.split('settings.').join(''), value);
				} else if (key.startsWith('values.')) {
					game.setPlayerTrackedValue(id, key.split('values.').join(''), value);
				} else {
					game.setPlayerValue(id, key, value);
				}
			default:
				break;
		}
	}

	function onSettings() {
		app.toggleSettings();
	}
</script>

{#if $app.settings}
	<Modal on:close={onSettings}>
		<Settings />
	</Modal>
{/if}

<div class="tile-wrapper" class:row={$game.players.length <= 2}>
	{#each $game.players as player (player.id)}
		<PlayerTile
			{...player}
			withName={$app.displayNames}
			withCommanderDamage={$game.tracking.commander}
			withPoison={$game.tracking.poison}
			on:update={onPlayerUpdate}
		/>
	{/each}

	<button class="settings-btn" on:click={onSettings} class:hasImage={!!$app.image}>
		{#if $app.image}
			<img src={$app.image} alt="" />
		{:else}
			<SettingsIcon />
		{/if}
	</button>
</div>

<style lang="scss">
	.tile-wrapper {
		width: 100vw;
		height: 100dvh;

		display: grid;

		padding: 1rem;
		gap: 1rem;

		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-auto-columns: 1fr;

		&.row {
			grid-template-rows: 1fr;
		}

		:global(> *:nth-child(2n-1):nth-last-of-type(1)) {
			grid-column-end: span 2;
		}
	}

	.settings-btn {
		position: absolute;

		top: 50%;
		left: 50%;

		transform: translate3d(-50%, -50%, 0);

		width: 100px;
		height: 100px;

		border-radius: 100%;

		border: none;

		cursor: pointer;

		z-index: 10;

		padding: 0;
		margin: 0;

		overflow: hidden;

		background-color: var(--bg, #111);
		color: inherit;

		line-height: 0;

		&:not(.hasImage):hover,
		&:not(.hasImage):focus-visible {
			:global(svg) {
				opacity: 0.5;
			}
		}

		:global(svg) {
			width: 2rem;
			fill: currentColor;
		}

		&.hasImage {
			img {
				width: 100%;
				height: 100%;

				object-fit: cover;
			}
		}
	}
</style>
