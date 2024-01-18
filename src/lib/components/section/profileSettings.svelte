<script>
  import Savable from "../ui/savable.svelte";

  let profileName = "Profile 1";
</script>

{profileName}
<Savable label="Profile Name" bind:value={profileName} harder />
