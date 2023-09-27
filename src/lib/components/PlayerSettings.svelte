<script>
	import { createEventDispatcher } from 'svelte';
	import SettingsSchema from './SettingsSchema.svelte';
	const dispatch = createEventDispatcher();

  export let flipped
  export let color;
  export let textColor;
  export let id;
  export let name;
  export let life = 40;

  function onRotate() {
    dispatch('update', {
      id,
      action: 'change',
      key: 'settings.flipped',
      value: ((flipped ?? 0) + 1) % 4
    })
  }


  function onChangeColor(e) {
    dispatch('update', {
      id,
      action: 'change',
      key: 'settings.color',
      value: e.target.value
    })
  }


  function onChangeTextColor(e) {
    dispatch('update', {
      id,
      action: 'change',
      key: 'settings.textColor',
      value: e.target.value
    })
  }

  function onNameUpdate(e) {
    dispatch('update', {
      id,
      action: 'change',
      key: 'name',
      value: e.target.value
    })
  }

  $: settings = [
    {
      title: "Player",
      inputs: [
        {
          title: "Name",
          name: "name",
          type: "text",
          input: onNameUpdate,
          value: name
        },
      ]
    },
    {
      title: "Player",
      inputs: [
        {
          title: "Flipped",
          name: "flip",
          type: "button",
          click: onRotate,
          text: "Flip"
        },
        {
          title: "Color",
          name: "flip",
          type: "color",
          input: onChangeColor,
          value: color
        },
        {
          title: "Text Color",
          name: "textColor",
          type: "color",
          input: onChangeTextColor,
          value: textColor ?? '#ffffff'
        },
      ]
    },
  ]
</script>

<div>
<SettingsSchema settings={settings}/>
<span>{life}</span>
</div>

<style lang="scss">
  div {
    position: relative;
  }

  span {
    display: inline-block;

    position: sticky;

    bottom: 0;
    left: 0;

    background-color: var(--color);
    color: var(--text-color);

    transform: rotate(calc(var(--rotation) * 1deg));

    padding: 6px 10px;

    font-weight: bold;

    border-radius: 10px;
  }
</style>