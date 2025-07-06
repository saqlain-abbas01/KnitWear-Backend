import { Server } from "socket.io";
import http from "http";
import express from "express";

const server = express();
const nodeServer = http.createServer(server);

const io = new Server(nodeServer, {
  cors: {
    origin: [
      "https://knit-wear.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  },
});

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("User ID:", userId);
  if (userId) userSocketMap[userId] = socket.id;
  console.log("User Socket Map:", userSocketMap);
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, nodeServer, server };
