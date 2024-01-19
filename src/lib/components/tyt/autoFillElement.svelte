<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import { type initSettings } from "../../stores/settings";

  type Preference =
    (typeof initSettings.profile.options)[number]["autofillPreferences"][number];
  export let preference: Preference;
</script>

<div class="flex flex-col items-start gap-2">
  <Savable
    label={preference.label}
    bind:value={preference.value}
    locked
    disabledIf={(value) => ["off", "default"].includes(value.trim())}
    radioButtons={preference.availableModes.map((mode) => ({
      label: mode.label,
      value: mode.mode,
    }))}
    bind:radioValue={preference.mode}
  />
</div>
