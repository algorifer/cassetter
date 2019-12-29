export default player => ({
  ranges: [
    {
      label: 'Volume',
      param: 'volume',
      min: -80,
      max: 0,
      value: 35
    },
    {
      label: 'Grain Size',
      param: 'grainSize',
      min: 0.01,
      max: 0.5,
      value: 13
    },
    {
      label: 'Playback Rate',
      param: 'playbackRate',
      min: 0.5,
      max: 2,
      value: 11
    },
    {
      label: 'Detune',
      param: 'detune',
      min: -1200,
      max: 1200,
      value: 18
    },
    {
      label: 'Overlap',
      param: 'overlap',
      min: 0.01,
      max: 0.2,
      value: 17
    },
    {
      label: 'Loop Start',
      param: 'loopStart',
      min: 0,
      max: player.buffer.duration,
      value: 0
    },
    {
      label: 'Loop End',
      param: 'loopEnd',
      min: 0,
      max: player.buffer.duration,
      value: 0
    }
  ],
  effects: [
    {
      label: 'Bit Crusher',
      min: 0,
      max: 8,
      value: 35
    },
    {
      label: 'Delay Time',
      min: 0,
      max: 1,
      value: 0
    },
    {
      label: 'Feedback',
      min: 0,
      max: 1,
      value: 0
    },
    {
      label: 'Highpass Filter',
      min: 0,
      max: 10000,
      value: 0
    },
    {
      label: 'Lowpass Filter',
      min: 0,
      max: 10000,
      value: 35
    }
  ]
});
