<script lang="ts">
  export let options: string[] = [];
  export let value: string;

  let masked = {
    get index() {
      return options.indexOf(value);
    },
    set index(i) {
      value = options[i];
    },
  };
</script>

<select
  bind:value={masked.index}
  class="select select-bordered w-full max-w-xs"
>
  {#each options as option, i}
    <option disabled={i === 0} selected={i === 0} value={i}>{option}</option>
  {/each}
</select>
