const http = require('http'); // Use require for CommonJS
const app = require('./app'); // No need for .js extension with CommonJS

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
