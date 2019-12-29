<script>
  // Stores
  import { tapes } from "../stores/tapes.js";
  import { currentChannel } from "../stores/ui.js";

  // Components
  import TapeItem from "./TapeItem.svelte";

  // Events
  function onKeydown(e) {
    if (e.shiftKey) {
      if (e.key === `ArrowDown`)
        currentChannel.update(ch => (ch === 15 ? ch : ch + 1));
      if (e.key === `ArrowUp`)
        currentChannel.update(ch => (ch === 0 ? ch : ch - 1));
    }
  }
</script>

<style>
  ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<svelte:window on:keydown={onKeydown} />

<ul>
  {#each $tapes as tape, channel}
    <TapeItem {tape} {channel} />
  {/each}
</ul>
