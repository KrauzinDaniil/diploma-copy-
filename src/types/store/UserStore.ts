import { observable, action, makeObservable, runInAction, computed } from "mobx";
import { SocketShell } from "../../Socket/Socket";
import storage from "../../utils/utils";
import { initialLoadingProps } from "../initialLoadingType";
import { gameState } from "../gameState";
import { userTableDisplay } from "../userTableType";
//State Manager 
class UserStore {
  @observable
  logined: boolean = false;

  @observable
  teamName: string = "";

  @observable
  borderColor: string = "";

  
  @observable
  personalData: userTableDisplay | null = null;

  @computed
  get totalPageNumber(): number {
    return Math.ceil(1 / 25);
  }

  socket: SocketShell;

  token: string;

  constructor(token: string) {
    console.log(token)
    this.token = token;
    this.socket = new SocketShell(token, this.dispatchUserState);
    makeObservable(this);
  }

  @action
  
  initialLoading = (data : initialLoadingProps) => {
    try {
      
      this.logined = true;
      runInAction(() => {
        
        if(data.token !== undefined && data.teamName !==undefined && data.borderColor !==undefined) {
            this.token = data.token
            storage.set("userKey", data.token)
            this.teamName = data.teamName
            this.borderColor = data.borderColor;
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        ""
      });
    }
  };
  @action 
  readyToPlay = () => {
    
    this.socket.makeReady();
  } 

  @action 
  sendClicked = () => { 
    this.socket.sendClicked();
  }
   

  @action 
  getSettings = () => {
    this.socket.loadUsers();
  }
  @action 
  setState = (data : gameState) => { 
    runInAction(() => {
      this.teamName = data.player.teamName
           this.borderColor = data.player.borderColor
     })
           
  }


  @action 
  showMovement = () => { 
    this.socket.showMovement();
  }

  @action 
  sendAnswer = (answer:number) => { 
      this.socket.sendAnswer(answer);
  }

  @action 
  setPersonalData = (personalData: userTableDisplay) => {
      this.personalData = personalData; 
      console.log(personalData);
  }

  @action 
  setSpin = () => { 
     this.socket.spin();
  }
  @action 
  beginBlitz = () => { 
    this.socket.beginBlitz();

  }
  @action 
  userClickedOnCard = (data: string) => { 
    
    this.socket.userClickedOnCard(data);
  }

  @action 
  userHandleStopSpinning =() =>  {
    this.socket.userHandleStopSpinning();
  }
 
 
  dispatchUserState = (action:string, data:string) => { 
    try {
      runInAction(() => {
        switch(action) {
          case "register": 
               this.initialLoading(JSON.parse(data))
          break
          case "imReady":
               this.readyToPlay(); 
          break 
          case "diceClicked": 
               this.sendClicked();        
          break
          case "getGameState": 
          this.getSettings();     
          break 
          case "getState": 
          this.setState(JSON.parse(data))
          break 
          case "showMovement":
          this.showMovement()
          break 
          case "sendAnswer": 
          this.sendAnswer(data as unknown as number);
          break 
          case "receivePersonalData": 
          
          this.setPersonalData(JSON.parse(data));  
          break
          case "setSpin": 
          this.setSpin()        
          break
          case "beginBlitz": 
          this.beginBlitz()
          break
          case "userClickedOnCard":
          this.userClickedOnCard(data);
          break 
          case "stoppedSpinning":
          this.userHandleStopSpinning();    
          

          
        }
      }) 
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        ""
      });
    }
    
  }

  

  /*  @action
    getCharacterListWithOffset = async (startsWith: string): Promise<void> => {
      try {
        this.loading = true;
  
        const characters = await api.characters.getCharacterListWithOffset(this.loadedAlready * 24, startsWith);
  
        this.loadedAlready+=1;
  
        runInAction(() => {
          
          let memoChar: DisplayInterface[] = []
          memoChar = characters.results.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            isChar: true,
            thumbnail: {
              path: item.thumbnail.path
                .concat("/landscape_incredible.")
                .concat(item.thumbnail.extension),
              extension: item.thumbnail.extension,
            },
            data: { 
              items: item.comics.items
            },
            isFavourited: false
      
          }));
          this.totalCharacters = characters.total;
          this.characters.push(...memoChar)
        
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.loading = false;
        });
      }
    };
  
  
  
    @action
    getCharacterDetails  = async (id: number): Promise<void> => {
      try {
        this.loading = true;
  
        const character = await api.characters.getCharacter(id);
          
        console.log(character)
        
  
  
        runInAction(() => {
          this.character = {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail,
            isChar: true,
            dataList: { items: [] },
            isFavourited: false
          };
            
          this.character.dataList.items = character.comics.items.map((item) => ({
            resourceURI: item.resourceURI,
            name: item.name,
            
          }))
        
            
        });
      } catch (error) {
        console.error(error);
      } finally {
        runInAction(() => {
          this.loading = false;
        });
      }
    };*/
}
  
  const key:string = storage.get("userKey")

  const userStore = new UserStore(key);
  
  console.log("юзер")
  
  export default userStore;
  