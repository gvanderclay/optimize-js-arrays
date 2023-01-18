import * as falso from "@ngneat/falso";

const maxDataLength = 1000000;

const mapAndFind = (listA, listB, aProperty, bProperty) => {
  return listB.map((b) => ({
    b: b,
    a: listA.find((a) => a[aProperty] === b[bProperty]),
  }));
};

console.log("|Time(ms)|Elements in array|");
console.log("|--------|-----------------|");

for (
  let dataLength = 1;
  dataLength <= maxDataLength;
  dataLength = dataLength * 10
) {
  const exercises = [...Array(dataLength)] // Create a dummy array dataLength elements long
    .map(() => ({
      id: falso.randUuid(),
      name: falso.randCatchPhrase(),
    }));

  const exerciseInstances = exercises.map((x) => ({
    id: falso.randUuid(),
    exerciseId: x.id,
  }));

  const now = performance.now();
  const result = mapAndFind(exercises, exerciseInstances, "id", "exerciseId");
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
