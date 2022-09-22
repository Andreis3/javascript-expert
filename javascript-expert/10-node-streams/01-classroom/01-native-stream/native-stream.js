// ls | grep package | xargs cat | jq .name

// process.stdin.pipe(process.stdout)
//     .on('data', msg => console.log('data', msg.toString()))
//     .on('error', msg => console.log('error', msg.toString()))
//     .on('end', _ => console.log('end'))
//     .on('close', msg => console.log('close', msg.toString()))


// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//terminal 2
// node -e "process.stdin.pipe(require('net').connect(13380))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
import { createReadStream, readFileSync } from 'fs';

http.createServer((req, res) => {
    // má pratica
    // const file = readFileSync('big.file');
    // res.write(file);
    // res.end();

    // boa pratica
    createReadStream('big.file')
        .pipe(res);

}).listen(3000, () => console.log('server started port 3000'));

// curl http://localhost:3000 -o output.txt