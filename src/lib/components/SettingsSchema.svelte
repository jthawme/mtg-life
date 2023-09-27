<script>
  export let settings = [];
</script>

<div>
  {#each settings as group}
  <div class="group">
    <span class="group-title">{group.title}</span>

    {#each group.inputs as input}
    <label class="label">
      <span class="label-title">{input.title}</span>
      <span class="label-input">
        {#if input.type === 'checkbox'}
        <input type="checkbox" bind:checked={input.value} on:change={input.change} value="1"/>
        {:else if input.type === 'button'}
        <button type="button" on:click={input.click} {...(input.options || {})}>{input.text}</button>
        {:else if input.type === 'image'}
          <input type="file" accept="image/*" on:change={input.change}/>
          <span>Select</span>

          {#if input.value}
            <img src={input.value} alt=""/>
          {/if}
        {:else if input.type === 'select'}
          <select on:change={input.change} value={input.value}>
            {#each input.options as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        {:else}
        <input type={input.type} name={input.name} on:input={input.input} value={input.value} {...input.options}/>
        {/if}
      </span>
    </label>
    {/each}
  </div>
  {/each}
</div>

<style lang="scss">



.group {
  margin: 1em 0;
}

.group-title {
  display: block;

  font-weight: bold;

  border-bottom: 1px solid currentColor;

  padding-bottom: 0.4em;
  margin-bottom: 1em;
}

.label {
  display: grid;
  margin: 1em 0;

  grid-template-columns: 1fr 1fr;
  gap: 10px;
  justify-content: space-between;
  grid-template-areas: "title input";

  font-size: 1.5rem;

  &-title,
  &-input {
    display: block;

    min-width: 0;
  }

  &-title {
    grid-area: title;
  }

  &-input {
    position: relative;

    grid-area: input;

    justify-self: flex-end;
    text-align: right;
  }

  input[type='text'],
  input[type='email'],
  input[type='search'] {
    width: 100%;
  }

  input[type='file'] {
    position: absolute;

    opacity: 0;

    pointer-events: none;
  }
}
</style>