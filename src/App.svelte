<script lang="ts">
  import { onMount } from "svelte";
  import { addListener, browserEval } from "./lib/utils/browserUtils";
  import ProfileSettings from "./lib/components/section/profileSettings.svelte";
  import { settingsStore } from "./lib/stores/settings";
  import Controls from "./lib/components/section/controls.svelte";
  import AutofillPreference from "./lib/components/section/autofillPreference.svelte";

  const syncStores = async () => {
    try {
      await browserEval(`const currentObserver = new MutationObserver((mutationList, observer) => {
      var customEvent = new CustomEvent("__msg-from-injected-script__", {
        domChanged: true,
      });

      document.dispatchEvent(customEvent);
      });
      currentObserver.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
      });`);

      addListener.onMessage(function (result, sender) {
        // syncCssStores();
        // syncContentStores();
      });

      addListener.onReload(function (tabId, changeInfo, tab) {
        if (changeInfo.status === "complete" && tab.active) {
          window.location.reload();
        }
      });
    } catch (error) {}
  };

  onMount(() => {
    syncStores();
  });

  const dev = import.meta.env.DEV;
</script>

{JSON.stringify($settingsStore)}

<div
  class="flex flex-col w-full py-3 items-center gap-3 {dev
    ? 'resize-x overflow-x-auto'
    : ''}"
>
  <ProfileSettings />

  <Controls />

  <AutofillPreference />
</div>
