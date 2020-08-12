const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const connectDB = require("./config/db");

//connect to mongoDB
connectDB();

//middleware
app.use(express.json({ extended: false }));

//set up routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/follow", require("./routes/follow"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
