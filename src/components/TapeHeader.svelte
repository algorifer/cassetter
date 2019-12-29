<script>
  // Stores
  import { currentChannel, chPlay } from "../stores/ui.js";
  import { tapes } from "../stores/tapes.js";

  // Model
  export let tape;
  export let channel;
  let play = false;

  // Events
  const onTapeClick = () => {
    currentChannel.set(channel);
  };

  const onDelClick = () => {
    tapes.del(channel);
  };
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .split {
    padding: 0 12px;
    color: var(--f_low);
  }

  .channel {
    color: var(--f_high);
    transition: 0.1s;
  }

  .name {
    margin-right: auto;
  }

  .active {
    color: var(--f_high);
  }

  .play {
    color: var(--f_high);
    background: var(--b_med);
  }
</style>

<div>
  <span class="channel" class:play={$chPlay[channel]}>
    !{Number(channel)
      .toString(16)
      .toUpperCase()}0{tape.mode}
  </span>
  <span class="split">|</span>
  <button
    on:click={onTapeClick}
    class="name"
    class:active={$currentChannel === channel}>
    {tape.name}
  </button>
  <span class="split">|</span>
  <button class="remove" class:hide={!tape.name} on:click={onDelClick}>
    X
  </button>
</div>
