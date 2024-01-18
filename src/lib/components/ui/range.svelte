<script lang="ts">
  export let min = 0;
  export let max = 1;
  export let value: string = "0";

  let rangeTimeout: number | undefined;

  $: val = parseFloat(value as string) * 100;
  const mask = {
    get number() {
      return val;
    },
    set number(newVal) {
      val = newVal;
      clearTimeout(rangeTimeout);
      rangeTimeout = setTimeout(() => {
        value = (val / 100).toString();
      }, 300);
    },
  };
</script>

<input
  type="range"
  {min}
  max={max * 100}
  bind:value={mask.number}
  class="range range-primary"
/>
