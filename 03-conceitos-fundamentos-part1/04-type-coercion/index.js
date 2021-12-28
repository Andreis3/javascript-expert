9999999999999999 // 16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false
3 > 2 >= 1
// true

"B" + "a" + + "a" + "a"
// BaNaNa

'1' == 1 // true
'1' === 1 // false

// --------------

console.assert(String(123) === '123', "explicit conversion to string!");
console.assert(123 === '', "explicit conversion to string!");

console.assert(('hello' || 123) === 'hello', '|| returns the first elements!');
console.assert(('hello' && 123) === 123, '&& returns the first elements!');

// --------------

const item = {
  name: 'AndreiSantos',
  age: 25,
  // string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 1 se nao for primitivo, chama o toString
  valueOf() {
    return { hey: 'dude' }
    // return 007
  },
  // symbol.toPrimitive tem prioridade
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType);
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType] || types.string;
  }
}

// console.log('toString', String(item));
// // vai retornar NaN pois o toString retornou a string
// console.log('valueOf', Number(item));

//depois de adicionar o toPrimitive
// console.log('String', String(item));
// console.log('Number', Number(item));

// // chama a conversao defaultUser
// console.log('Date', new Date());

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0')
// console.log('!!item is true?', !!item)
console.assert(!!item)

// console.log('string.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"ErickWendel","age":25}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: "Zézin", age: 20}
// console.log('New Object', item2)
console.assert(item2.name === "Zézin" && item2.age === 20)