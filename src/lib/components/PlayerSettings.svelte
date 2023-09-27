<script>
	import { createEventDispatcher } from 'svelte';
	import SettingsSchema from './SettingsSchema.svelte';
	const dispatch = createEventDispatcher();

  export let flipped
  export let color;
  export let textColor;
  export let id;

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

  $: settings = [
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

<span>40</span>
<SettingsSchema settings={settings}/>

<style lang="scss">
  span {
    background-color: var(--color);
    color: var(--text-color);

    padding: 6px 10px;

    font-weight: bold;

    border-radius: 10px;
  }
</style>