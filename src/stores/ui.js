import {writable} from 'svelte/store';

export const currentChannel = writable(0);
export const currentKnob = writable(1);

function createChPlay() {
  const {subscribe, set, update} = writable(new Array(16).fill(false));

  const changeStatus = (channels, ch, status) =>
    channels.map((channel, i) => (i === ch ? status : channel));

  const play = ch => {
    update(channels => changeStatus(channels, ch, true));
    const timeout = setTimeout(() => {
      update(channels => changeStatus(channels, ch, false));
      clearTimeout(timeout);
    }, 100);
  };

  return {
    subscribe,
    play
  };
}

export const chPlay = createChPlay();
