<script>
  import Close from "$lib/icons/close-circle.svg?component";
  import {createEventDispatcher, onMount} from 'svelte';
  import {registerExits} from "$lib/utils.js";

  export let canClose = true;

  const dispatcher = createEventDispatcher();

  function onElementClick(e) {
    if (e.target.classList.contains("outer")) {
      onCloseTrigger();
    }
  }

  function onCloseTrigger() {
    dispatcher("close");
  }

  onMount(() => {
    return registerExits(() => onCloseTrigger());
  })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="outer" on:click={onElementClick}>
  {#if canClose}
    <button class="close" on:click={onCloseTrigger}><Close/></button>
  {/if}

  <div class="inner">
    <slot/>
  </div>
</div>

<style lang="scss">

.outer {
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);

  z-index: 20;
}

.close {
  position: absolute;

  top: 10px;
  right: 10px;

  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;

  cursor: pointer;

  &:hover,
  &:focus-visible {
    opacity: 0.5;
  }

  :global(svg) {
    fill: white;

    width: 24px;
  }
}

.inner {
  position: absolute;

  top: 50%;
  left: 50%;

  max-height: var(--inner-height, 80%);
  width: var(--inner-width, 80%);
  height: 100%;
  max-width: var(--inner-max-width, 560px);

  background-color: var(--bg, #222);

  padding: 20px;

  border-radius: 20px;

  transform: translate3d(-50%, -50%, 0);

  overflow: auto;
}

</style>