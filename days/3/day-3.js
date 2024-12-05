import { loadInput, readLines } from "../../src/utils.js";

export async function run(date, writer) {
  const [testErr, testInput] = await loadInput(date, "test-input");
  const [test2Err, testInput2] = await loadInput(date, "test-input-2");
  const [inputErr, input] = await loadInput(date, "input-1");

  const actual1 = processInput(testInput);
  const answer1 = processInput(input);
  const actual2 = processInput2(testInput2);
  const answer2 = processInput2(input);

  writer("test", "1", actual1);
  writer("answer", "1", answer1);
  writer("test", "2", actual2);
  writer("answer", "2", answer2);
}

function processInput(input) {
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm);
  let result = 0;

  for (const match of matches) {
    const left = Number(match[1]);
    const right = Number(match[2]);
    const product = left * right;
    result = product + result;
  }

  return result;
}

function processInput2(input) {
  const matches = input.matchAll(
    /(?<dont>don\'t\(\))|(?<do>do\(\))|(?<mul>mul\((\d{1,3}),(\d{1,3})\))/gm
  );
  let result = 0;
  let on = true;

  for (const match of matches) {
    if (match.groups.dont) {
      on = false;
    } else if (match.groups.do) {
      on = true;
      continue;
    }

    if (on) {
      const left = Number(match[4]);
      const right = Number(match[5]);
      const product = left * right;
      result = product + result;
    }
  }

  return result;
}
