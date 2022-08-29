const http = require('http');

const DEFAULT_USER = { username: 'admin', password: 'admin' };

const routes = {
    '/contact:get': (req, res) => {
        res.write('contact us page');
        res.end();
    },

    '/login:post': async (req, res) => {
        // response é um iterator!
        for await (const data of req) {
            const user = JSON.parse(data);
            if (user.username != DEFAULT_USER.username || user.password != DEFAULT_USER.password) {
                res.writeHead(401);
                res.write('Logging failed');
                return res.end();
            }

            res.writeHead(200);
            res.write('Logging has succeeded');
            return res.end();
        }
    },

    default: (req, res) => {
        res.write('Hello world')
        return res.end();
    }
}

const handle = (req, res) => {
    const { url, method } = req;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return chosen(req, res);
}

const app = http.createServer(handle)
    .listen(3000, () =>
        console.log('Server running on port', 3000));

module.exports = app;