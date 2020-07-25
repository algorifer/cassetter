import Tone from 'tone'

export const createPlayer = (path) =>
  new Promise((resolve, reject) => {
    const player = new Tone.GrainPlayer(path, () => {
      resolve(player)
    })
  })
