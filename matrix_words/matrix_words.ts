type Coord = {
  row: number;
  col: number;
};

const matrix: string[][] = [];

for await (const line of console) {
  matrix.push(line.trim().split(""));
}

const searchTerm = matrix.pop() ?? [];

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
      if (cell === searchTerm[0]) {
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

const result = search(matrix, searchTerm);

console.log(result ? "Found!" : "Not Found!");
