<script>
  import {get} from "svelte/store";
  import {game, app} from "$lib/store.js";
	import { onMount } from "svelte";

let amount = get(game).playerCount;
let lifeTotal = get(game).lifeTotal;
let hasNoSettings = true;

$: (
  game.setPlayers(amount)
);

$: (
  game.setKey("lifeTotal", lifeTotal)
)

function onSettingsFileChange(e) {
  const [file] = e.target.files;
  
  app.setImage(URL.createObjectURL(file));
}

function onReset() {
  game.reset();
}

function saveSettings() {
  const gameSettings = get(game);

  localStorage.setItem('settings', JSON.stringify(gameSettings));
}

function restoreSettings() {
  const settings = localStorage.getItem('settings');

  if (!settings){
    return;
  }

  try {
    game.restore(JSON.parse(settings));
  } catch (e) {
    localStorage.removeItem("settings");
  }
}

onMount(() => {
  const previousSettings = localStorage.getItem('settings');
  hasNoSettings = !previousSettings;
});
</script>

<div>
  <div class="group">
    <span class="group-title">Settings</span>

    <label class="label">
      <span class="label-title">Players</span>
      <span class="label-input">
        <input type="number" bind:value={amount} min="2" max="4"/>
      </span>
    </label>

    <label class="label">
      <span class="label-title">Life total</span>
      <span class="label-input">
        <input type="number" bind:value={lifeTotal} min="1" max="100"/>
      </span>
    </label>
  </div>


  <div class="group">
    <span class="group-title">Gameplay</span>

    <label class="label">
      <span class="label-title">Reset totals</span>
      <span class="label-input">
        <button on:click={onReset}>Do it</button>
      </span>
    </label>
  </div>




  <div class="group">
    <span class="group-title">App</span>

    <label class="label">
      <span class="label-title">Save settings</span>
      <span class="label-input">
        <button on:click={saveSettings}>Save</button>
      </span>
    </label>

    <label class="label">
      <span class="label-title">Restore settings</span>
      <span class="label-input">
        <button disabled={hasNoSettings} on:click={restoreSettings}>Restore</button>
      </span>
    </label>

    <label class="label">
      <span class="label-title">Settings image</span>
      <span class="label-input">
        <input type="file" accept="image/*" on:change={onSettingsFileChange}/>
        <span>Select</span>

        {#if $app.image}
          <img src={$app.image} alt=""/>
        {/if}
      </span>
    </label>
  </div>
</div>

<style lang="scss">

</style>