<script>
  // Svelte
  import { onMount } from "svelte";

  // Stores
  import { tapes } from "../stores/tapes.js";
  import { chPlay } from "../stores/ui.js";

  // Model
  let cmsg = `none`;
  let devices = [];
  let midi;

  // Methods
  const onMessage = msg => {
    if (msg.data[0] >= 176 && msg.data[0] < 184) {
      const ch = msg.data[0] - 176;
      const knob = msg.data[1] - 64;
      const vel = Math.floor((msg.data[2] / 127) * 35);

      if (knob === 0) chPlay.play(ch);
      tapes.msg(ch, knob, vel);
    }
  };

  const connect = () => {
    midi = devices[0];

    if (!midi) {
      cmsg = `Could not connect Midi`;
    } else {
      cmsg = `${midi.name}`;
      midi.onmidimessage = onMessage;
    }
  };

  const access = midiAccess => {
    const inputs = midiAccess.inputs.values();
    devices = [];
    for (let i = inputs.next(); i && !i.done; i = inputs.next()) {
      devices.push(i.value);
    }
    connect();
  };

  const refresh = () => {
    if (!navigator.requestMIDIAccess) return;
    navigator.requestMIDIAccess().then(access, err => {
      cmsg = `No Midi`;
    });
  };

  // Lifecicle
  onMount(() => {
    cmsg = `Starting..`;
    refresh();
  });
</script>

<style>
  div {
    margin: 0;
    color: var(--f_med);
  }
</style>

<div>MIDI: {cmsg}</div>
