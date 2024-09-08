// const user = require('./models/user');
// const notification = require('./models/notification');
let userinfo = {};

module.exports = function (io) {
  // io.on("connection", (socket) => {
  //   console.log(`Socket ${socket.id} connected`);
  //   console.log("socket.id:::",socket.id);
  //   socket.on("joinRoom", (userData) => {
  //       console.log("userData:::",userData);
  //       userinfo[userData.userId] =  socket.id;
  //       console.log("userinfo:::",userinfo);
  //   });

  //   socket.on("sendMessage", (message) => {
  //       console.log("message:::",message);
  //       io.to(userinfo[message.userId]).emit("message", message);
  //       // io.to(userinfo[message.userId]).emit("message", message);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log(`Socket ${socket.id} disconnected`);
  //   });
  // });
  io.on("connection", (socket) => {
    // Join the room when two users initiate a chat
    socket.on("joinRoom", ({ userId, recipientId }) => {
      const roomId = [userId, recipientId].sort().join("-"); // Create a unique room ID
      socket.join(roomId); // Add the user to the room
      console.log(`User ${userId} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("message", message); // Send the message to the room
    });

    // Optionally handle disconnects and reconnections
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
