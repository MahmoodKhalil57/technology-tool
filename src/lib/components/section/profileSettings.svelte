<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import { selectedProfileStore } from "../../stores/settings";

  const profileState = {
    get name() {
      return $selectedProfileStore?.["name"];
    },
    set name(value) {
      selectedProfileStore.update((store) => {
        store["name"] = value ?? "";
        return store;
      });
    },
  };
</script>

<Savable label="Profile Name" bind:value={profileState.name} harder />
