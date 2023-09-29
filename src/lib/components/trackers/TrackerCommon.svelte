<script>
	export let label;
	export let expanded = false;

	let clazz;
	export { clazz as class };
</script>

<div class={`tracker ${clazz}`} class:expanded>
	{#if label}
		<span class="tracker-label">{label}</span>
	{/if}
	<div class="tracker-content">
		<slot />
	</div>
</div>

<style lang="scss">
	.tracker {
		border-radius: 10px;

		background-color: var(--tracker-bg, rgba(0, 0, 0, 0.25));

		padding: 10px 5px;

		display: flex;

		flex-direction: column;

		&-content {
			display: flex;

			flex-direction: column;
			justify-content: center;

			flex-grow: 1;
		}

		:global(button) {
			background: none;
			border: none;

			padding: 5px;
			margin: 0;

			color: inherit;

			&:hover,
			&:focus-visible {
				opacity: 0.5;
				cursor: pointer;
			}
		}

		:global(button),
		:global(.value),
		.tracker-label {
			mix-blend-mode: exclusion;
			color: white;
		}

		:global(.value) {
			text-align: center;
		}

		.tracker-label {
			display: block;

			font-size: 10px;

			text-align: center;
			font-weight: bold;

			margin-bottom: 0.5em;
		}

		:global(.row) {
			display: grid;

			grid-template-columns: 20px 1fr 20px;
			align-items: center;
		}

		&.expanded {
			.tracker-label {
				font-size: 16px;
			}

			:global(.row) {
				grid-template-columns: 1fr 3fr 1fr;
			}

			:global(button) {
				font-size: calc(var(--global-font-size, 10) * 0.25vw);
			}

			:global(.value) {
				font-size: calc(var(--global-font-size, 10) * 0.25vw);
			}
		}
	}
</style>
