<script>
  // Libs
  import selectFolder from "../libs/selectFolder.js";

  // Stores
  import { samplesFolder } from "../stores/tapes.js";

  // Componets
  import Logo from "./Logo.svelte";

  // Events
  const onSelectClick = async () => {
    const path = await selectFolder();
    samplesFolder.set(path);
  };
</script>

<style>
  span {
    color: var(--f_low);
  }
</style>

<Logo />
<button on:click={onSelectClick}>Select Samples Folder</button>
<span>(press Ctrl or Cmd + f)</span>
