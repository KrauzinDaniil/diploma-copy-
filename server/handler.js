let readyCount = 0;
export default function userHadler(io, socket, playerMap, token, dispatch) {
  let isReady = false;
  const fun = () => {
    const playerList = [];
    playerMap.forEach((value, key) => {
      playerList.push(value);
    });

    return playerList;
  };

  socket.on("showUsers", (data) => {
    socket.emit("provideState", JSON.stringify(dispatch("getGameState", token)));
    socket.emit("providePersonalState", JSON.stringify(dispatch("getPersonalState", token))) 
  });

  socket.on("imReady", () => {
    
    if(!isReady)  { 
    playerMap.get(token).isReady = true; 
    io.emit("registeredPlayers", fun());
    isReady = true;          
    readyCount++;
    }
    if(readyCount > 1 && readyCount === playerMap.size) {  
      
      const data = dispatch("gameStart", "");
      
      io.emit("gameHasStarted", data);
    }
  })

  socket.on("cubeClicked", () =>{ 
     io.emit("cubeAnimationStart");
     const time =  dispatch("cubeClicked", token);
     if(time !== 0) { 
       io.emit("getRandomNumber", time);
     }
  })
  
  socket.on("movePlayer", () =>{ 
    dispatch("movePlayer", token);
  })
  socket.on("sendAnswer", data => {  
    dispatch("sendAnswer", {number:data, token:token})
  })
  socket.on("spin", data => { 
    dispatch("spinClicked", token)
  })
  socket.on("beginBlitz", data  => { 
    dispatch("beginBlitz", token)
  })
  socket.on("clickedOnCard", data =>{  
    dispatch("clickedOnCard", {token: token, numberPicked:data})
  })
  socket.on("userHandleStopSpinning", data => { 
    dispatch("userHandleStopSpinning", token)
  })

  socket.on("deleteWrongOptions", data => { 
    dispatch("deleteWrongOptions", token)
  })
  socket.on("clickedMultiplyCard", data =>   {
    dispatch("clickedMultiplyCard", token)
  })


}
