import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3005;

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message",(data)=>{
    console.log(data);
    io.emit("received-message",data);
  })
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Surver is running on port ${port}`);
});
