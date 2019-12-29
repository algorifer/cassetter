<script>
  // Stores
  import { tapes } from "../stores/tapes.js";

  // Components
  import Slider from "./Slider.svelte";

  // Model
  export let channel;

  $: tape = $tapes[channel];
</script>

<style>
  ul {
    position: relative;
    margin: 12px 0;
    padding: 0;
    list-style: none;
  }

  ul::before {
    content: "+";
    position: absolute;
    left: -3px;
    bottom: -18px;
    line-height: 1;
    color: var(--f_low);
  }

  ul::after {
    content: "+";
    position: absolute;
    right: -3px;
    bottom: -18px;
    line-height: 1;
    color: var(--f_low);
  }
</style>

<ul>
  {#each tape.ranges as range, knob}
    <li>
      <Slider knob={knob + 1} {range} />
    </li>
  {/each}
  {#each tape.effects as effect, knob}
    <li>
      <Slider knob={knob + 8} {effect} />
    </li>
  {/each}
</ul>
