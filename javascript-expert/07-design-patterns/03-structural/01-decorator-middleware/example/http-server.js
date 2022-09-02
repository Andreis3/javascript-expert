InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from '../index.js';

// curl -i http://localhost:3000
function handRequest(request, response){
    // response.setHeader('X-Instrumented-By', 'Node.js');
    response.end('Hello World');
}

const server = http.createServer(handRequest);
const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});