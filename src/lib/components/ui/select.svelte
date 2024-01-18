<script lang="ts">
  type Value = $$Generic;
  export let options: Value[] = [];
  export let value: Value = options[0];
  export let index = options.indexOf(value);
  export let disableFirst = true;

  let masked = {
    get index() {
      return index;
    },
    set index(i) {
      value = options[i];
      index = i;
    },
  };
</script>

<select
  bind:value={masked.index}
  class="select select-bordered w-full max-w-xs"
>
  {#each options as option, i}
    <option
      disabled={disableFirst && i === 0}
      selected={disableFirst && i === 0}
      value={i}>{option}</option
    >
  {/each}
</select>
