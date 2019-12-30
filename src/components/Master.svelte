<script>
  // Components
  import Midi from "./Midi.svelte";
  import Upd from "./Upd.svelte";
</script>

<style>
  div {
    position: sticky;
    bottom: 0;
    display: flex;
    padding: 20px 0;
    background: var(--background);
  }
</style>

<div>
  <Midi />
  <!-- <Upd /> -->
</div>
