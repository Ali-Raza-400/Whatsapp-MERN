let userinfo = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);

    // User joins a chat room
    socket.on("joinRoom", ({ userId, recipientId }) => {
      console.log("recipientId,",recipientId,userId);
      const roomId = [userId, recipientId].sort().join("-"); // Ensure consistent room ID
      socket.join(roomId); // Add the user to the room
      userinfo[userId] = socket.id; // Track socket ID of the user
      // console.log(`User ${userId} joined room ${roomId}`);
      // console.log("Current connected users:", userinfo);
    });

    // Handle sending messages
    socket.on("sendMessage", ({ roomId, message, userId }) => {
      console.log(`Message from ${userId} to room ${roomId}:`, message);
      socket.to(roomId).emit("message", { message, senderId: userId }); // Send the message to others in the room
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      const disconnectedUser = Object.keys(userinfo).find(
        (key) => userinfo[key] === socket.id
      );
      if (disconnectedUser) {
        delete userinfo[disconnectedUser];
        console.log(`User ${disconnectedUser} disconnected, socket ${socket.id}`);
      } else {
        console.log(`Socket ${socket.id} disconnected`);
      }
    });
  });
};
