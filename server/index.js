import cors from "cors";
import express from "express";
import { createServer } from "http";
import { ALLOWED_ORIGIN } from "./utils/config.js";
import { Server } from "socket.io";
import { Game } from "./GameState/GameState.js";

const app = express();
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: ALLOWED_ORIGIN,
  serveClient: false,
});
const game = new Game(io);
game.registerClient();

app.get("/", (req, res) => {
  game.setPlayerPositionTest();
  res.status(200).json();
});

server.listen(3002, () => {
  console.log("Сервер запущен на порту 3002");
});
