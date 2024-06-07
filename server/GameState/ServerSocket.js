import onConnection from "../onConnection.js";
export class ServerSocket {
  io;
  gameDispatch;
  tokenToPlayerId = new Map();
  mapPlayerIdToSocket = new Map();
  constructor(io, dispatch) {
    this.io = io;
    this.gameDispatch = dispatch;
  }

  receiveConnections() {
    this.io.on("connection", (socket) => {
      onConnection(this.io, socket, this.socketDispatch);
    });
  }

  emitCurrentTurn(teamName, borderColor, avatar) {
    this.io.emit("currentTurn", teamName, borderColor, avatar);
  }
  playerRegister(data, token, socketId) {
    const id = this.gameDispatch("playerRegister", data);
    this.tokenToPlayerId.set(token, id);
    this.mapPlayerIdToSocket.set(id, socketId);
  }
  executeChance() {
    this.io.emit("showChanceWheel", {});
  }

  showAnimation(data) {
    this.io.emit("registeredPlayers", data);
  }

  givePlayerNewSocket(token, socketId) {
    const playerId = this.tokenToPlayerId.get(token);
    this.mapPlayerIdToSocket.set(playerId, socketId);
  }
  executeModal(data) {
    this.io.emit("executeModal", data);
  }
  executeShop() {
    this.io.emit("showShop", "");
  }
  sendPersonalData(data, id) {
    const newData = { ...data };

    newData.bonusCards = Object.entries(newData.bonusCards).map(
      ([type, amount]) => ({ type, amount })
    );

    this.io
      .to(this.mapPlayerIdToSocket.get(id))
      .emit("sendPersonalData", JSON.stringify(newData));
  }

  getId(token) {
    return this.tokenToPlayerId.get(token);
  }
  sendResult(data) {
    this.io.emit("sendResults", data);
  }
  provideAnimation(rndNumber) {
    this.io.emit("provideSpinAnimation", rndNumber);
  }
  hideWheel() {
    this.io.emit("hideWheel", "");
  }
  executeBlitz() {
    this.io.emit("blitz", "");
  }
  executePrison() {
    this.io.emit("prison", "");
  }
  informNotEnoughScores() {
    this.io.emit("notEnoughScores", "");
  }
  informPlayerPurchase(data) {
    this.io.emit("playerPurchase", data);
  }
 
  alertUsers(data){ 
    console.log("serverAlert")
    this.io.emit("alert", data )
  }
  emitProvideState(data){ 
    this.io.emit("provideState", JSON.stringify(data))
    
  }

  socketDispatch = (action, data) => {
    try {
      switch (action) {
        case "gameStart":
          return this.gameDispatch(action);

        case "playerRegister":
          this.playerRegister(data.data, data.token, data.socketId);
          break;
        case "getPlayerNewSocket":
          this.givePlayerNewSocket(data.token, data.socketId);
          break;
        case "getCurrentTurnState":
          this.gameDispatch("getCurrentTurn");
          break;
        case "cubeClicked":
          return this.gameDispatch("cubeClicked", this.getId(data));

        case "getGameState":
          return this.gameDispatch("getGameState", this.getId(data));

        case "movePlayer":
          this.gameDispatch("movePlayer", this.getId(data));
          break;
        case "sendAnswer": //number:data, token:token
          this.gameDispatch("sendAnswer", {
            id: this.getId(data.token),
            number: data.number,
          });
          break;
        case "getPersonalState":
          this.gameDispatch("getPersonalState", { id: this.getId(data) });
          break;
        case "spinClicked":
          this.gameDispatch("spinClicked", { id: this.getId(data) });
          break;
        case "beginBlitz":
          this.gameDispatch("beginBlitz", { id: this.getId(data) });
          break;
        case "clickedOnCard":
          this.gameDispatch("clickedOnCard", {
            id: this.getId(data.token),
            number: data.numberPicked,
          })
         break
         case "userHandleStopSpinning": 
            this.gameDispatch("userHandleStopSpinning",  {
              id: this.getId(data)
            }) 
          ; //dispatch("clickedOnCard", {token: token, numberPicked:data})
      }
    } catch (error) {
      ("");
    }
  };
}
