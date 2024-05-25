/*
debouning - technique to delay a function call in specified time.

suppose we are calling a function multiple times, 
and we want that every 1 second it calls only one time.

example user is typing in input box to search a product.
on each key stoke we are calling our backend api to fetch
product by the text user typed.

if user typed `mobile` - we invoked our api calling function below times

func('m');
func('mo')
func('mob')
func('mobi')
func('mobil')
func('mobile')

we want to delay calling our api if user typed nothing in last 1 second
ignore any calls before 1 second.

*/

function debounce(func, milliseconds) {
  let timer = null;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, milliseconds, ...params);
  };
}

function changeFunc() {
  console.log("changing");
}

const bouncedChange = debounce(changeFunc, 3000);

const delay = (milliseconds) =>
  new Promise((success, fail) => setTimeout(success, milliseconds));

/*
Program will output 'changing' 2 times but 
if I change delay to less than 3000, output
will be 'changing' only 1 time.
*/
(async () => {
  for (let i = 0; i < 1000; ++i) {
    bouncedChange();
  }
  await delay(3000);
  for (let i = 0; i < 1000; ++i) {
    bouncedChange();
  }
})();
