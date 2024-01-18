<script lang="ts">
  import { onMount } from "svelte";
  import { addListener, browserEval } from "./lib/utils/browserUtils";
  import ProfileSettings from "./lib/components/section/profileSettings.svelte";
  import { settingsStore } from "./lib/stores/settings";

  const syncStores = async () => {
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
      if (changeInfo.status === "complete") {
        window.location.reload();
      }
    });
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
</div>
