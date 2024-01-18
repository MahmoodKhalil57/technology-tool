<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { html } from "@codemirror/lang-html";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { preferredColorScheme } from "../../stores/preferredColorScheme";
  import Toggle from "./toggle.svelte";

  export let value: string;

  let lineWrapping = false;
</script>

<Toggle checkboxButtonLabel="Line Wrap" bind:value={lineWrapping} />

<CodeMirror
  class="w-full"
  bind:value
  lang={html()}
  theme={$preferredColorScheme === "dark" ? oneDark : undefined}
  placeholder="Select an element to edit its content"
  tabSize={2}
  styles={{}}
  {lineWrapping}
/>
