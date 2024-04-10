type Coord = {
  row: number;
  col: number;
};

type Test = {
  matrix: string[][];
  searchTerm: string[];
};

const lines: string[] = [];

for await (const line of console) {
  lines.unshift(line);
}

const testCaseCount = Number(lines.pop());

const tests: Test[] = [];

for (let i = 0; i < testCaseCount; i++) {
  const rows = Number(lines.pop()?.split(" ")[0]);
  const matrix: string[][] = [];

  for (let j = 0; j < rows; j++) {
    matrix.push((lines.pop() ?? "").split(""));
  }

  const searchTerm = (lines.pop() ?? "").split("");

  tests.push({ searchTerm, matrix });
}

const stringifyCoord = ({ row, col }: Coord) => `${row}:${col}`;

const findAdjacent = (
  { row, col }: Coord,
  rowSize: number,
  colSize: number,
  seen: string[]
) =>
  [
    { row, col: col + 1 },
    { row, col: col - 1 },
    { row: row + 1, col },
    { row: row - 1, col },
  ].filter(
    (coord) =>
      coord.row < rowSize &&
      coord.row >= 0 &&
      coord.col < colSize &&
      coord.col >= 0 &&
      !seen.includes(stringifyCoord(coord))
  );

const findStarts = (matrix: string[][], startLetter: string): Coord[] => {
  const starts: Coord[] = [];
  matrix.forEach((r, row) =>
    r.forEach((cell, col) => {
      if (cell === startLetter) {
        starts.push({ row, col });
      }
    })
  );

  return starts;
};

const recursiveTest = (
  matrix: string[][],
  searchTerm: string[],
  current: Coord,
  seen: string[]
): boolean => {
  if (searchTerm.length === 0) {
    return true;
  }

  return findAdjacent(current, matrix.length, matrix[0].length, seen)
    .filter(({ row, col }) => matrix[row][col] === searchTerm[0])
    .some((coord) =>
      recursiveTest(matrix, searchTerm.slice(1), coord, [
        ...seen,
        stringifyCoord(coord),
      ])
    );
};

const search = (matrix: string[][], searchTerm: string[]) =>
  findStarts(matrix, searchTerm[0]).some((start) =>
    recursiveTest(matrix, searchTerm.slice(1), start!, [stringifyCoord(start!)])
  );

tests.forEach(({ matrix, searchTerm }) => {
  const result = search(matrix, searchTerm);
  console.log(result ? "Found!" : "Not Found!");
});
