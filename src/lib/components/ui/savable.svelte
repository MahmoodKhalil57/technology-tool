<script lang="ts">
  import Radio from "../ui/radio.svelte";

  export let label = "";
  export let value = "";
  export let unsaved = false;
  export let locked: boolean | undefined = undefined;
  export let disabledIf = (value: string) => false;

  export let radioButtons = [] as { label: string; value: string }[];
  export let radioValue = "";

  $: inputVal = value;
  $: radioVal = radioValue;

  export let doSave = (inputVal: string) => {
    return true;
  };

  export let save = () => {
    if (doSave(inputVal)) {
      unsaved = false;
      value = inputVal.trim();
      radioValue = radioVal;
      if (locked != undefined) {
        locked = true;
      }
    }
  };

  let inputValState = {
    get value() {
      return inputVal;
    },
    set value(val) {
      inputVal = val;
      unsaved = true;
    },
  };

  let radioValState = {
    get value() {
      return radioVal;
    },
    set value(val) {
      radioVal = val;
      unsaved = true;
    },
  };
</script>

{#if !locked}
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
        class="input input-bordered input-sm {unsaved
          ? '!input-warning'
          : '!input-primary'}"
        on:keydown={(e) => {
          if (e.key === "Enter") {
            save();
          }
        }}
        bind:value={inputValState.value}
        disabled={disabledIf(radioValState.value)}
      />
    </div>
    <button class="btn btn-sm btn-primary" on:click={save}> Save </button>
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
        class="input input-sm {unsaved ? '!input-bordered !input-warning' : ''}"
        disabled
        value={inputValState.value}
      />
    </div>
    <div class="flex flex-col">
      <button
        class="link px-3 text-sm"
        on:click={() => {
          locked = false;
        }}
      >
        Edit
      </button>
    </div>
  </div>
{/if}

{#if radioButtons.length}
  <Radio {radioButtons} bind:value={radioValState.value} disabled={locked} />
{/if}
