import { Readable, Writable, Transform } from 'stream';
import { createWriteStream } from 'fs';

// fonte de dados
const readable = Readable({
    read() {
        // for (let index = 0; index < 1e6; index++) {
        for (let index = 0; index < 10; index++) {
            const person = { id: Date.now() + index, name: `Andrei-${index}` };
            const data = JSON.stringify(person);
            this.push(data);
        }
        // informa quando os dados acabaram
        this.push(null);
    }
})

// processamento de dados

const mapFields = Transform({
    transform(chunk, encoding, callback) {
        const data = JSON.parse(chunk);
        const result = `${data.id},${data.name.toUpperCase()}\n`;
        callback(null, result);
    }

})

const mapHeaders = Transform({
    transform(chunk, encoding, callback) {
        this.counter = this.counter ?? 0;
        if(this.counter){
            return callback(null, chunk);
        }
        this.counter++;
        callback(null, 'id,name\n'.concat(chunk));
    }
})

// saida de dados
const writable = Writable({
    write(chunk, encoding, callback) {
        console.log('msg', chunk.toString());
        callback();
    }
})



const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    //writable é sempre a saida -> imprimir, salvar, ignorar
    // .pipe(writable)
    // .pipe(process.stdout);
    .pipe(createWriteStream('output.csv'));

pipeline.on('end', () => {
    console.log('done');
})