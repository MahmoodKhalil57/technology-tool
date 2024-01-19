<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import {
    selectedProfileStore,
    settingsStore,
    selectedProfileNameStore,
  } from "../../stores/settings";
</script>

<div class="flex flex-col gap-3">
  {#key $selectedProfileNameStore}
    {#each $selectedProfileStore?.autofillPreferences ?? [] as option}
      <div class="flex flex-col items-start gap-2">
        <Savable label={option.label} bind:value={option.value} locked />
      </div>
    {/each}
  {/key}
</div>
