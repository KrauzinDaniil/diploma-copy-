import {io, Socket} from "socket.io-client"
import listenerSetter from "./listeners";

type dispatch = (action:string, data:string) => void;

export class SocketShell {

    socket: Socket | null = null;
    listenerRegistered: boolean = false;
    dispatchUser: (action: string, data: string)=> void = () => {};
    dispatchGameState: (action:string, data:string) => void = () => {} ;
    static instance: SocketShell;
    constructor(token: string, dispatch?:dispatch) { if(!SocketShell.instance)  { 
    
      if(dispatch !== undefined) { 
       this.dispatchUser = dispatch;
       this.socket = io("http://localhost:3002", { 
       auth: {userKey: token}
       })   
        setTimeout(() =>{
            if(this.socket !== null)  {   
            this.registerListeners();
            }
        }, 1000)
    
    
                
    }
       if(this.socket !== null) { 
        this.socket.on("prevEnter", (token, teamName, borderColor, isReady, position) =>  { 
        
        this.dispatchUser("register",JSON.stringify( {token, teamName, borderColor, isReady, position }));
       })
       SocketShell.instance = this;
    }
    
    } else {
        
        return  SocketShell.instance}
}

    subscribeGameState(dispatch:dispatch) {
        
        this.dispatchGameState = dispatch; 

    }
    loadUsers()  { 

        setTimeout (() => { 
            
            this.socket?.emit("showUsers", ("")); },
            
         2000)
       
    }

    makeReady() { 
            this.socket?.emit("imReady");
    }
    
    connect(teamName:string, borderColor:string, avatar: string | undefined) {
        this.socket = io("http://localhost:3002", { 
            query:  { 
                request: true,
                teamName:teamName,
                borderColor:borderColor,
                avatar:avatar
            }
        });
                
        setTimeout(() => {
            this.registerListeners();
        }, 1000)
       
           
    }


    showMovement() { 
        this.socket?.emit("movePlayer", "");
    }
    registerListeners() { 
        if(!this.listenerRegistered) {
        if(this.socket !== null) {
        listenerSetter(this.socket, this.dispatchUser, this.dispatchGameState);
        } else { return}
    }
    }
    sendClicked() { 
        this.socket?.emit("cubeClicked")
    }
    getSettings() { 
        this.socket?.emit("getSettings")
    }
    sendAnswer(answer:number) { 
        this.socket?.emit("sendAnswer", answer);
    }
    spin() { 
        this.socket?.emit("spin","");
    }
    beginBlitz() {
        this.socket?.emit("beginBlitz", "");
    }
    userClickedOnCard(data: string) { 
        this.socket?.emit("clickedOnCard", data)
    }
    userHandleStopSpinning() { 
        this.socket?.emit("userHandleStopSpinning", "");
    }
    deleteWrongOptions() { 
        this.socket?.emit("deleteWrongOptions", "");
    }

}