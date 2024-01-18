<script lang="ts">
  export let checkboxButtonLabel: string;
  export let id = "";
  export let Class = "";
  export let onClick: () => void;
</script>

<button
  {id}
  class="btn max-w-fit bg-inherit join-item no-animation relative justify-center items-center border border-zinc-500 whitespace-nowrap text-gray-400 rounded-lg cursor-pointer text-[9px] px-2 py-1 h-auto !min-h-min
          hover:!bg-[#59585f]{Class}"
  on:click={onClick}>{checkboxButtonLabel}</button
>
