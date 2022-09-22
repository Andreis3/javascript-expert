import { Duplex, Transform } from 'stream';

let COUNT = 0;

const server = new Duplex({
    // faz não precisar trabalhar só com buffer, mas gasta mais memória
    objectMode: true,
    encoding: 'utf8',

    read() {
        const everySecond = (intervalContext) => {
            if(COUNT++ <= 5){
                this.push(`My name is Andrei[${COUNT}]\n`);
                return;
            }
            clearInterval(intervalContext);
            this.push(null);
        };
        setInterval(function (){ everySecond(this); });
    },

    // é como se fosse um objeto completamente diferente
    write(chunk, encoding, callback) {
        console.log(`[WRITABLE] saving`, chunk)
        callback();
    }
});

// provar que são canais de comunicação diferentes
// write aciona o write do duplex
server.write('[DUPLEX] hey this is a writable!\n');

// on data -> loga o que rolou no .push do  readable
server.on('data', msg => console.log(`[READABLE] ${msg}`));

// push deixa você enviar mais dados
server.push('[DUPLEX] hey this is also a readable!\n');


server.pipe(process.stdout);

const transformToUpperCase = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

// transfrom é tambem um duplex, mas não possuem comunicação independente
transformToUpperCase.write('[transform] hello from write!')

// o push vai ignorar o que voce tem na funcao transform
transformToUpperCase.push('[transform] hello from push!\n')

server
    .pipe(transformToUpperCase)
    // redireciona todos os dados de readable para writable da duplex
    .pipe(server);