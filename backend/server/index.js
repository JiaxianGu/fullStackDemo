const {setupServer} = require("./server.js");

const server = setupServer();
const PORT = 8080;

server.listen(PORT, () => {
    console.log("Server listening on Port: ", PORT);
});