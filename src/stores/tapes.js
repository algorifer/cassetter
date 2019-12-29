import {writable} from 'svelte/store';
import Tone from 'tone';
import getPlayerSetting from '../libs/getPlayerSettings';
import {
  playOnce,
  playLoop,
  playOnceReverse,
  playLoopReverse,
  stop
} from '../libs/playModes';

const defaultTape = {
  name: null,
  player: null,
  isPlay: false,
  mode: `.`
};

function createTapes() {
  const {subscribe, set, update} = writable(new Array(16).fill(defaultTape));

  const setPlayer = (id, name, path) => {
    const player = new Tone.GrainPlayer(path, () => {
      const crusher = new Tone.BitCrusher(8);
      const filterHP = new Tone.Filter(1, 'highpass');
      const filterLP = new Tone.Filter(10000, 'lowpass');
      const feedbackDelay = new Tone.FeedbackDelay(0, 0);
      const limiter = new Tone.Limiter(-20);

      player.loop = true;
      player.connect(crusher);
      crusher.connect(feedbackDelay);
      feedbackDelay.connect(filterHP);
      filterHP.connect(filterLP);
      filterLP.connect(limiter);
      limiter.toMaster();

      update(tapes =>
        tapes.map((tape, i) => {
          if (i === id)
            return {
              name,
              player,
              mode: '.',
              crusher,
              filterHP,
              filterLP,
              feedbackDelay,
              limiter,
              ...getPlayerSetting(player)
            };
          return tape;
        })
      );
    });
  };

  const changeRange = (tape, knob, vel) => {
    const newRanges = tape.ranges.map((range, i) => {
      if (i !== knob - 1) return range;
      const step = (range.max - range.min) / 35;
      if (i === 0) {
        tape.player.volume.value = range.min + step * vel;
      } else {
        tape.player[range.param] = range.min + step * vel;
      }
      return {...range, value: vel};
    });
    return {...tape, ranges: newRanges};
  };

  const changeEffect = (tape, knob, vel) => {
    const newEffects = tape.effects.map((effect, i) => {
      if (i !== knob - 8) return effect;
      const step = (effect.max - effect.min) / 35;
      const value = effect.min + step * vel;
      if (i === 0) {
        tape.crusher.bits = value;
      } else if (i === 1) {
        tape.feedbackDelay.delayTime.value = value;
      } else if (i === 2) {
        tape.feedbackDelay.feedback.value = value;
      } else if (i === 3) {
        tape.filterHP.frequency.value = value;
      } else if (i === 4) {
        tape.filterLP.frequency.value = value;
      }

      return {...effect, value: vel};
    });

    return {...tape, effects: newEffects};
  };

  const msg = (ch, knob, vel) =>
    update(tapes =>
      tapes.map((tape, i) => {
        if (ch !== i || !tape.player) return tape;
        if (knob === 0) {
          if (vel === 24) {
            playOnce(tape);
          } else if (vel === 21) {
            playLoop(tape);
          } else if (vel === 27) {
            playOnceReverse(tape);
          } else if (vel === 26) {
            playLoopReverse(tape);
          } else {
            stop(tape);
          }
          return tape;
        }
        if (knob > 0 && knob <= 7) return changeRange(tape, knob, vel);
        if (knob > 7 && knob <= 12) return changeEffect(tape, knob, vel);
        return tape;
      })
    );

  const del = ch =>
    update(tapes =>
      tapes.map((tape, i) => {
        if (i === ch) {
          tape.player.dispose();
          tape.crusher.dispose();
          tape.filterHP.dispose();
          tape.filterLP.dispose();
          tape.limiter.dispose();
          return defaultTape;
        }
        return tape;
      })
    );

  return {
    subscribe,
    setPlayer,
    msg,
    del
  };
}

export const samplesFolder = writable(null);
export const tapes = createTapes();
