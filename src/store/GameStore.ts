import {
  observable,
  action,
  makeObservable,
  runInAction,
  computed,
} from "mobx";
import { SocketShell } from "../Socket/Socket";
import storage from "../utils/utils";
import { userTableDisplay } from "../types/userTableType";
import { displayTurn } from "../types/displayTurn";
import { gameState } from "../types/gameState";
import { modalWindow } from "../types/modalWindow";
import { ActionProps } from "../types/actionProps";
import { CardInformation } from "../types/infrormation";

class GameStore {
  @observable
  actionPicker: ActionProps = { actionType: "dices", numberSpinned: null };

  spinning: boolean = false;

  @observable
  shopInformation: CardInformation | null = null;

  @observable
  logined: boolean = false;

  @observable
  isGameStarted: boolean = false;

  @observable
  cubeIsRolling: boolean = false;

  @observable
  numberRolled: number = 0;

  @observable
  modalToDisplay: modalWindow | null = null;

  @observable
  borderColor: string = "";

  @observable
  userToShow: userTableDisplay[] = [];

  @observable
  displayTurn: displayTurn = {
    teamName: "bora",
    borderColor: "white",
    avatar: "",
    bonusScore: 0,
  };

  @computed
  get totalPageNumber(): number {
    return Math.ceil(1 / 25);
  }

  gameSocket: SocketShell;

  token: string;

  constructor(token: string) {
    this.token = token;
    this.gameSocket = new SocketShell(token);
    this.gameSocket.subscribeGameState(this.dispatchGameState);
    makeObservable(this);
  }
  @action
  userSetShow = (data: userTableDisplay[]) => {
    console.log(data);
    runInAction(() => {
      this.userToShow = data;
    });
  };

  @action
  startGame = (data: userTableDisplay[]) => {
    runInAction(() => {
      this.userToShow = data;

      this.isGameStarted = true;
    });
  };

  @action
  setTurn = (data: displayTurn) => {
    runInAction(() => {
      this.displayTurn = data;
      this.actionPicker = { actionType: "dices", numberSpinned: null };
      this.displayTurn.bonusScore = 0;
    });
  };

  @action
  spinCube = (time: number) => {
    runInAction(() => {
      setTimeout(() => {
        this.numberRolled = time;
        this.cubeIsRolling = false;
      }, 3000);
    });
  };

  @action
  cubeRoll = () => {
    runInAction(() => {
      this.spinning = false;
      this.cubeIsRolling = true;
    });
  };

  @action
  setState = (data: gameState) => {
    runInAction(() => {
      this.setTurn(data.playerTurn);
      this.isGameStarted = data.isStarted;
      this.userSetShow(data.players);
    });
  };

  @action
  setModal = (data: modalWindow) => {
    runInAction(() => {
      this.actionPicker = { actionType: "dices", numberSpinned: null };
      this.modalToDisplay = data;
      this.spinning = true;
    });
  };

  @action
  sendResult = (data: string) => {
    if (this.modalToDisplay !== null) {
      this.modalToDisplay.outcome = data;
    }
  };
  @action
  setChanceWheel = () => {
    runInAction(() => {
      if (!this.spinning) {
        this.actionPicker = { actionType: "chance", numberSpinned: null };
      }
    });
  };

  @action
  hideWheel = () => {
    runInAction(() => {
      this.actionPicker = { actionType: "dices", numberSpinned: null };
    });
  };
  @action
  activateSpinAnimation = (numberSpinned: number) => {
    runInAction(() => {
      this.actionPicker = {
        actionType: "chance",
        numberSpinned: numberSpinned,
      };
      this.spinning = true;
    });
  };
  @action
  setBlitz = () => {
    runInAction(() => {
      if (!this.spinning) {
        this.actionPicker = { actionType: "blitz", numberSpinned: null };
      }
    });
  };
  @action
  showPrison = () => {
    runInAction(() => {
      if (!this.spinning) {
        this.actionPicker = { actionType: "prison", numberSpinned: null };
      }
    });
  };
  @action
  showShop = () => {
    runInAction(() => {
      this.actionPicker = { actionType: "shop", numberSpinned: null };
    });
  };
  @action
  nullifyModalWindow = () => {
    this.modalToDisplay = null;
  };
  @action
  notEnoughScores = () => {
    this.shopInformation = {
      inform: "У вас недостаточно очков для покупки этой карты",
      type: null,
      amount: null,
    };
  };
  @action
  informPlayerPurchase = (data: CardInformation) => {
    this.shopInformation = {
      inform: "Вы приобрели",
      type: data.type,
      amount: data.amount,
    };
  };
  @action 
  alertPlayers = (data:string) => {

    alert(data);
  }
  

  @action
  dispatchGameState = (action: string, data: string) => {
    try {
      runInAction(() => {
        switch (action) {
          case "userShow":
            this.userSetShow(JSON.parse(data));
            break;
          case "gameBegin":
            this.startGame(JSON.parse(data));
            break;
          case "setTurn":
            this.setTurn(JSON.parse(data));
            break;
          case "spinCube":
            this.spinCube(data as unknown as number);
            break;
          case "cubeRolling":
            this.cubeRoll();
            break;
          case "getState":
            this.setState(JSON.parse(data));
            break;
          case "executeModal":
            this.setModal(JSON.parse(data));
            break;
          case "sendResults":
            this.sendResult(data);
            break;
          case "showChanceWheel":
            this.setChanceWheel();
            break;
          case "provideSpinAnimation":
            this.activateSpinAnimation(data as unknown as number);
            break;
          case "hideWheel":
            this.hideWheel();
            break;
          case "blitz":
            this.setBlitz();
            break;
          case "prison":
            this.showPrison();
            break;
            case "showShop": 
              this.showShop();
            break;
          case "nullifyModalWindow":
            this.nullifyModalWindow();
            break;
          case "notEnoughScores":
            this.notEnoughScores();
            break;
          case "playerPurchase":  
            this.informPlayerPurchase(JSON.parse(data));
            break;
          case "alert":
            this.alertPlayers(data);  
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        ("");
      });
    }
  };
}

const key: string = storage.get("userKey");

const gameStore = new GameStore(key);

console.log("гейм");
export default gameStore;
