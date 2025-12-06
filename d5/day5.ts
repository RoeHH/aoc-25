import IntervalTree from "npm:@flatten-js/interval-tree";

let input;
try {
  input = await Deno.readTextFile("d5/day5.input");
} catch (_error) {
  console.log("Cant read input will use test input");
  input = `3-5
10-14
16-20
12-18.1
5
8
11
17
32`;
}

const parseInput = (input: string) => {
  const [ranges, numbers] = input.split(".");
  return {
    ranges: ranges.split("\n").map((range) => range.split("-").map(Number)),
    numbers: numbers.split("\n").map(Number),
  };
};

const { ranges, numbers } = parseInput(input);

const buildIntervalTree = () => {
  const tree = new IntervalTree<string>();
  ranges.forEach((range, i) => {
    tree.insert([range[0], range[1]], "range" + i);
  });
  return tree;
};

Deno.bench("Build mystery data structure for part 1", () => {
  buildIntervalTree();
});

const part1 = () => {
  const tree = buildIntervalTree();

  let result = 0;
  for (const number of numbers) {
    result += tree.intersect_any([number, number]) ? 1 : 0;
  }
  return result;
};
console.log(`Result part1: ${part1()}`);

Deno.bench("Day 5 part 1 (Includes building data structure)", () => {
  part1();
});

const part2 = () => {
  const rangesSorted = ranges.sort((a, b) => a[0] - b[0]);

  let result = 0;
  let [start, end] = rangesSorted[0];

  for (const [keyStart, keyEnd] of rangesSorted) {
    if (end < keyStart) {
      result += end - start + 1;
      [start, end] = [keyStart, keyEnd];
    } else {
      end = keyEnd > end ? keyEnd : end;
    }
  }

  if (
    start !== rangesSorted[rangesSorted.length - 1][0] ||
    end === rangesSorted[rangesSorted.length - 1][1] &&
      start === rangesSorted[rangesSorted.length - 1][0]
  ) {
    result += end - start + 1;
  }

  return result;
};
console.log(`Result part2: ${part2()}`);

Deno.bench("Day 5 part 2", () => {
  part2();
});

/*
| benchmark                                         | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Build mystery data structure for part 1           |         70.8 µs |        14,120 | ( 58.8 µs … 850.4 µs) |  66.1 µs | 141.7 µs | 185.0 µs |
| Day 5 part 1 (Includes building data structure)   |        231.2 µs |         4,325 | (200.9 µs … 672.0 µs) | 231.7 µs | 350.6 µs | 637.5 µs |
| Day 5 part 2                                      |          3.8 µs |       261,300 | (  3.7 µs …   4.1 µs) |   3.9 µs |   4.1 µs |   4.1 µs |
*/
