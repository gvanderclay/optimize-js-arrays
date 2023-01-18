import * as falso from "@ngneat/falso";

const maxDataLength = 1000000;

const reduce = (listA, listB, aProperty, bProperty) => {
  const listAMapById = listA.reduce((acc, a) => {
    return Object.assign(acc, { [a[aProperty]]: a });
  }, {});
  return listB.map((b) => ({
    b: b,
    a: listAMapById[b[bProperty]],
  }));
};

const lodashReduce = (listA, listB, aProperty, bProperty) => {
  const listAMapById = _.reduce(
    listA,
    (acc, a) => {
      return Object.assign(acc, { [a[aProperty]]: a });
    },
    {}
  );
  return listB.map((b) => ({
    b: b,
    a: listAMapById[b[bProperty]],
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
  reduce(exercises, exerciseInstances);
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
