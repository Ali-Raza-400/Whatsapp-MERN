require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db.cont");
const allowedOrigins = require("./config/allowedOrigins.js");
const app = express();
const port = process.env.PORT || 3500;

connectDB();
app.use(express.json());

// Socketio must be declared before api routes
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  // transports: ["polling"],
  cors: { origin: "*" },
});

require("./socketio.js")(io);

mongoose.connection.once("open", () => {
  server.listen(port, () => {
    console.log("🔗 Successfully Connected to MongoDB");
    console.log(`✅ Application running on port: ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
