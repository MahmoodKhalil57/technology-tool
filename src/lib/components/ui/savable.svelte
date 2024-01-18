<script lang="ts">
  export let label = "";
  export let value = "";
  export let inputVal = value;
  export let invalid = false;
  export let harder: boolean | undefined = undefined;

  export let onSave = () => {
    invalid = false;
  };

  export let save = () => {
    value = inputVal;
    if (harder != undefined) {
      harder = true;
    }
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

{#if !harder}
  <div class="flex gap-5 items-end">
    <div>
      {#if !!label}
        <div class="label px-0">
          <span class="label-text">{label}</span>
        </div>
      {/if}
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered input-sm {invalid
          ? 'input-error'
          : 'input-primary'}"
        bind:value={inputValState.value}
      />
    </div>
    <button class="btn btn-sm" on:click={save}> Save </button>
  </div>
{:else}
  <div class="flex gap-5 items-end">
    <div>
      {#if !!label}
        <div class="label px-0">
          <span class="label-text">{label}</span>
        </div>
      {/if}
      <input
        type="text"
        placeholder="Type here"
        class="input !input-bordered input-sm !input-primary"
        disabled
        value={inputValState.value}
      />
    </div>
    <div class="flex flex-col">
      <button
        class="link px-3 text-sm"
        on:click={() => {
          harder = !harder;
        }}
      >
        Edit
      </button>
    </div>
  </div>
{/if}
