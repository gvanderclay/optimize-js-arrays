import _ from "lodash";

const maxDataLength = 1000000;

function filterIncludesOfDifference(a, b) {
  return a.filter((x) => {
    return !b.includes(x);
  });
}

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 1;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const a = [];
  const b = [];
  for (let i = 0; i < dataLength; i++) {
    a.push(i);
    b.push(i);
  }
  for (let i = 0; i < dataLength; i++) {
    a.push(i + dataLength);
    b.push(i + dataLength * 2);
  }
  let now = performance.now();
  const aDiffB = filterIncludesOfDifference(a, b);
  const bDiffA = filterIncludesOfDifference(b, a);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
