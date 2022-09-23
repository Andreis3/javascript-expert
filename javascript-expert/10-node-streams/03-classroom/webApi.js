import http from 'http';
import { Readable } from 'stream';

function apiOne(request, response) {
    // response.write('test-01\n');
    // response.write('test-02\n');
    // response.write('test-03\n');
    //
    // request.pipe(response);

    let count = 0;
    const maxItens = 99;
    const readable = new Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxItens) {
                    this.push(JSON.stringify(
                        {
                                id:  Date.now() + count,
                                name: `Andrei-${count}`
                            }
                        ) + '\n');
                    return;
                }
                clearInterval(intervalContext);
                this.push(null);
            };
            setInterval(function (){ everySecond(this) });
        }
    });
    readable.pipe(response);
}

function apiTwo(request, response) {
    let count = 0;
    const maxItens = 99;
    const readable = new Readable({
        read() {
            const everySecond = (intervalContext) => {
                if (count++ <= maxItens) {
                    this.push(JSON.stringify(
                        {
                            id:  Date.now() + count,
                            name: `Zezin-${count}`
                        }
                    ) + '\n');
                    return;
                }
                clearInterval(intervalContext);
                this.push(null);
            };
            setInterval(function (){ everySecond(this) });
        }
    });
    readable.pipe(response);
}


http.createServer(apiOne).listen(3000, () => console.log('Server is listening on port 3000'));
http.createServer(apiTwo).listen(4000, () => console.log('Server is listening on port 4000'));