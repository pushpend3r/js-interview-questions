function createMemoisedFunc(func) {
  const cacheMap = new Map();
  return (...params) => {
    if (params.length === 0) {
      throw new Error("Parameters must be passed");
    }

    const key = params.map((item) => item.toString()).join("_");
    let result = null;

    if (cacheMap.has(key)) {
      console.log(`\nFound in \`${func.name}\` cache for key ${key}\n`);
      result = cacheMap.get(key);
    } else {
      console.log("\nCalculating\n");
      result = func(...params);
      cacheMap.set(key, result);
    }

    return result;
  };
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const memoiseAdd = createMemoisedFunc(add);
const memoiseSub = createMemoisedFunc(sub);

console.log(memoiseAdd(1, 2));
console.log(memoiseAdd(1, 2));

console.log(memoiseSub(3, 1));
console.log(memoiseSub(3, 1));
console.log(memoiseSub(2, 1));
