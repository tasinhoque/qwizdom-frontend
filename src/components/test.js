function first() {
  return function () {
    return 'hello world';
  };
}

let fn = first;
let message = fn();
console.log(message());
