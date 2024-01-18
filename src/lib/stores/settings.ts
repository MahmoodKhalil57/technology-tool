import { derived, writable } from "svelte/store";

const initSettings = {
  profile: {
    selected: 0 as number | undefined,
    options: [
      {
        name: "Default",
      },
    ],
  },
};

export let settingsStore = writable(initSettings);

export let selectedProfileStore = {
  subscribe: derived(settingsStore, ($settingsStore) => {
    return $settingsStore.profile.selected !== undefined
      ? $settingsStore.profile.options[$settingsStore.profile.selected]
      : undefined;
  }).subscribe,
  set: (value: (typeof initSettings)["profile"]["options"][0]) => {
    settingsStore.update((settings) => {
      if (settings.profile.selected !== undefined) {
        settings.profile.selected = settings.profile.options.indexOf(value);
      }
      return settings;
    });
  },
  update: (
    fn: (
      value: (typeof initSettings)["profile"]["options"][0]
    ) => (typeof initSettings)["profile"]["options"][0]
  ) => {
    settingsStore.update((settings) => {
      if (settings.profile.selected !== undefined) {
        settings.profile.options[settings.profile.selected] = fn(
          settings.profile.options[settings.profile.selected]
        );
      }
      return settings;
    });
  },
};
