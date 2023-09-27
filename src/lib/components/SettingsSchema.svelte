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
