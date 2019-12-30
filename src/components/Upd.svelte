<script>
  // Svelte
  import { onMount } from "svelte";

  // Libs
  const dgram = require("dgram");
  import base36 from "../libs/base36.js";

  // Stores
  import { tapes } from "../stores/tapes.js";
  import { chPlay } from "../stores/ui.js";

  // Model
  let status = `none`;
  let updMsg = ``;
  let PORT = 49161;

  // Methods
  const onUpdMsg = msg => {
    const values = msg.split(``);
    const ch = base36.indexOf(values[0]);
    const knob = base36.indexOf(values[1]);
    const vel = base36.indexOf(values[2]);

    if (!!vel) {
      if (knob === 0) chPlay.play(ch);
      tapes.msg(ch, knob, vel);
    }
  };

  // Lifecicle
  onMount(() => {
    status = `creating...`;
    const server = dgram.createSocket("udp4");

    server.on("error", err => {
      console.error(err);
      server.close();
      updMsg = `error`;
    });

    server.on("message", msg => {
      onUpdMsg(msg.toString("utf-8"));
      updMsg = msg.toString("utf-8");
    });

    server.on("listening", () => {
      status = `listening`;
    });

    status = `bind`;
    server.bind(PORT);
  });
</script>

<style>
  div {
    margin: 0;
    color: var(--f_med);
  }
</style>

<div>UPD: {status} | {updMsg}</div>
