import { ServerSocket } from "./ServerSocket.js";
import { Player } from "./models/playerState.js";
import { randomNumber } from "../utils/generateRandom.js";
import { BonusCardInfoProvider } from "./bonusCards.js/bonusCardInfoProvider.js";
import { ActionHandler } from "./cardHandlers/actionHandler.js";
import e from "cors";
export class Game {
  id;
  isStarted;
  players = new Map();
  playersPosition = new Map();
  serverSocket;
  currentTurn;
  numberRolled = 0;
  numberSpinRolled = 0;
  questTime = false;
  actionSelector;
  isExecuted = false;
  actionPosition;
  playerOwnedStates = new Map();
  isCalled = false;
  isClicked = false;
  bonusCardInfoProvider;
  constructor(io) {
    this.id = 0;
    this.isStarted = false;
    
    this.actionHandler = new ActionHandler();
    this.bonusCardInfoProvider = new BonusCardInfoProvider();
    this.players = new Map();
    this.serverSocket = new ServerSocket(io, this.dispatch);
    this.currentTurn = -1;
  }


  //регистрация клиента
  registerClient() {
    this.serverSocket.receiveConnections();
  }


  //передать ход
  setTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.players.size;
    const player = this.players.get(this.currentTurn);
    this.serverSocket.emitCurrentTurn(
      player.teamName,
      player.borderColor,
      player.avatar
    );
  }
  //тест данные
  setPlayerPositionTest() {
    this.players.get(0).position = 35;
    this.players.get(1).position = 35;
    this.players.get(0).score = 3500;
    this.players.get(1).score = 3500;
    this.players.get(0).addOwnedState(4);
    this.playerOwnedStates.set(4, 0);
  }

  //начать игру
  start() {
    this.isStarted = true;
    this.setTurn();
    const playerList = [];
    this.players.forEach((value, key) => {
      playerList.push(value);
    });

    return playerList;
  }

  //зарегистрировать игрока
  registerPlayer(data) {
    const newId = this.id++;
    this.players.set(
      newId,
      new Player(data.teamName, data.borderColor, data.avatar, false, 1)
    );
    this.playersPosition.set(newId, 1);
    return newId;
  }

  //получить число с броска кубика
  handleCubeClick(id) {
    this.isExecuted = false;
    if (this.questTime === false) {
      if (id !== this.currentTurn) {
        return 0;
      }

      const numb = randomNumber();

      this.numberRolled = numb;
      setTimeout(() => {   this.movePlayer(id); }, 2000 )
      return numb;
    } else {
      return 0;
    }
  }


  //обработать ответ на вопрос 
  performResponseQuestion(object) {
    if (
      object.id !== this.currentTurn &&
      this.playerOwnedStates.get(this.actionPosition) !== object.id
    ) {
      return;
    }
    const result = this.actionHandler.returnOutcomeToScreen({
      action: "quest",
      number: object.number,
    });
    if (result.res === "Правильно") {
      this.serverSocket.sendResult("Правильно");
      this.players.get(object.id).score += result.score;
      this.players.get(object.id).addOwnedState(this.actionPosition);
      this.getPersonalData(object.id);
      this.playerOwnedStates.set(this.actionPosition, object.id);
      this.setTurn();
    } else {
      this.serverSocket.sendResult("Неверно");
      this.setTurn();
    }

    this.serverSocket.showAnimation(this.provideGameState(object.id).players);
    this.getPersonalData(object.id);
  }
  //случайное число в рулетке
  performRollSpin(id) {
    if (id !== this.currentTurn) {
      return;
    }
    if(!this.isClicked) { 
    this.numberSpinRolled = Math.floor(Math.random() * 4);
    this.serverSocket.provideAnimation(this.numberSpinRolled);
    this.isClicked = true;
    } else { return} 

  
  }  
  // показать клиентам рулетку
 async performResponseSpin() {
     
     let result = this.actionHandler.returnOutcomeToScreen({action: "spinn", number: this.numberSpinRolled})
     switch(result) { 
      case "quest":
        result = await this.actionHandler.returnActionToScreen("random");
        this.serverSocket.executeModal(JSON.stringify(result.data));
        this.isClicked = false;
        break 
        case "addScores":  
        result = Math.random() * 500;
        this.players.get(this.currentTurn).score += Math.floor(result);
        //socket.emit("provideState", JSON.stringify(dispatch("getGameState", token)));
        this.serverSocket.emitProvideState(this.provideGameState(this.currentTurn))
        this.getPersonalData(this.currentTurn);
        //this.serverSocket.alertUsers("Игрок " + this.players.get(this.currentTurn).teamName + "Получил "  + result.toString() + "бонусных очков");
        this.serverSocket.hideWheel();  
        this.isClicked = false;
        this.setTurn();
        break
        case "doubleSpin": 
        this.isClicked = false;
        this.serverSocket.hideWheel();  
        break  
        case "bonusCard":
        this.isClicked = false;
        this.serverSocket.alertUsers("функция еще реализована");
        this.serverSocket.hideWheel();  

     }
     
  }
  // выдать клиентам состояние игры
  provideGameState(id) {
    const playerList = [];
    this.players.forEach((value, key) => {
      playerList.push(value);
    });
    const player = this.players.get(id);
    let displayTurn;
    if (this.currentTurn === -1) {
      displayTurn = new Player("", "#ffffff", false, 0);
    } else {
      displayTurn = this.players.get(this.currentTurn);
    }
   
    return {
      players: playerList,
      isStarted: this.isStarted,
      player: player,
      playerTurn: displayTurn,
    };
  }
   
  applyCardScore(id) { 
    this.players.get(id).applyScore()
  }

  //передвижение
  movePlayer(id) {
    if (id !== this.currentTurn) {
      return;
    }
 

    const player = this.players.get(id);
    
    const timer = setInterval(() => {
      if (this.numberRolled !== 0) {
        if (player.position === 40) {
          this.applyCardScore(id)
          this.numberRolled = 0;
          player.position = 1;
        } else {
          player.position = 1 + player.position;
          this.numberRolled--;
          const playerList = [];
          this.players.forEach((value, key) => {
            playerList.push(value);
          });
          this.serverSocket.showAnimation(playerList);
        }
      } else {
        clearInterval(timer);
        setTimeout(async () => {
          this.actionPosition = player.position;
          const object = await this.actionHandler.returnActionToScreen(
            player.position
          );
          switch (object.action) {
            case "quest":
              this.serverSocket.executeModal(JSON.stringify(object.data));
              break;
            case "chance":
              this.serverSocket.executeChance();
              break;
            case "blitz":
              this.serverSocket.executeBlitz();
              break;
            case "spinAgain":
              "";
              break;
            case "prison":
              if (!this.isExecuted) {
                this.serverSocket.executePrison();
                this.isExecuted = true;
              }
              break;
            case "shop":
              
                this.serverSocket.executeShop();
              
              break;
              
          }
        }, 1000);
      }
    }, 500);
  }
  //выдать клиенту (определенному) его данные 
  getPersonalData(id) {
    const toSend = this.players.get(id);
    console.log("sended")
    console.log(toSend)
    this.serverSocket.sendPersonalData(toSend, id);
  }
  deleteWrongOptionsFromQuest(id)  {
    if(id !== this.currentTurn) { return}
    const cutQuestNumber = this.players.get(id).getWrongCardMultiplier();
    let result; 
    if(cutQuestNumber != false)  {
         result = this.actionHandler.modifyQuest(cutQuestNumber);
    }
    if(result.response === true) { 
      this.serverSocket.executeModal(JSON.stringify(result.data))
    }
  }

  //TODO
  async beginBlitzHandle(id) {
    if (id !== this.currentTurn) {
      return;
    }
    const object = await this.getter("blitz");
    this.serverSocket.executeModal(JSON.stringify(object.data));
  }
  //Кликнуть на карту 
  handleClickedOnCard(id, number) {
    if (id !== this.currentTurn) {
      return;
    }

    if (
      this.players.get(id).score <
      this.bonusCardInfoProvider.cardPrices.get(Number(number))
    ) {
      this.serverSocket.informNotEnoughScores();
    } else {

      this.players.get(id).addBonusCard(Number(number));
      const cardToInform = this.players
        .get(id)
        .provideBonusCardInfo(Number(number));
      this.serverSocket.informPlayerPurchase({
        inform: "Вы приобрели карту",
        amount: cardToInform.amount,
        type: cardToInform.type,
      });
      this.getPersonalData(id);
     
      setTimeout(() => {
        
        this.serverSocket.hideWheel();
        this.setTurn();
      }, 5000);
    }
  }
  //обработать поступление с сокета
  dispatch = (action, data) => {
    switch (action) {
      case "gameStart":
        return this.start();
      case "playerRegister":
        return this.registerPlayer(data);
      case "getCurrentTurn":
        break;
      case "cubeClicked":
        return this.handleCubeClick(data);
      case "getGameState":
        return this.provideGameState(data);
      case "movePlayer":
        this.movePlayer(data);
        break;
      case "sendAnswer":
        this.performResponseQuestion({ id: data.id, number: data.number });
        break;
      case "getPersonalState":
        this.getPersonalData(data.id);
        break;
      case "spinClicked":
        this.performRollSpin(data.id);
        break;
      case "beginBlitz":
        this.beginBlitz(data.id);
        break;
      case "clickedOnCard":
        this.handleClickedOnCard(data.id, data.number);
        break
      case "userHandleStopSpinning" : 
         this.performResponseSpin(data.id);  
        break
      case "deleteWrongOptions": 
         this.deleteWrongOptionsFromQuest(data.id)    
    }
  };
}
