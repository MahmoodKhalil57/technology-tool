<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import { selectedProfileStore, settingsStore } from "../../stores/settings";
  import Select from "../ui/select.svelte";

  const profileState = {
    get name() {
      return $selectedProfileStore?.name;
    },
    set name(value) {
      selectedProfileStore.update((store) => {
        store.name = value ?? "";
        return store;
      });
    },
  };
</script>

<Select
  options={$settingsStore.profile.options.map((option) => option.name)}
  bind:index={$settingsStore.profile.selected}
/>

<Savable label="Profile Name" bind:value={profileState.name} harder />
