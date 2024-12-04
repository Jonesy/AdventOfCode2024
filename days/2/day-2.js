import {
  isAscending,
  isDescending,
  loadInput,
  readLines,
} from "../../src/utils.js";

export async function run(date, writer) {
  const [testErr, testInput] = await loadInput(date, "test-input");
  const [inputErr, input] = await loadInput(date, "input-1");

  const actual1 = processInput(testInput);
  const answer1 = processInput(input);
  const actual2 = processInput2(testInput);
  const answer2 = processInput2(input);

  writer("test", "1", actual1);
  writer("answer", "1", answer1);
  writer("test", "2", actual2);
  writer("answer", "2", answer2);
}

function processInput(input) {
  const lines = readLines(input);
  return lines.reduce((memo, value, index, arr) => {
    const isValid = value.every(lineParser);

    if (isValid) {
      memo += 1;
    }

    return memo;
  }, 0);
}

function lineParser(v, i, a) {
  const nextValue = a[i + 1];
  if (!nextValue) return true;
  if (isAscending(a)) {
    const diff = nextValue - v;
    return diff <= 3 && diff >= 1;
  } else if (isDescending(a)) {
    const diff = v - nextValue;
    return diff <= 3 && diff >= 1;
  } else {
    return false;
  }
}

function processInput2(input) {
  const lines = readLines(input);
  return lines.reduce((memo, value, index, arr) => {
    const isValid = value.every(lineParser);

    if (isValid) {
      memo += 1;
    } else {
      const dropOneValue = value.map((v, i, a) => {
        return a.reduce((m, x, y) => {
          if (i !== y) m.push(x);
          return m;
        }, []);
      });
      const canValidateIfOneDropped = dropOneValue.some((d) => {
        return d.every(lineParser);
      });
      if (canValidateIfOneDropped) {
        memo += 1;
      }
    }

    return memo;
  }, 0);
}
