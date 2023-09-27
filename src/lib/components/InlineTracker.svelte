<script>
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let step = 1;
  export let value;
  export let label;

  let clazz;
  export {clazz as class}

  function change(amt) {
    dispatch('change', value + amt);
  }
</script>

<div class={`tracker ${clazz}`}>
  {#if label}
    <span class="tracker-label">{label}</span>
  {/if}
  <button on:click={() => change(step * -1)}>-</button>
  <span class="value">{value}</span>
  <button on:click={() => change(step)}>+</button>
</div>

<style lang="scss">
  .tracker {
    border-radius: 10px;

    display: grid;

    grid-template-columns: 20px 1fr 20px;

    align-items: center;

    background-color: var(--tracker-bg, rgba(0,0,0,0.25));

    padding: 10px 5px;

    button {
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

    button,
    .value,
    .tracker-label {
      mix-blend-mode: exclusion;
      color: white;
    }
  }

  .value {
    text-align: center;
  }

  .tracker-label {
    grid-column-end: span 3;

    font-size: 10px;

    text-align: center;
    font-weight: bold;

    margin-bottom: 0.5em;
  }
</style>