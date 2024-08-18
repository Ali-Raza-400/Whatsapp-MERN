// const user = require('./models/user');
// const notification = require('./models/notification');
let userinfo = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);
    console.log("socket.id:::",socket.id);
    socket.on("joinRoom", (userData) => {
        console.log("userData:::",userData);
        userinfo[userData.userId] =  socket.id;
        console.log("userinfo:::",userinfo);
    });
    
    
    socket.on("sendMessage", (message) => {
        console.log("message:::",message);
        io.to(userinfo[message.userId]).emit("message", message);
        // io.to(userinfo[message.userId]).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
};
