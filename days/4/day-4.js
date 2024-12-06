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

function processInput(input) {
  let result = 0;
  const minLength = 4;
  const lines = input
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  const lexer = new Lexer(lines);
  lexer.walk();

  return lexer.count;
}

function processInput2(input) {
  let result = 0;
  const minLength = 4;
  const lines = input
    .trim()
    .split("\n")
    .map((l) => l.split(""));

  const lexer = new Lexer(lines, "A", 1, "MAS");
  lexer.walk();

  return lexer.count;
}

class Lexer {
  x = 0;
  y = 0;
  count = 0;

  constructor(input, key = "X", spread = 4, match = "XMAS") {
    this.input = input;
    this.key = key;
    this.spread = spread;
    this.match = match;
  }

  walk() {
    while (true) {
      const line = this.input[this.y];
      if (!line) break;
      const char = line[this.x];
      if (char === this.key) {
        const count = this.peek();
        this.count = this.count + count;
      }
      this.advance();
    }
  }

  advance() {
    // Check if at end, otherwise go down a line
    const currentLine = this.input[this.y];
    const nextX = this.x + 1;

    if (nextX === currentLine.length) {
      this.y = this.y + 1;
      this.x = 0;
    } else {
      this.x = nextX;
    }
  }

  peek() {
    const horizontal = this.input[this.y];
    const vertical = this.input.map((p, i) => p[this.x]);
    // This is past midnight, don't judge me!
    if (this.match === "XMAS") {
      const slices = [];
      const up = vertical.slice(Math.max(0, this.y - 3), this.y + 1).reverse();
      const down = vertical.slice(this.y, this.y + 4);
      const forward = horizontal.slice(this.x, this.x + 4);
      const backward = horizontal
        .slice(Math.max(0, this.x - 3), this.x + 1)
        .reverse();
      slices.push(forward);
      slices.push(backward);
      slices.push(up);
      slices.push(down);
      slices.push(this.drawDiagonal([1, 1]));
      slices.push(this.drawDiagonal([1, -1]));
      slices.push(this.drawDiagonal([-1, 1]));
      slices.push(this.drawDiagonal([-1, -1]));

      return slices.map((m) => m.join("")).filter((m) => m === this.match)
        .length;
    }

    const x1 = [this.checkX([-1, -1]), this.checkX([1, 1])].sort().join("");
    const x2 = [this.checkX([-1, 1]), this.checkX([1, -1])].sort().join("");
    return x1 === "MS" && x2 === "MS" ? 1 : 0;
  }

  checkX([run, rise]) {
    let result = "";
    const y = rise < 0 ? this.y - 1 : this.y + 1;
    const x = run < 0 ? this.x - 1 : this.x + 1;
    const line = this.input[y];

    if (line && line[x]) {
      return line[x];
    }
    return result;
  }

  drawDiagonal([run, rise]) {
    const result = [];

    for (let i = 0; i < this.spread; i++) {
      const y = rise < 0 ? this.y - i : this.y + i;
      const x = run < 0 ? this.x - i : this.x + i;
      const line = this.input[y];

      if (line && line[x]) {
        result.push(line[x]);
      }
    }

    return result;
  }
}
