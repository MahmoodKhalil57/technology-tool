import { derived, writable, get } from "svelte/store";
import { customAlphabet } from "nanoid";
import { browserEval } from "../utils/browserUtils";
const randomAlpha = (size = 5) =>
  customAlphabet("abcdefghijklmnopqrstuvwxyz", size)();

type PreferenceModes = "off" | "prefix" | "default" | "exact";

type PreferenceType = "textByID" | "selectByID";

export const initSettings = {
  profile: {
    selected: 0 as number | undefined,
    options: [
      {
        name: "Default",
        autoFill: false,
        autofillPreferences: [
          {
            type: "textByID" satisfies PreferenceType,
            label: "Legal Name",
            value: "autofill",
            mode: "prefix" satisfies PreferenceModes,
            target: "legal_name",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Prefix",
                mode: "prefix",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "Annual Turnover",
            value: "4444",
            mode: "default" satisfies PreferenceModes,
            target: "annual_turnover",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "4444",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "Monthly Turnover",
            value: "2",
            mode: "default" satisfies PreferenceModes,
            target: "monthly_card_turnover",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "2",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "Average Transaction Value",
            value: "2",
            mode: "default" satisfies PreferenceModes,
            target: "avg_tran_value",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "2",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "selectByID" satisfies PreferenceType,
            label: "Business Entity",
            value: "Partnership",
            mode: "default" satisfies PreferenceModes,
            target: "ownership_entity_type",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "Partnership",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "Card Present Transactions",
            value: "98",
            mode: "default" satisfies PreferenceModes,
            target: "sales_ftf_perc",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "98",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "MOTO Transactions",
            value: "1",
            mode: "default" satisfies PreferenceModes,
            target: "sales_moto_perc",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "1",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
          },
          {
            type: "textByID" satisfies PreferenceType,
            label: "Internet Transactions",
            value: "1",
            mode: "default" satisfies PreferenceModes,
            target: "sales_internet_perc",
            availableModes: [
              {
                label: "Off",
                mode: "off",
              },
              {
                label: "Default",
                mode: "default",
                value: "1",
              },
              {
                label: "Exact",
                mode: "exact",
              },
            ],
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

export const autoFillSelected = async function () {
  const option = get(selectedProfileStore);
  if (option !== undefined) {
    console.log(option.autofillPreferences.length);
    for (const preference of option.autofillPreferences) {
      let newValue = "";
      switch (preference.mode.trim()) {
        case "off":
          continue;
        case "prefix":
          newValue = `${preference.value}${randomAlpha(5)}`;
          break;
        case "exact":
          newValue = preference.value;
          break;
        case "default":
          newValue = preference.availableModes.find((mode) => {
            return mode.mode === preference.mode;
          })?.value!;
          break;
      }

      switch (preference.type) {
        case "textByID":
          if (!!newValue) {
            try {
              await browserEval(
                `if(!document.querySelector("input#${preference.target}")?.value)
                document.querySelectorAll("input#${preference.target}").forEach((el) => {
                  el.value="${newValue}"
                  el.setAttribute('data-unmasked-value',"${newValue}")
                })
                `
              );
            } catch (error) {}
          }
          break;
        case "selectByID":
          if (!!newValue) {
            try {
              await browserEval(
                `if(!document.querySelector("input#${preference.target}")?.value)
                document.querySelectorAll("select#${preference.target}").forEach((el) => {
                  el.value = Array.from(el.options).find((option) => option.innerText==="${newValue}").value
                  el.nextSibling.firstChild.firstChild.firstChild.firstChild.firstChild.innerText="${newValue}"
                })`
              );
            } catch (error) {}
          }
          break;
      }
    }
  }
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
