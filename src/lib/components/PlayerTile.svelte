<script>
  import Settings from '$lib/icons/settings.svg?component';
	import { onMount, createEventDispatcher } from 'svelte';
  import {listenCb, onWindowResize} from "$lib/utils.js";
	import Modal from './Modal.svelte';
	import PlayerSettings from './PlayerSettings.svelte';
	import InlineTracker from './InlineTracker.svelte';
  
	const dispatch = createEventDispatcher();

  export let id;
  export let settings;
  export let life = 0;
  export let values = {};
  export let name = '';

  export let withPoison = false;
  export let withCommanderDamage = false;
  export let withName = false;

  export let debounceTime = 1000;

  $: hasAdditionalTrackers = !!withPoison || !!withCommanderDamage;

  let settingsModal = false;

  $: poison = values.poison ?? 0;
  $: commander = values.commander ?? 0;

  $: color = settings?.color ?? 'silver';
  $: rotation = (settings?.flipped ?? 0);
  $: counterbalance = rotation % 2 === 1;

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

  function onUpdate({detail}) {
    dispatch("update", detail);
  }

  function changeTrackedAmount(type, value) {
    dispatch('update', {
      id,
      action: 'change',
      key: `values.${type}`,
      value
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
    '--text-color': settings.textColor,
    '--x': mouseX - elX,
    '--y': mouseY - elY,
    '--rotation': rotation * 90,
  }).map(tuples => tuples.join(": ")).join("; ")
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={el} on:mousemove={onMouseMove} class="tile" class:counterbalance class:rounded={withName || hasAdditionalTrackers} style={style}>
  {#if settingsModal}
    <Modal on:close={() => settingsModal = false}>
      <PlayerSettings {...settings} life={life} name={name} id={id} on:update={onUpdate}/>
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

  <div class="rotation-plane">
    {#if withName}
      <div class="name">
        {name}
      </div>
    {/if}

    <div class="tile-hit-area">
      <button tabindex="-1" on:click={() => changeLife(1)} class="tile-hit-area-el tile-hit-area-el--top"/>
      <button tabindex="-1" on:click={() => changeLife(-1)} class="tile-hit-area-el tile-hit-area-el--bottom"/>
      <span class="tile-hit-area-display">{displayedLife}</span>
    </div>

    {#if hasAdditionalTrackers}
      <div class="tracker-tray">
        {#if withPoison}
          <InlineTracker class="tracker--poison" label="Poison" value={poison} on:change={({detail}) => changeTrackedAmount('poison', detail)}/>
        {/if}
        {#if withCommanderDamage}
          <InlineTracker class="tracker--commander" label="Commander" value={commander} on:change={({detail}) => changeTrackedAmount('commander', detail)}/>
        {/if}
      </div>
    {/if}
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

    container-type: size;
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

    flex-grow: 1;
    color: var(--text-color, inherit);

    // .rounded & {
      margin: 10px;
      border-radius: 10px;
      overflow: hidden;
    // }

    &-display {
      position: absolute;


      top: 50%;
      left: 50%;

      transform: translate3d(-50%, -50%, 0);

      font-size: calc(var(--global-font-size, 10) * 1vw);
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

    z-index: 10;

    line-height: 0;

    background-color: transparent;
    border: none;

    padding: 10px;
    margin: 0;

    opacity: 0.25;

    :global(svg) {
      width: 24px;
    }

    &:hover,
    &:focus-visible {
      opacity: 0.5;
      cursor: pointer;
    }

    .tile:nth-child(4n + 1) & {
      top: 0;
      left: 0;
    }

    .tile:nth-child(4n + 2) & {
      top: 0;
      right: 0;
    }

    .tile:nth-child(4n + 3) & {
      bottom: 0;
      left: 0;
    }

    .tile:nth-child(4n) & {
      bottom: 0;
      right: 0;
    }
  }

  .rotation-plane {
    position: absolute;

    top: 50%;
    left: 50%;

    display: flex;

    flex-direction: column;

    flex-grow: 1;

    transform: translate3d(-50%, -50%, 0) rotate(calc(var(--rotation) * 1deg));

    width: 100cqw;
    height: 100cqh;

    .counterbalance & {
      height: 100cqw;
      width: 100cqh;
    }
  }

  .name {
    position: absolute;

    top: 0;
    left: 0;
    right: 0;

    margin: 10px 10px 0;

    font-size: calc(var(--global-font-size, 10) * 0.2vw);
    text-align: center;
    font-weight: bold;
    color: var(--text-color, inherit);
  }

  .tracker-tray {
    margin: 0 10px 10px;

    padding: 10px;

    background-color: rgba(0,0,0,0.15);

    border-radius: 10px;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 100px;
    grid-auto-columns: 100px;
    gap: 10px;

    justify-content: center;
  }

  :global(.tracker--poison) {
    --tracker-bg: #337430;
  }

  :global(.tracker--commander) {
    --tracker-bg: #C04329;
  }
</style>