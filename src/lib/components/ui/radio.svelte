<script lang="ts">
  type Value = $$Generic;
  export let value: Value;
  export let radioButtons = [] as { label: string; value: Value }[];
  export let id = "";
  export let Class = "";
</script>

<div class="radio-buttons w-full join {Class}">
  {#each radioButtons as radioButton, i}
    <input
      id="{id}-{i}"
      type="radio"
      class="btn bg-inherit join-item no-animation relative justify-center items-center border border-zinc-500 whitespace-nowrap text-gray-400 rounded-lg cursor-pointer text-[9px] px-2 py-1 h-auto !min-h-min
      hover:bg-[#59585f]
      checked:!bg-[#36363a] checked:!font-semibold checked:!border-base-300 checked:!cursor-default checked:!text-gray-300"
      name={id}
      value={radioButton.value}
      aria-label={radioButton.label}
      bind:group={value}
    />
  {/each}
</div>

<style lang="postcss">
  .radio-buttons {
    @apply flex flex-wrap;
  }

  @media (max-width: 200px) {
    .radio-buttons {
      @apply flex-col join-vertical;
    }
  }
</style>
