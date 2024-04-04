const app = require("./server");

// importing connections from the db
const { connectingDb, disconnectDb } = require("./models/connection");

// running the server on the specified port
const server = app.listen(process.env.PORT, async () => {
  // connecting to the db
  await connectingDb();
  console.log(`Server listening on ${process.env.PORT}`);
});

// this will trigger whenever the server is closed
server.on("close", async () => {
  console.log("Disconnecting....");
  // when the server is closed, so is the db connection
  await disconnectDb();
});
