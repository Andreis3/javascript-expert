// para importar do diretório use o comando abaixo
// node --experimental-specifier-resolution=node index.mjs

//import FluentSQLBuilder from './../fluentsql-jest-tdd-yt';
import FluentSQLBuilder from "@andreis3/fluentsql";

import database from './database/data.json' assert { type: 'json'};

const result = FluentSQLBuilder.for(database)
    .where({ registered: /^(2020|2019)/ })
    .select(['name', 'category'])
    .limit(3)
    // .groupCount('category')
    .countBy('category')
    .build();

console.log({ result });