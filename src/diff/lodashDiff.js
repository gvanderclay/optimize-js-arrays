import _ from "lodash";

const maxDataLength = 1000000;

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

const listMap = new Map();

const makeTwoListsOfLength = (length) => {
  // doing this so each run has the same data
  if (listMap.has(length)) {
    return listMap.get(length);
  }
  const a = [];
  const b = [];
  for (let i = 0; i < length; i++) {
    a.push(i);
    b.push(i);
  }
  for (let i = 0; i < length; i++) {
    a.push(i + length);
    b.push(i + length * 2);
  }
  const result = {
    a,
    b,
  };
  listMap.set(length, result);
  return result;
};

for (
  let dataLength = 1;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const { a, b } = makeTwoListsOfLength(dataLength);
  let now = performance.now();
  const lodashADiffB = _.difference(a, b);
  const lodashBDiffA = _.difference(b, a);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}

console.log("\n|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 1;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const { a, b } = makeTwoListsOfLength(dataLength);
  const objectListA = a.map((x) => ({ id: x }));
  const objectListB = b.map((x) => ({ id: x }));
  let now = performance.now();
  const lodashADiffB = _.differenceBy(objectListA, objectListB, "id");
  const lodashBDiffA = _.difference(objectListB, objectListA, "id");
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
