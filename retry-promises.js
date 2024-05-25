async function retry(promiseExecutorFunc, retryCount = 1) {
  while (retryCount > 0) {
    try {
      return await new Promise(promiseExecutorFunc);
    } catch (error) {
      console.error(error);
      retryCount--;
    }
  }
  throw new Error(`Retry count has reached it's limit`);
}

const randomExecutorFunc = (success, fail) => {
  const value = Math.random();
  if (value > 0.5) {
    success("success");
  } else {
    fail("fail");
  }
};

(async () => {
  for (let i = 0; i < 10; ++i) {
    console.log("\n-------------Start---------------\n");
    try {
      const result = await retry(randomExecutorFunc, 3);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    console.log("\n-------------End---------------\n");
  }
})();
