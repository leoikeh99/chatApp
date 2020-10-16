const jwt = require("jsonwebtoken");
const config = require("config");
const Message = require("./models/Message");
const Unread = require("./models/Unread");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

module.exports = (io) => {
  var clients = [];

  io.on("connection", (socket) => {
    console.log("New user connected...");
    socket.on("storeClientInfo", (data) => {
      var customId = data.customId;
      var clientId = socket.id;

      var check = false;
      clients.forEach((client) => {
        client.customId === data.customId ? (check = true) : null;
      });

      if (check) {
        clients.forEach((client) => {
          client.customId === data.customId
            ? (client.clientId = socket.id)
            : null;
        });
      } else {
        clients.push({ customId, clientId });
      }

      console.log(clients);
    });

    socket.on("sendMessage", async (data) => {
      const decode = jwt.verify(data.token, config.get("jwtSecret"));
      const sender = decode.user.id;
      const reciever = data.reciever;

      if (sender) {
        const message = {
          sender,
          msg: data.msg,
          reciever,
          id: uuidv4(),
          senderName: data.senderName,
          recieverName: data.recieverName,
          senderAv: data.senderAv,
          recieverAv: data.recieverAv,
        };
        const socketId = getId(clients, reciever);
        const saveMessage = new Message({
          sender,
          reciever,
          msg: data.msg,
          senderName: data.senderName,
          recieverName: data.recieverName,
          senderAv: data.senderAv,
          recieverAv: data.recieverAv,
          createdAt: moment(),
        });
        await saveMessage.save();
        const check = await Unread.findOne({ sender, reciever });
        if (!check) {
          const unread = new Unread({
            sender,
            reciever,
            amount: 1,
          });
          await unread.save();
        } else {
          const id = check._id;
          const amount = check.amount + 1;
          const update = { amount };
          await Unread.findByIdAndUpdate(id, { $set: update }, { new: true });
        }
        socket.broadcast.to(socketId).emit("recieveMessage", message);
      }
    });

    socket.on("typing", (data) => {
      const decode = jwt.verify(data.token, config.get("jwtSecret"));
      const sender = decode.user.id;
      const reciever = data.reciever;
      if (sender) {
        const socketId = getId(clients, reciever);
        socket.broadcast.to(socketId).emit("typing", { sender, reciever });
      }
    });

    socket.on("notTyping", (data) => {
      const decode = jwt.verify(data.token, config.get("jwtSecret"));
      const sender = decode.user.id;
      const reciever = data.reciever;
      if (sender) {
        const socketId = getId(clients, reciever);
        socket.broadcast.to(socketId).emit("notTyping", { sender, reciever });
      }
    });

    socket.on("disconnect", (data) => {
      for (var i = 0, len = clients.length; i < len; ++i) {
        var c = clients[i];

        if (c.clientId == socket.id) {
          clients.splice(i, 1);
          break;
        }
      }
    });
  });
};

const getId = (clients, id) => {
  var clientID;
  clients.forEach((client) => {
    client.customId === id ? (clientID = client.clientId) : null;
  });
  return clientID;
};
