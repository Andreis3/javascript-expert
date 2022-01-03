const assert = require("assert");

// ---- keys
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol Objects";

// console.log("getting value for normal Objects:", user.userName);

// //sempre único em nível de endereço de memoria
// console.log("getting value for Symbol Objects:", user[Symbol("userName")]);
// console.log("getting value for Symbol Objects:", user[uniqueKey]);

assert.deepEqual(user.userName, "value for normal Objects");

//sempre único em nível de endereço de memoria
assert.deepEqual(user[Symbol("userName")], undefined);
assert.deepEqual(user[uniqueKey], "value for Symbol Objects");

// é difícil de pegar, mas não é secreto!
// console.log("symbol:", Object.getOwnPropertySymbols(user)[0]);
assert.deepEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for("password")] = "123456";
assert.deepEqual(user[Symbol.for("password")], "123456");
// --- keys

// well known symbols
const obj = {
  // iterators

  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo e retorna o valor
        value: this.items.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log("item", item);
// }

assert.deepEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );
    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}

const myDate = new MyDate([2020, 03, 01], [2018, 02, 02]);

const expectedDates = [new Date(2020, 03, 01), new Date(2018, 02, 02)];

// console.log("myDate", myDate);

assert.deepEqual(Object.prototype.toString.call(myDate), "[object WHAT?]");
assert.throws(() => myDate + 1, TypeError);

// coerção explicita para chamar o toPrimitive
// console.log("String(myDate)", String(myDate));
assert.deepEqual(String(myDate), "01 de abril de 2020 e 02 de março de 2018");

// implementar o iterator!
assert.deepEqual([...myDate], expectedDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log("item", item);
//   }
// })();

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepEqual(dates, expectedDates);
})();
