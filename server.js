const http = require('node:http');

const server = http.createServer((request, reply) => {
    if (request.url === '/users' && request.method === 'GET') {
    reply.write('Hello World!');

}
    reply.end(); // End the response
});

server.listen(8080).on('listening', () => {
    console.log('HTTP is running');
});