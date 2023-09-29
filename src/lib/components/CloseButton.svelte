<script>
	import Close from '$lib/icons/close-circle.svg?component';

	let clazz = '';
	export { clazz as class };
</script>

<button class={`close ${clazz}`} on:click><Close /></button>

<style lang="scss">
	.close {
		position: absolute;

		top: var(--top, 10px);
		right: var(--right, 10px);

		padding: 0;
		margin: 0;
		border: none;
		background-color: transparent;

		cursor: pointer;

		z-index: var(--z, 20);

		&:hover,
		&:focus-visible {
			opacity: 0.5;
		}

		:global(svg) {
			fill: white;

			width: 24px;
		}
	}
</style>
