// code away!
const server = require("./server.js")

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
    console.log(`**Server listening on port ${PORT}***`);
});
