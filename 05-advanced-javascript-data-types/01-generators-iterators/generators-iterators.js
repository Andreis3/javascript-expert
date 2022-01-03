const assert = require("assert");

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
}

const generator = main();

// console.log(generator.next());
// { value: 'Hello', done: false } se o done = true, terminou a execução lista inteira retornada
// console.log(generator.next());
// { value: undefined, done: true }

function* main2() {
  yield "Hello";
  yield "_";
  yield "World";
  yield* calculation(2, 3); // yield* é um operador que permite a execução de um generator dentro de outro generator
}

const generator2 = main2();
// console.log(generator2.next()); // { value: 'Hello', done: false }
// console.log(generator2.next()); // { value: '_', done: false }
// console.log(generator2.next()); // { value: 'World', done: false }
// console.log(generator2.next()); // { value: 6, done: false }
// console.log(generator2.next()); // { value: undefined, done: true }

assert.deepStrictEqual(generator2.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator2.next(), { value: "_", done: false });
assert.deepStrictEqual(generator2.next(), { value: "World", done: false });
assert.deepStrictEqual(generator2.next(), { value: 6, done: false });
assert.deepStrictEqual(generator2.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main2()), ["Hello", "_", "World", 6]);
assert.deepStrictEqual([...main2()], ["Hello", "_", "World", 6]);

// ------- async iterators

const { readFile, stat, readdir } = require("fs/promises");
function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey Dude");
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };
  const { size } = await stat(__filename);
  yield { size };
  const dir = await readdir(__dirname);
  yield { dir };
}

// Promise.all([...promisified()]).then((results) =>
//   console.log("promisified", results)
// );

// (async () => {
//   for await (const item of promisified()) {
//     console.log("promisified", item.toString());
//   }
// })();

(async () => {
  for await (const item of systemInfo()) {
    console.log("systemInfo", item);
  }
})();
