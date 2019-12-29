<script>
  // Svelte
  import { onMount, afterUpdate } from "svelte";

  // Store
  import { tapes } from "../stores/tapes.js";

  // Model
  export let channel;
  let waveform;
  let canvas;
  let canvasW;
  let canvasH;

  $: player = $tapes[channel].player;

  const scale = (inputY, yMin, yMax, xMin, xMax) => {
    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;

    return outputX;
  };

  const computeRMS = width => {
    let array = $tapes[channel].player.buffer.toArray(0);
    const length = 64;
    const rmses = [];
    for (let i = 0; i < width; i++) {
      const offsetStart = Math.floor(
        scale(i, 0, width, 0, array.length - length)
      );
      const offsetEnd = offsetStart + length;
      let sum = 0;
      for (let s = offsetStart; s < offsetEnd; s++) {
        sum += Math.pow(array[s], 2);
      }
      const rms = Math.sqrt(sum / length);
      rmses[i] = rms;
    }
    const max = Math.max(...rmses);
    waveform = rmses.map(v => scale(Math.pow(v, 0.8), 0, max, 0, 1));
  };

  $: if (canvas) {
    canvas.width = canvasW * 2;
    canvas.height = canvasH * 2;
    const { width, height } = canvas;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    computeRMS(width);

    const contextLoopStart = scale(
      $tapes[channel].player.loopStart,
      0,
      $tapes[channel].player.buffer.duration,
      0,
      width
    );
    let contextLoopEnd = scale(
      $tapes[channel].player.loopEnd,
      0,
      $tapes[channel].player.buffer.duration,
      0,
      width
    );
    if ($tapes[channel].player.loopEnd === 0) {
      contextLoopEnd = width;
    }

    waveform.forEach((val, i) => {
      if (i % 4 !== 0) return;

      const barHeight = val * height;
      // const x = $tapes[channel].player.reverse ? width - i : i;
      const x = i;
      context.fillStyle =
        contextLoopStart > x || x > contextLoopEnd ? "#444444" : "#ffffff";
      context.fillRect(x, height / 2 - barHeight / 2, 2, barHeight);
      context.fill();
    });
  }
</script>

<style>
  div {
    width: 100%;
    height: 72px;
    padding: 6px 0;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>

<div>
  <canvas
    bind:this={canvas}
    bind:clientWidth={canvasW}
    bind:clientHeight={canvasH} />
</div>
