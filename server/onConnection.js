import userHadler from "./handler.js"
const playerMap = new Map();
const tokenMap = new Map();
const MaxPlayers = 4;
import {Player} from "./GameState/models/playerState.js";
export default function onConnection(io, socket, dispatch) {
  if(playerMap.size >= MaxPlayers) {
    socket.disconnect();
    return;
  }
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
   
  
  const token = socket.handshake.auth.userKey;
  
  if (playerMap.get(token) !== undefined) {
    
    socket.emit("prevEnter", token, playerMap.get(token).teamName, playerMap.get(token).borderColor, playerMap.get(token).isReady, playerMap.get(token).position);
    dispatch("getPlayerNewSocket", {token:token, socketId:socket.id}) 
    userHadler(io, socket, playerMap, token, dispatch); 
    
  } else if (socket.handshake.query.request === undefined) {
    socket.disconnect();

  } else {
    const token = crypto.randomUUID();
    const player = new Player(socket.handshake.query.teamName, socket.handshake.query.borderColor, socket.handshake.query.avatar, false)
    playerMap.set(token, player);
    tokenMap.set(socket.id, token);
    dispatch("playerRegister", {data:playerMap.get(token), token: token, socketId: socket.id})
    userHadler(io, socket, playerMap, token, dispatch);
  
      setTimeout(() => { socket.emit("message", token, player.teamName, player.borderColor)}, 2000);

  }
}
