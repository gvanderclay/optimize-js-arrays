import _ from "lodash";
const maxDataLength = 1000000;

const setDedupe = (list) => {
  return [...new Set(list)];
};

const mapDedupe = (list, extractKey) => {
  return new Map(list.map((item) => [extractKey(item), item])).values();
};

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

const listMap = new Map();

const makeListOfLength = (length) => {
  // doing this so each run has the same data
  if (listMap.has(length)) {
    return listMap.get(length);
  }
  const list = [...Array(length).keys()].map(
    () => Math.floor(Math.random() * (length / 1.5)) + 1
  );
  listMap.set(length, list);
  return list;
};

for (
  let dataLength = 10;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const listA = makeListOfLength(dataLength);

  let now = performance.now();
  const unique = setDedupe(listA);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}

console.log("\n|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 10;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const listA = makeListOfLength(dataLength);
  const objectList = listA.map((x) => ({ id: x }));
  let now = performance.now();
  const unique = mapDedupe(objectList, (x) => x.id);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
