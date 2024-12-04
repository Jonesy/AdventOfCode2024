import { loadInput } from "../../src/utils.js";

export async function run(date, writer) {
  const [testErr, testInput] = await loadInput(date, "test-input");
  const [inputErr, input] = await loadInput(date, "input-1");

  console.time("day1");
  const actual1 = processInput(testInput);
  const actual2 = processInput2(testInput);
  writer("test", "1", actual1);
  writer("test", "2", actual2);

  const answer1 = processInput(input);
  const answer2 = processInput2(input);
  writer("answer", "1", answer1);
  writer("answer", "2", answer2);
  console.timeEnd("day1");
}

function processInput(input) {
  const left = [];
  const right = [];
  input
    .trim()
    .split("\n")
    .map((l) => l.trim().split(" ").map(Number))
    .forEach((l) => {
      left.push(l[0]);
      right.push(l[1]);
    });

  left.sort();
  right.sort();

  const answer = right.reduce((memo, value, index) => {
    const leftNumber = left[index];
    if (value && leftNumber) {
      const diff = value > leftNumber ? value - leftNumber : leftNumber - value;
      return memo + Math.max(0, diff);
    }
    return memo;
  }, 0);
  return answer;
}

function processInput2(input) {
  const left = [];
  const right = [];
  input
    .trim()
    .split("\n")
    .map((l) => l.trim().split(" ").map(Number))
    .forEach((l) => {
      left.push(l[0]);
      right.push(l[1]);
    });
  const counts = new Map();

  left.forEach((l) => {
    const times = right.reduce((memo, value) => {
      if (l === value) {
        return memo + 1;
      }
      return memo;
    }, 0);
    counts.set(l, times);
  });

  const answer = left.reduce((memo, value) => {
    const times = counts.get(value);

    if (value >= 0 && times) {
      return memo + value * times;
    }

    return memo;
  }, 0);

  return answer;
}
