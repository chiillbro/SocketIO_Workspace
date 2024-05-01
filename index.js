import express from "express";

import http from "http";

import { fileURLToPath } from "node:url";

import { dirname, join } from "node:path";

import { Server } from "socket.io";

const app = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use(
//   "/socket.io",
//   express.static(join(__dirname, "./node_modules/socket.io/client-dist"))
// );

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// io.on("connection", (socket) => {
//   console.log("User Connected to the server!");
//   // console.log(socket);

//   socket.emit("message", "Hello from the server!");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

io.on("connection", (socket) => {
  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Connection ${socket.id} has left the building`);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
