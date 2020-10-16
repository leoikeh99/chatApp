const express = require("express");
const app = express();
const connectDB = require("./config/db");
const sockets = require("./sockets");

//connect to mongoDB
connectDB();

//middleware
app.use(express.json({ extended: false }));

//set up routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/follow", require("./routes/follow"));
app.use("/api/unread", require("./routes/unread"));

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = require("socket.io")(server);
sockets(io);
