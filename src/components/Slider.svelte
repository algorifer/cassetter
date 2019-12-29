<script>
  // Libs
  import base36 from "../libs/base36.js";

  // Store
  import { currentChannel, currentKnob } from "../stores/ui.js";
  import { tapes } from "../stores/tapes.js";

  // Model
  export let range;
  export let effect;
  export let knob;
  let input;

  let sliderArr = new Array(36).fill(".");

  $: value = range ? range.value : effect.value;
  $: label = range ? range.label : effect.label;

  $: vel = base36[value];
  $: sliderArr = sliderArr.map((s, i) => (i <= value ? "|" : "."));

  $: if ($currentKnob === knob && input) input.focus();

  const onInput = e => tapes.msg($currentChannel, knob, e.target.value);

  const onMouseover = () => currentKnob.set(knob);

  function onKeydown(e) {
    if (e.key === `ArrowDown`) {
      e.preventDefault();
      if (!e.shiftKey)
        currentKnob.update(index => (index < 12 ? index + 1 : index));
    }
    if (e.key === `ArrowUp`) {
      e.preventDefault();
      if (!e.shiftKey)
        currentKnob.update(index => (index === 1 ? index : index - 1));
    }
  }
</script>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 6px 0;
  }

  .info {
    display: flex;
  }

  label {
    color: var(--f_med);
  }

  .split {
    padding: 0 12px;
    color: var(--f_low);
  }

  .range {
    position: relative;
  }

  .knob {
    display: flex;
    color: var(--f_med);
  }

  .value {
    color: var(--f_high);
  }

  input {
    width: 100%;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .current {
    color: var(--b_inv);
  }
</style>

<div class="root">
  <div class="info">
    <span class="knob" class:current={$currentKnob === knob}>
      !{Number($currentChannel).toString(16)}{base36[knob]}
      <span class="value">{vel}</span>
    </span>
    <span class="split">|</span>
    <label class:current={$currentKnob === knob}>{label}</label>
  </div>
  <div class="range" on:mouseover={onMouseover}>
    <input
      bind:this={input}
      type="range"
      min="0"
      max="35"
      {value}
      step="1"
      on:input={e => onInput(e)}
      on:keydown={onKeydown} />
    {sliderArr.join('')}
  </div>
</div>
