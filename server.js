// server.js
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

// Escucha en el puerto proporcionado por el entorno, o en el puerto 8080 si no se proporciona
const puerto = process.env.PORT || 8080;
server.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});

export { server, io };
