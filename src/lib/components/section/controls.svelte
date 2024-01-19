<script>
  import Checkbox from "../ui/checkbox.svelte";
  import {
    selectedProfileStore,
    autoFillSelected,
  } from "../../stores/settings";
</script>

{#if $selectedProfileStore?.autoFill !== undefined}
  <div class="flex justify-center items-center gap-2">
    <button
      class="btn active:btn-primary {$selectedProfileStore?.autoFill
        ? 'btn-disabled !cursor-not-allowed'
        : ''}"
      on:click={autoFillSelected}
      disabled={$selectedProfileStore?.autoFill}
    >
      Fill
    </button>
    <Checkbox
      ariaLabel="AutoFill"
      variant="btn"
      bind:value={$selectedProfileStore.autoFill}
    />
  </div>
{/if}
