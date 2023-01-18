import _ from "lodash";
const maxDataLength = 1000000;

const filterIndexOfDedupe = (list) => {
  list.filter((item, pos) => {
    return list.indexOf(item) === pos;
  });
};

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 10;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const listA = [...Array(dataLength).keys()].map(
    () => Math.floor(Math.random() * (dataLength / 1.5)) + 1
  );

  let now = performance.now();
  filterIndexOfDedupe(listA);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
