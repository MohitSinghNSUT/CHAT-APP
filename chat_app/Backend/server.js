const express = require("express");
const app = express();
const dotenv = require("dotenv");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const Server = socketio.Server;
const server = http.createServer(app);
const { addUser, removeUser, getUser, getUserInRoom } = require("./users.js");
dotenv.config();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["https://mohitnsutchatapp.netlify.app/","https://stunning-fox-638eea.netlify.app","https://chat-app-1-p7pk.onrender.com"], // Make sure this matches the frontend's URL
  methods: ["GET", "POST"],
  credentials: true,
};

// Apply CORS to both Express and Socket.IO
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("listen", socket.id);

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room, "emit join", socket.id);

    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback({ error: error });

    console.log(user);

    socket.join(user.room); // Ensure the socket joins the room
    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to group ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room`,
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser({ id: socket.id }); // Ensure you get the user from the list
    console.log(user, "from send message", socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    } else {
      callback("User not found");
    }
  });
  socket.on("userInRoom", ({room}) => {
    console.log("my room is ", room);
    const users = getUserInRoom(room);
    console.log("getting users", users, room);
    io.to(room).emit("allUsers", users);
  });
  socket.on("input-change", ({ name, room }, callback) => {
    console.log(name, room, "input change");
    socket.broadcast.to(room).emit("other-input-change", name);
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser({ id: socket.id });
    console.log(socket.id, user);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room`,
      });
      const users = getUserInRoom(user.room);
    io.to(user.room).emit("allUsers", users);
    }
    console.log("user disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/chat", (req, res) => {
  res.send("sending response");
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  res.send("chat me");
});

server.listen(PORT, () => {
  console.log("server started on port", PORT);
});
