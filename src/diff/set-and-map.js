function setDifference(arr1, arr2) {
  const arr2Set = new Set(arr2);
  return arr1.filter((x) => !arr2Set.has(x));
}

function mapDifference(arr1, arr2, extractKey) {
  const arr2Set = new Map(arr2.map((x) => [extractKey(x), x]));
  return arr1.filter((x) => !arr2Set.has(extractKey(x)));
}
const maxDataLength = 1000000;

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

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 1;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const { a, b } = makeTwoListsOfLength(dataLength);
  let now = performance.now();
  const setADiffB = setDifference(a, b);
  const setBDiffA = setDifference(b, a);
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
  const setADiffB = mapDifference(objectListA, objectListB, (x) => x.id);
  const setBDiffA = mapDifference(objectListB, objectListA, (x) => x.id);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
