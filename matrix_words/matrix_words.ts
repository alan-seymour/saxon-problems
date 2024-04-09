const matrix: string[] = [];

for await (const line of console) {
  matrix.push(line.trim());
}

const searchTerm = matrix.pop() ?? "";

const verticals = matrix[0]
  .split("")
  .map((_, i) => matrix.map((row) => row[i]).join(""));

const searchSpace = [...matrix, ...verticals];

console.log(
  searchSpace.some((line) => line.includes(searchTerm)) ? "Found" : "Not found"
);
