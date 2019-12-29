<script>
  // Svelte
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  // Stores
  import { currentChannel } from "../stores/ui.js";

  // Components
  import TapeHeader from "./TapeHeader.svelte";
  import TapeInfo from "./TapeInfo.svelte";

  // Model
  export let tape;
  export let channel;
</script>

<style>
  li {
    position: relative;
    width: 100%;
    padding: 12px 0;
  }

  .active::before {
    content: "+";
    position: absolute;
    left: -3px;
    top: 30px;
    line-height: 1;
    color: var(--f_low);
  }

  .active::after {
    content: "+";
    position: absolute;
    right: -3px;
    top: 30px;
    line-height: 1;
    color: var(--f_low);
  }

  div {
    margin: 12px 0;
  }
</style>

<li class:active={$currentChannel === channel}>
  <TapeHeader {tape} {channel} />
  {#if $currentChannel === channel}
    <div
      in:slide={{ delay: 0, duration: 300 }}
      out:slide={{ delay: 0, duration: 300 }}>
      <TapeInfo {channel} />
    </div>
  {/if}
</li>
