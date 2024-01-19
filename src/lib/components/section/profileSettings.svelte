<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import {
    selectedProfileStore,
    settingsStore,
    selectedProfileNameStore,
  } from "../../stores/settings";
  import Select from "../ui/select.svelte";

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

  const DELETEBUFFER = 3;
  let deleteBufferTimer: number;
  let deleteBuffer = DELETEBUFFER;

  const setDeleteBuffer = () => {
    deleteBufferTimer = setTimeout(() => {
      if (deleteBuffer < DELETEBUFFER) {
        deleteBuffer += 1;
        setDeleteBuffer();
      }
    }, 1000);
  };

  const deleteProfile = () => {
    if (deleteBufferTimer) {
      clearTimeout(deleteBufferTimer);
    }
    setDeleteBuffer();

    deleteBuffer--;
    if (deleteBuffer <= 0) {
      settingsStore.update((store) => {
        if (!$selectedProfileStore) return store;
        store.profile.options = store.profile.options.filter(
          (option) => option.name !== $selectedProfileStore?.name
        );
        store.profile.selected = store.profile.options.length - 1;
        return store;
      });
      deleteBuffer = DELETEBUFFER;
      clearTimeout(deleteBufferTimer);
    }
  };

  $: deleteColor = (() => {
    if ($settingsStore.profile.options.length < 2) {
      return "text-neutral cursor-not-allowed";
    }
    switch (deleteBuffer) {
      case 3:
        return "active:scale-110";
      case 2:
        return "text-warning hover:scale-105";
      case 1:
        return "text-error !underline hover:scale-105 active:scale-110";
      case 0:
        return "text-error !underline hover:scale-105 active:scale-110";
      default:
        return "";
    }
  })();
</script>

{#key $settingsStore.profile.selected}
  <Select
    options={$settingsStore.profile.options.map((option) => option.name)}
    bind:index={$settingsStore.profile.selected}
    disableFirst={false}
  />
{/key}

{#key $selectedProfileNameStore}
  <div class="flex flex-col items-start gap-2">
    <Savable
      label="Profile Name"
      bind:value={$selectedProfileNameStore}
      doSave={(val) => {
        return (
          !!val &&
          !$settingsStore.profile.options.some(
            (option, index) =>
              option.name.trim() === val.trim() &&
              index !== $settingsStore.profile.selected
          )
        );
      }}
      locked
    />
    <div>
      <button
        class="link text-sm no-underline {deleteColor}"
        on:click={deleteProfile}
        disabled={$settingsStore.profile.options.length < 2}
      >
        Delete
      </button>
      <button class="link text-sm" on:click={duplicateProfile}>
        Duplicate
      </button>
    </div>
  </div>
{/key}
