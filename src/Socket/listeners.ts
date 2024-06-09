import { Socket } from "socket.io-client";


export default function listenerSetter(socket: Socket, dispatchUser: (action: string, data:string) => void, dispatchGameState: (action:string, data:string) => void) { 
    socket.on("registeredPlayers", (data) => {
      console.log(data)
      dispatchGameState("userShow", JSON.stringify(data));
    });
    socket.on("message", (token, teamName, borderColor) => {
      dispatchUser("register",JSON.stringify({ token, teamName, borderColor }));
    });
    socket.on("gameHasStarted", (data) => {
      dispatchGameState("gameBegin", JSON.stringify(data));
    });
    socket.on("currentTurn", (teamName, borderColor, avatar) => {
      dispatchGameState("setTurn", JSON.stringify({ teamName, borderColor, avatar }));
    });
    socket.on("cubeAnimationStart", () => {
      dispatchGameState("cubeRolling", "");
    });
    socket.on("getRandomNumber", (data) => { 
        dispatchGameState("spinCube", data)
    })
    socket.on("provideState", data =>{  

        dispatchGameState("getState", data)
        dispatchUser("getState", data);
    })
    socket.on("executeModal", data => {
      console.log(data)
      dispatchGameState("executeModal", data)
    })
    socket.on("sendResults", data =>  { 
      dispatchGameState("sendResults", data)
    })
    socket.on("sendPersonalData", data => { 
      console.log(data)
      dispatchUser("receivePersonalData", data);
    }) 
    socket.on("showChanceWheel", data => { 
      dispatchGameState("showChanceWheel", data);
    })
    socket.on("provideSpinAnimation",number =>  {
      dispatchGameState("provideSpinAnimation", number.toString())
    }) 
    socket.on("hideWheel", data =>{ 
      dispatchGameState("hideWheel", "")
    })
    socket.on("blitz", data => {  
      dispatchGameState("blitz", "")
    })
    socket.on("prison", data => {  
      dispatchGameState("prison", "")
    })
    socket.on("showShop", data => { 
      
      dispatchGameState("showShop", "")
    })
    socket.on("notEnoughScores", data =>{  
      dispatchGameState("notEnoughScores", "");
    })
    socket.on("playerPurchase", data => { 
      dispatchGameState("playerPurchase", JSON.stringify(data));
    })
    socket.on("alert", data =>{ 
    
      dispatchGameState("alert", data);
    })
    
}