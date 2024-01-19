<script lang="ts">
  import Savable from "../ui/savable.svelte";
  import { type initSettings, preferenceModes } from "../../stores/settings";
  import Radio from "../ui/radio.svelte";

  type Preference =
    (typeof initSettings.profile.options)[number]["autofillPreferences"][number];
  export let preference: Preference;

  let locked = true;
</script>

<div class="flex flex-col items-start gap-2">
  <Savable label={preference.label} bind:value={preference.value} bind:locked />
  <Radio
    radioButtons={preferenceModes}
    bind:value={preference.mode}
    disabled={locked}
  />
</div>
