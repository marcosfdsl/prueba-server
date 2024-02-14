import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import enrutador from './enrutador.js';

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('html'));
app.use(enrutador);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Usuario conectado!");

  socket.on("Mensaje de chat", (msg) => {
    io.emit("Mensaje de chat", msg);
    console.log("Mensaje de chat: " + msg);
  });

  socket.on("Desconectado!", () => {
    console.log("Usuario desconectado!");
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

export { server, io };
