<script lang="ts">
  export let Class = "";
  export let value = "";
  export let placeholder = "";
  export let label = "";

  function replaceRGBWithHex(inputString: string) {
    // Function to convert an individual RGB value to Hex
    function rgbToHex(rgbValue: string) {
      var hex = parseInt(rgbValue).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    // Regular expression to match RGB in the input string
    var regex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/g;

    // Replace each RGB value with its Hex equivalent
    return inputString.replace(regex, function (match, r, g, b) {
      return "#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
    });
  }

  let rangeTimeout: number | undefined;

  $: val = replaceRGBWithHex(value);
  const mask = {
    get color() {
      return val;
    },
    set color(newVal) {
      val = newVal;
      clearTimeout(rangeTimeout);
      rangeTimeout = setTimeout(() => {
        value = val;
      }, 300);
    },
  };
</script>

<div class="overflow-x-hidden w-full">
  <div class="box {Class}">
    <span class="font-normal mr-3 text-base-content font-serif"
      >{label}:
      <input type="color" id="head" name="head" bind:value={mask.color} />
    </span>
    <input class="inputBox" type="text" {placeholder} bind:value={mask.color} />
  </div>
</div>
