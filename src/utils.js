export async function loadInput(date, input) {
  let result, err;
  try {
    const path = `/days/${date}`;
    const request = await fetch(`${path}/${input}.txt`);
    const text = await request.text();
    result = text;
  } catch (err) {
    err = err;
  }

  return [err, result];
}

export function readLines(input, deliminter = " ") {
  return input
    .trim()
    .split("\n")
    .map((l) => l.trim().split(deliminter).map(Number));
}

export function isAscending(arr) {
  return arr.every((v, i, a) => {
    return i === 0 || v > a[i - 1];
  });
}

export function isDescending(arr) {
  return arr.every((v, i, a) => {
    return i === 0 || v < a[i - 1];
  });
}
