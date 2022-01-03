const assert = require("assert");
const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Andrei", { text: "two" })
  .set(true, () => "three");

// usando um constructor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// para pegar um propriedade usar get com o nome da key
// console.log("myMap", myMap.get(1));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Andrei"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "three");

// em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: "Andrei Santos" });

// console.log("get", myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), {
  name: "Andrei Santos",
});
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);

// utilitários
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implícita para boolean e retorna false
// o jeito certo em Object é ({ name: "Andrei" }).hasOwnProperty("name")

assert.ok(myMap.has(onlyReferenceWorks));

// remover um item do objetos
// delete item.id
// imperformático para o javascript

assert.ok(myMap.delete(onlyReferenceWorks));

// Não da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  '[[1,"one"],["Andrei",{"text":"two"}],[true,null]]'
);

assert.deepStrictEqual(
  JSON.stringify(Array.from(myMap)),
  '[[1,"one"],["Andrei",{"text":"two"}],[true,null]]'
);

// for (const [key, value] of myMap) {
//   console.log(key, value);
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString()  === 'Hey'

// qualquer chave pode colidir, com as propriedades heradas do objecto, como
// constructor, toString, valueOf e etc.

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Silva",
};

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// nao tem restricao de nome de chave
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

//  ---  WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beeem específicos

// tem a maioria dos beneficos do Map
// MAS: nao é iterável
//  Só chaves de referencia e que você já conheça
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: "Flash" };

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
