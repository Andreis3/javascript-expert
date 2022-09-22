import { Readable, Writable } from 'stream';

// fonte de dados
const readable = Readable({
    read() {
        this.push('a');
        this.push('b');
        this.push('c');

        // indica que não há mais dados
        this.push(null);
    }
})

// saida de dados
const writable = Writable({
    write(chunk, encoding, callback) {
        console.log('msg', chunk.toString());
        callback();
    }
})

readable
    //writable é sempre a saida -> imprimir, salvar, ignorar
    .pipe(writable)
    // .pipe(process.stdout);