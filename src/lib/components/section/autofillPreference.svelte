<script lang="ts">
  import {
    selectedProfileStore,
    settingsStore,
    selectedProfileNameStore,
  } from "../../stores/settings";
  import AutoFillElement from "../tyt/autoFillElement.svelte";
</script>

<div class="flex flex-col gap-3">
  {#key $selectedProfileNameStore}
    {#each $selectedProfileStore?.autofillPreferences ?? [] as preference}
      <AutoFillElement bind:preference />
    {/each}
  {/key}
</div>
