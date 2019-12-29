<script>
  // Libs
  import Tone from "tone";
  import getSamples from "../libs/getSamples.js";
  import { onMount, onDestroy } from "svelte";

  // Stores
  import { samplesFolder, tapes } from "../stores/tapes.js";
  import { currentChannel } from "../stores/ui.js";

  // Model
  let samples = null;
  let currentSample = 0;

  // LifeCycle
  onMount(async () => {
    samples = await getSamples($samplesFolder);
  });

  onDestroy(() => {
    samples = null;
  });

  // Events
  const onSampleClick = () => {
    const path = `${$samplesFolder}/${samples[currentSample]}.wav`;
    tapes.setPlayer($currentChannel, samples[currentSample], path);
  };

  const onMouseover = i => (currentSample = i);

  function onKeydown(e) {
    if (!e.shiftKey) {
      if (e.key === `ArrowDown`) {
        e.preventDefault();
        currentSample =
          currentSample === samples.length - 1
            ? currentSample
            : currentSample + 1;
      }
      if (e.key === `ArrowUp`) {
        e.preventDefault();
        currentSample = currentSample === 0 ? currentSample : currentSample - 1;
      }
    }
    if (e.key === `Enter`) onSampleClick();
  }
</script>

<style>
  h2 {
    padding: 6px 0;
    font-size: inherit;
    font-weight: normal;
    color: var(--f_low);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button {
    width: 100%;
    padding: 6px 0;
    transition: 0.2s;
  }

  button::before {
    content: "|";
    padding-right: 12px;
    color: var(--f_low);
    transition: 0.2s;
  }

  .current {
    color: var(--b_inv);
    /* color: var(--f_high); */
  }

  .current::before {
    color: var(--b_inv);
    /* opacity: 0; */
  }
</style>

<svelte:window on:keydown={onKeydown} />

<h2>Select Sample</h2>
<ul>
  {#if samples}
    {#each samples as sample, i}
      <li>
        <button
          class:current={i === currentSample}
          on:mouseover={() => onMouseover(i)}
          on:click={() => onSampleClick(i)}>
          {sample}
        </button>
      </li>
    {/each}
  {:else}
    <li>LOADING...</li>
  {/if}
</ul>
