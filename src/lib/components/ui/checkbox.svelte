<script lang="ts">
  type Value = $$Generic;
  export let checkboxButtonLabel: string | undefined;
  export let value: Value;
  export let id = "";
  export let Class = "";
  export let svgIcone = "";
  export let values: Value[] = [0, 1] as Value[];

  export let variant: keyof typeof variantConfig = "default";

  let checkBoxState = {
    get checked() {
      return values?.[1] === value;
    },
    set checked(isChecked) {
      value = values![+isChecked];
    },
  };

  let variantConfig = {
    default: `btn max-w-fit bg-inherit join-item no-animation relative justify-center items-center border whitespace-nowrap rounded-lg cursor-pointer text-[9px] px-2 py-1 h-auto !min-h-min
          checked:!font-semibold checked:!border-base-300 border-zinc-500 text-gray-400 hover:!bg-[#59585f] checked:!bg-[#36363a] checked:!text-gray-300`,
    svg:
      "btn !bg-base-content !text-base-content cursor-pointer !p-0 !text-xs backdrop-brightness-50 !min-h-[1rem] !h-[1rem] aspect-square " +
      svgIcone,
  };
</script>

<div
  class="flex hover:backdrop-brightness-50 p-1 rounded-lg aspect-square {checkBoxState.checked
    ? 'backdrop-brightness-50'
    : ''}"
>
  {#if checkboxButtonLabel}
    <span class="font-normal mr-3 text-base-content font-serif"
      >{checkboxButtonLabel}:</span
    >
  {/if}
  <input
    {id}
    type="checkbox"
    class="{variantConfig[variant]} {Class} "
    bind:checked={checkBoxState.checked}
  />
</div>
