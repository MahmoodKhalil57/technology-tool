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

  const duplicateProfile = () => {
    settingsStore.update((store) => {
      if (!$selectedProfileStore) return store;
      const newProfile = {
        ...$selectedProfileStore,
        name: `${$selectedProfileStore?.name} (Copy)`,
      };
      store.profile.options.push(newProfile);
      store.profile.selected = store.profile.options.length - 1;
      return store;
    });
  };
</script>

{#key $settingsStore.profile.selected}
  <Select
    options={$settingsStore.profile.options.map((option) => option.name)}
    bind:index={$settingsStore.profile.selected}
    disableFirst={false}
  />

  <div class="flex flex-col items-start gap-2">
    <Savable label="Profile Name" bind:value={profileState.name} harder />
    <div>
      <button class="link text-sm"> Delete </button>
      <button class="link text-sm" on:click={duplicateProfile}>
        Duplicate
      </button>
    </div>
  </div>
{/key}
