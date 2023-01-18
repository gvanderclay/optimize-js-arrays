import _ from "lodash";
import * as falso from "@ngneat/falso";

const maxDataLength = 1000000;

const merge = (listA, listB, aProperty, bProperty) => {
  return _.mergeWith(
    _.sortBy(listA, aProperty),
    _.sortBy(listB, bProperty),
    (a, b) => ({ a, b })
  );
};

const lodashReduce = (listA, listB, aProperty, bProperty) => {
  const listAMapById = _.reduce(
    listA,
    (acc, a) => {
      return _.assign(acc, { [a[aProperty]]: a });
    },
    {}
  );
  return _.map(listB, (b) => ({
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
  const value = merge(exercises, exerciseInstances, "id", "exerciseId");
  console.log(`|${performance.now() - now}|${dataLength}|`);
}

console.log("\n|Time(ms)|Elements in array|");
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
  const value = lodashReduce(exercises, exerciseInstances, "id", "exerciseId");
  console.log(`|${performance.now() - now}|${dataLength}|`);
}
