<script lang="ts">
  type Value = $$Generic;
  export let checkboxButtonLabel: string | undefined;
  export let value: Value;
  export let values: Value[] = [0, 1] as Value[];

  let checkBoxState = {
    get checked() {
      return values?.[1] === value;
    },
    set checked(isChecked) {
      value = values![+isChecked];
    },
  };
</script>

<div class="form-control">
  <label class="label justify-start gap-2 cursor-pointer">
    {#if checkboxButtonLabel}
      <span class="label-text text-xs">{checkboxButtonLabel}</span>
    {/if}
    <input
      type="checkbox"
      class="toggle toggle-xs"
      bind:checked={checkBoxState.checked}
    />
  </label>
</div>
