for await (const line of console) {
  console.log(
    line
      .trim()
      .split(" ")
      .filter((s) => s !== "")
      .reverse()
      .join(" ")
  );
}
