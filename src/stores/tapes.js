import { writable, get } from 'svelte/store'
import Tone from 'tone'
import getPlayerSetting from '../libs/getPlayerSettings'
import {
  playOnce,
  playLoop,
  playOnceReverse,
  playLoopReverse,
  stop,
} from '../libs/playModes'
import base36 from '../libs/base36'
import { createPlayer } from '../utils/createPlayer'

const defaultTape = {
  name: null,
  player: null,
  isPlay: false,
  mode: `.`,
}

export const samplesFolder = writable(null)
export const tapes = createTapes()

const delPlayer = (tape) => {
  if (tape.player) {
    tape.player.dispose()
    tape.crusher.dispose()
    tape.filterHP.dispose()
    tape.filterLP.dispose()
    tape.limiter.dispose()
  }
}

const createTape = async (name, path) => {
  const player = await createPlayer(path)
  const crusher = new Tone.BitCrusher(8)
  const filterHP = new Tone.Filter(1, 'highpass')
  const filterLP = new Tone.Filter(10000, 'lowpass')
  const feedbackDelay = new Tone.FeedbackDelay(0, 0)
  const limiter = new Tone.Limiter(-20)

  player.loop = true
  player.connect(crusher)
  crusher.connect(feedbackDelay)
  feedbackDelay.connect(filterHP)
  filterHP.connect(filterLP)
  filterLP.connect(limiter)
  limiter.toMaster()

  return {
    name,
    player,
    mode: '.',
    crusher,
    filterHP,
    filterLP,
    feedbackDelay,
    limiter,
    ...getPlayerSetting(player),
  }
}

const updateRange = (range, vel, tape) => {
  const { param, min, max } = range
  const step = (max - min) / 35

  if (param === 'volume') {
    tape.player.volume.value = min + step * vel
  } else {
    tape.player[param] = min + step * vel
  }

  return { ...range, value: vel, msgValue: base36[vel] }
}

const updateEffect = (effect, vel, tape) => {
  const { param, min, max } = effect
  const step = (max - min) / 35
  const value = min + step * vel

  if (param === 'bitCrusher') {
    tape.crusher.bits = value
  } else if (param === 'delayTime') {
    tape.feedbackDelay.delayTime.value = value
  } else if (param === 'feedback') {
    tape.feedbackDelay.feedback.value = value
  } else if (param === 'highpassFilter') {
    tape.filterHP.frequency.value = value
  } else if (param === 'lowpassFilter') {
    tape.filterLP.frequency.value = value
  }

  return { ...effect, value: vel, msgValue: base36[vel] }
}

function createTapes() {
  const { subscribe, set, update } = writable(new Array(16).fill(defaultTape))

  const setPlayer = async (id, name, path) => {
    const newTape = await createTape(name, path)

    update((tapes) => tapes.map((tape, i) => (i === id ? newTape : tape)))
  }

  const changeRange = (tape, knob, vel) => {
    const newRanges = tape.ranges.map((range, i) => {
      if (i !== knob - 1) return range
      return updateRange(range, vel, tape)
    })
    return { ...tape, ranges: newRanges }
  }

  const changeEffect = (tape, knob, vel) => {
    const newEffects = tape.effects.map((effect, i) => {
      if (i !== knob - 8) return effect
      return updateEffect(effect, vel, tape)
    })

    return { ...tape, effects: newEffects }
  }

  const msg = (ch, knob, vel) =>
    update((tapes) =>
      tapes.map((tape, i) => {
        if (ch !== i || !tape.player) return tape
        if (knob === 0) {
          if (vel === 24) {
            playOnce(tape)
          } else if (vel === 21) {
            playLoop(tape)
          } else if (vel === 27) {
            playOnceReverse(tape)
          } else if (vel === 26) {
            playLoopReverse(tape)
          } else {
            stop(tape)
          }
          return tape
        }
        if (knob > 0 && knob <= 7) return changeRange(tape, knob, vel)
        if (knob > 7 && knob <= 12) return changeEffect(tape, knob, vel)
        return tape
      })
    )

  const del = (ch) =>
    update((tapes) =>
      tapes.map((tape, i) => {
        if (i === ch) {
          delPlayer(tape)
          return defaultTape
        }
        return tape
      })
    )

  const openSetting = async (settings) => {
    const folder = get(samplesFolder)
    const newTapes = new Array(16).fill(defaultTape)
    set(newTapes)

    for (let i = 0; i < settings.length; i++) {
      const setting = settings[i]
      if (setting !== null) {
        await setPlayer(i, setting.name, `${folder}/${setting.name}.wav`)

        Object.entries(setting.ranges).forEach(([name, value], kn) => {
          const vel = base36.indexOf(value)

          if (vel >= 0) {
            msg(i, kn + 1, vel)
          }
        })

        Object.entries(setting.effects).forEach(([name, value], kn) => {
          const vel = base36.indexOf(value)

          if (vel >= 0) {
            msg(i, kn + 8, vel)
          }
        })
      }
    }
  }

  return {
    openSetting,
    subscribe,
    setPlayer,
    msg,
    del,
  }
}
