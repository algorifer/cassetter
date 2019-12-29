<script>
  // Stores
  import { samplesFolder } from "../stores/tapes.js";

  // Components
  import SelectFolder from "./SelectFolder.svelte";
  import TapeList from "./TapeList.svelte";
  import TapeInfo from "./TapeInfo.svelte";
  import Master from "./Master.svelte";
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 40px);
    pointer-events: all;
    -webkit-app-region: none;
  }

  .tape_folder {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
</style>

<main>
  {#if $samplesFolder}
    <section class="tape_list">
      <TapeList />
    </section>
  {:else}
    <section class="tape_folder">
      <SelectFolder />
    </section>
  {/if}
  <Master />
</main>
