import React from "react";
import userStore from "../../types/store/UserStore";
import gameStore from "../../types/store/GameStore";
import Game from "../../components/GameComponents/Game";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite"
const GameRoute: React.FC = () => {
  const { logined, dispatchUserState, teamName, personalData } = userStore;
  const { userToShow, dispatchGameState, isGameStarted, displayTurn, cubeIsRolling, numberRolled, modalToDisplay, actionPicker, shopInformation} = gameStore;
  

  return (
  
    logined ? <Game userPanelToShow={userToShow} numberRolled = {numberRolled} teamName ={teamName} cubeIsRolling = {cubeIsRolling} triggerGameChange={dispatchGameState} triggerUserChange= {dispatchUserState} isGameStarted ={isGameStarted} displayTurn ={displayTurn} modalToDisplay={modalToDisplay} personalData = {personalData} actionPicker = {actionPicker} shopInformation ={shopInformation} /> : (<Link
      to="/">
      <a>Вы не авторизированы</a>
    </Link>)
    
  );
};

const ObservedGameRoute= observer(GameRoute);

export default ObservedGameRoute;
