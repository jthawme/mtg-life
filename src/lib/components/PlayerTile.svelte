<script>
  import Settings from '$lib/icons/settings.svg?component';
	import { onMount, createEventDispatcher } from 'svelte';
  import {listenCb, onWindowResize} from "$lib/utils.js";
	import Modal from './Modal.svelte';
  
	const dispatch = createEventDispatcher();

  export let id;
  export let settings;
  export let life = 0;

  export let debounceTime = 1000;

  let settingsModal = false;

  $: color = settings?.color ?? 'silver';
  $: rotation = (settings?.flipped ?? 0);

  let el = null;

  let mouseX = 0;
  let mouseY = 0;

  let elX = 0;
  let elY = 0;

  let displayedLife = life;

  let updateTimer = 0;

  $: (
    displayedLife = life
  )

  function changeLife(mod) {
    displayedLife += mod;

    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      dispatch('update', {
        id,
        action: 'mod',
        key: 'life',
        value: displayedLife - life
      })
    }, debounceTime);
  }

  function onRotate() {
    dispatch('update', {
      id,
      action: 'change',
      key: 'settings.flipped',
      value: ((settings?.flipped ?? 0) + 1) % 4
    })
  }

  $: difference = displayedLife - life;

  function onMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  function onResize() {
    const {x, y} = el.getBoundingClientRect();

    elX = x;
    elY = y;
  }

  function onChangeColor(e) {
    dispatch('update', {
      id,
      action: 'change',
      key: 'settings.color',
      value: e.target.value
    })
  }

  onMount(() => {
    onResize();

    const unlisten = [
      onWindowResize(onResize),
      listenCb(document, 'mousemove', onMouseMove)
    ];

    return () => unlisten.forEach(cb => cb());
  })

  $: style = Object.entries({
    '--color': color,
    '--x': mouseX - elX,
    '--y': mouseY - elY,
    '--rotation': rotation * 90
  }).map(tuples => tuples.join(": ")).join("; ")
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={el} on:mousemove={onMouseMove} class="tile" style={style}>
  {#if settingsModal}
    <Modal on:close={() => settingsModal = false}>
      <div class="group">
        <span class="group-title">Player</span>

        <label class="label">
          <div class="label-title">
            Flipped
          </div>
          <div class="label-input">
            <button on:click={onRotate}>Flip</button>
          </div>
        </label>

        <label class="label">
          <div class="label-title">
            Color
          </div>
          <div class="label-input">
            <input value={color} type="color" on:change={onChangeColor}/>
          </div>
        </label>
      </div>
    </Modal>
  {/if}

  <button class="settings-btn" on:click={() => settingsModal = true}>
    <Settings/>
  </button>

  {#if difference !== 0}
  <div class="hover" class:positive={difference > 0}>
    <div class="hover-inner">{difference}</div>
  </div>
  {/if}

  <div class="tile-hit-area">
    <button tabindex="-1" on:click={() => changeLife(1)} class="tile-hit-area-el tile-hit-area-el--top"/>
    <button tabindex="-1" on:click={() => changeLife(-1)} class="tile-hit-area-el tile-hit-area-el--bottom"/>
    <span class="tile-hit-area-display">{displayedLife}</span>
  </div>
</div>

<style lang="scss">
  .tile {
    position: relative;

    display: flex;

    flex-direction: column;

    border-radius: 20px;

    background-color: var(--color);

    overflow: hidden;
  }

  .hover {
    position: absolute;

    width: 10px;
    height: 10px;

    left: calc(var(--x) * 1px);
    top: calc(var(--y) * 1px);

    transform: translate3d(-50%, -50%, 0) rotate(calc(var(--rotation) * 1deg));

    z-index: 10;

    pointer-events: none;

    &-inner {
      position: absolute;

      bottom: 100%;
      left: 50%;

      transform: translate3d(-50%, 0, 0);

      border-radius: 10px;
      padding: 5px 10px;

      font-size: 1.5rem;

      font-weight: bold;

      color: rgb(153, 12, 12);
      background-color: rgb(221, 121, 121);
    }

    &.positive {
      .hover-inner {
        color: rgb(19, 131, 19);
        background-color: rgb(136, 240, 136);

        &:before {
          content: "+";
        }
      }
    }
  }

  .tile-hit-area {
    position: relative;

    display: grid;

    grid-template-rows: repeat(2, 1fr);

    transform: rotate(calc(var(--rotation) * 1deg));

    flex-grow: 1;

    &-display {
      position: absolute;


      top: 50%;
      left: 50%;

      transform: translate3d(-50%, -50%, 0);

      font-size: 10vw;
      font-weight: bold;
    }

    &-el {
      position: relative;

      z-index: 2;

      opacity: 0;

      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      border-radius: 0;

      cursor: pointer;

      &:active {
        opacity: 0.5;
      }

      &--top {
        background-color: green;
      }

      &--bottom {
        background-color: red;
      }
    }
  }

  .settings-btn {
    position: absolute;

    bottom: 10px;
    left: 50%;

    transform: translate3d(-50%, 0, 0);

    z-index: 10;

    line-height: 0;

    background-color: transparent;
    border: none;

    padding: 0;
    margin: 0;

    opacity: 0.25;

    :global(svg) {
      width: 24px;
    }
  }
</style>