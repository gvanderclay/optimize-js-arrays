import * as falso from "@ngneat/falso";

const maxDataLength = 1000000;

const mapAndGet = (listA, listB, aProperty, bProperty) => {
  const listAMapByProperty = new Map(listA.map((a) => [a[aProperty], a]));
  return listB.map((b) => ({
    b,
    a: listAMapByProperty.get(b[bProperty]),
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
  const result = mapAndGet(exercises, exerciseInstances, "id", "exerciseId");
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
