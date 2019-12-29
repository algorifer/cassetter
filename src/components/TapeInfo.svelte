<script>
  // Store
  import { tapes } from "../stores/tapes.js";

  // Components
  import SelectSample from "./SelectSample.svelte";
  import TapeViz from "./TapeViz.svelte";
  import PlayerSettings from "./PlayerSettings.svelte";

  // Model
  export let channel;
  $: player = $tapes[channel].player;
</script>

{#if player}
  <TapeViz {channel} />
  <PlayerSettings {channel} />
{:else}
  <SelectSample />
{/if}
