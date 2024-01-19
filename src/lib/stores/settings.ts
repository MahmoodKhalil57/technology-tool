import { derived, writable } from "svelte/store";

export const preferenceModes = [
  {
    label: "Prefix",
    value: "prefix",
  },
  {
    label: "Suffix",
    value: "suffix",
  },
];

export const initSettings = {
  profile: {
    selected: 0 as number | undefined,
    options: [
      {
        name: "Default",
        autoFill: false,
        autofillPreferences: [
          {
            type: "byID",
            label: "Legal Name",
            value: "",
            mode: "prefix",
            target: "legal_name",
          },
        ],
      },
    ],
  },
};

// add undo/redo
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

export let selectedProfileNameStore = {
  subscribe: derived(selectedProfileStore, ($selectedProfileStore) => {
    return $selectedProfileStore?.name;
  }).subscribe,
  set: (value: string) => {
    selectedProfileStore.update((store) => {
      store.name = value;
      return store;
    });
  },
};
