// 📄 File: index.js
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("🔗 New user connected");

  socket.on("user-message", (message) => {
    io.emit("message", message); // broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// Route to main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// 🚀 Server running at http://localhost:9000