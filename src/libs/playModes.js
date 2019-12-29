const getDuration = tape =>
  !tape.player.loopEnd
    ? tape.player.buffer.duration - tape.player.loopStart
    : tape.player.loopEnd - tape.player.loopStart;

const reverse = tape => {
  const newStart = tape.player.buffer.duration - tape.player.loopEnd;
  const newEnd = tape.player.buffer.duration - tape.player.loopStart;
  tape.player.loopStart = newStart;
  tape.player.loopEnd = newEnd;
  tape.ranges.forEach(range => {
    if (range.param === `loopStart`) {
      const step = (range.max - range.min) / 35;
      range.value = parseInt(newStart / step);
    } else if (range.param === `loopEnd`) {
      const step = (range.max - range.min) / 35;
      range.value = parseInt(newEnd / step);
    }
  });
};

export const playOnce = tape => {
  if (tape.mode !== `O`) tape.mode = `O`;
  tape.player.stop();
  if (tape.player.reverse) {
    tape.player.reverse = false;
    reverse(tape);
  }
  tape.player.start(undefined, tape.player.loopStart, getDuration(tape));
};

export const playLoop = tape => {
  if (tape.mode !== `L`) tape.mode = `L`;
  if (tape.player.reverse) {
    tape.player.reverse = false;
    reverse(tape);
  }
  tape.player.start(undefined, tape.player.loopStart);
};

export const playOnceReverse = tape => {
  if (tape.mode !== `R`) tape.mode = `R`;
  tape.player.stop();
  if (!tape.player.reverse) {
    tape.player.reverse = true;
    reverse(tape);
  }
  tape.player.start(undefined, tape.player.loopStart, getDuration(tape));
};

export const playLoopReverse = tape => {
  if (tape.mode !== `Q`) tape.mode = `Q`;
  if (!tape.player.reverse) {
    tape.player.reverse = true;
    reverse(tape);
  }
  tape.player.start(undefined, tape.player.loopStart);
};

export const stop = tape => {
  if (tape.mode !== `.`) tape.mode = `.`;
  tape.player.stop();
};
