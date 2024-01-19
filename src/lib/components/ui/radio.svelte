<script lang="ts">
  type Value = $$Generic;
  export let value: Value;
  export let radioButtons = [] as { label: string; value: Value }[];
  export let id = "";
  export let Class = "";
  export let disabled = false;
</script>

<div class="radio-buttons w-full join {Class}">
  {#each radioButtons as radioButton, i}
    <input
      id="{id}-{i}"
      type="radio"
      class="join-item btn cursor-pointer hover:backdrop-brightness-50 checked:backdrop-brightness-50 {disabled
        ? 'btn-disabled cursor-not-allowed'
        : ''}"
      name={id}
      value={radioButton.value}
      aria-label={radioButton.label}
      bind:group={value}
      {disabled}
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
