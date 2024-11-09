const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const landingRoute = require("./routes/landing");
const roomRoutes = require("./routes/room");
const { Server } = require("socket.io");
const http = require("http");
const httpServerForSocket = http.createServer();
const socket = new Server(httpServerForSocket, {
  cors: {
    origin: "*",
  },
});
socket.on("connection", (conn) => {
  conn.on("join-room", (roomId) => {
    conn.join(roomId);
  });
  conn.on("message", (data) => {
    socket.to(data.room).emit("get-message", data.value);
  });
});

httpServerForSocket.listen(5000);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static("views"));
app.use(express.json());

app.use(roomRoutes);
app.get(landingRoute);

fs.readFile(".env", (err, data) => {
  connectionString = data.toString().split("=")[1];
  mongoose.connect(connectionString).then((res) => {
    app.listen(8080);
  });
});
