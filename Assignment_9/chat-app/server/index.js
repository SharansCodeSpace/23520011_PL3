// index.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Frontend URL
        methods: ["GET", "POST"],
    },
});

// Socket.io connection event
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a chat room
    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with id:${socket.id} joined room:${room}`);
    });

    // Send message event
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data); // Send message to room
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001");
});
