import { loadInput, readLines } from "../../src/utils.js";

export async function run(date, writer) {
  const [testErr, testInput] = await loadInput(date, "test-input-1");
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

function parseInstructions(input) {
  const chunks = input.split("\n\n");
  const [orderLines, printerLines] = chunks.map((c) => c.split("\n"));
  const orders = orderLines.map((l) => l.trim().split("|").map(Number));
  const printer = printerLines
    .filter(Boolean)
    .map((l) => l.trim().split(",").filter(Boolean).map(Number));
  return [orders, printer];
}

function processInput(input) {
  const rules = new Map();
  const [orders, printer] = parseInstructions(input);

  orders.forEach(([before, after]) => {
    if (rules.has(before)) {
      rules.get(before).add(after);
    } else {
      rules.set(before, new Set([after]));
    }
  });

  const validLines = printer.filter((line) => {
    const isValid = line.every((num, index, arr) => {
      if (!rules.has(num)) {
        return true;
      }
      const rule = rules.get(num);
      const lookBehind = arr.slice(0, index);

      return lookBehind.every((n) => !rule.has(n));
    });

    if (isValid) {
      return true;
    }
    return false;
  });
  // console.assert(validLines.length === 3, "%o", {
  //   lines: validLines.length,
  //   error: "Wrong number of valid lines",
  // });
  const result = validLines.reduce((memo, line) => {
    const middle = Math.floor(line.length / 2);
    return memo + line[middle];
  }, 0);
  return result;
}

function processInput2(input) {
  const rules = new Map();
  const [orders, printer] = parseInstructions(input);

  orders.forEach(([before, after]) => {
    if (rules.has(before)) {
      rules.get(before).add(after);
    } else {
      rules.set(before, new Set([after]));
    }
  });

  const validLines = [];
  printer.forEach((line) => {
    const isValid = line.every((num, index, arr) => {
      if (!rules.has(num)) {
        return true;
      }
      const rule = rules.get(num);
      const lookBehind = arr.slice(0, index);

      return lookBehind.every((n) => !rule.has(n));
    });

    if (!isValid) {
      const sorted = [];
      const unsorted = [];

      line.forEach((num, index) => {
        const rule = rules.get(num);
        if (rule) {
          const validAfters = Array.from(rule).filter((n) => line.includes(n));
          const insertAt = Math.max(0, line.length - validAfters.length - 1);
          sorted[insertAt] = num;
        } else {
          unsorted.push(num);
        }
      });
      const result = sorted.concat(unsorted);
      validLines.push(result);
    }
  });
  const result = validLines.reduce((memo, line) => {
    const middle = Math.floor(line.length / 2);
    return memo + line[middle];
  }, 0);
  return result;
}
