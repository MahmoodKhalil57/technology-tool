<script lang="ts">
  export let label = "";
  export let value = "";
  export let inputVal = value;
  export let invalid = false;

  export let onSave = () => {
    invalid = false;
  };

  export let save = () => {
    value = inputVal;
    onSave();
  };

  let inputValState = {
    get value() {
      return inputVal;
    },
    set value(val) {
      inputVal = val;
      invalid = true;
    },
  };
</script>

<div class="flex gap-5 items-end">
  <div>
    {#if !!label}
      <div class="label">
        <span class="label-text">{label}</span>
      </div>
    {/if}
    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered input-sm w-full max-w-xs {invalid
        ? 'input-error'
        : 'input-primary'}"
      bind:value={inputValState.value}
    />
  </div>
  <button class="btn btn-sm" on:click={save}> Save </button>
</div>
