import os from 'os';
import cluster from 'cluster';
import {initServer} from "./server.js";

(() => {
    // se não for o processo main o orquestrador
    // ele pode criar novas  cópias
    if (!cluster.isPrimary) {
        initServer();
        return;
    }


    const cpusNumber = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    console.log(`Forking for ${cpusNumber} CPUs\n`);

    for (let i = 0; i < cpusNumber; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log('Starting a new worker');
            cluster.fork();
        }

    });
})();