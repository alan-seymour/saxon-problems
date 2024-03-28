for await (const line of console) {
  console.log(line.trim().split(" ").filter(Boolean).reverse().join(" "));
}
