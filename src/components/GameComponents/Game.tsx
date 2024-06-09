import classes from "./Game.module.css";
import UpperPanel from "./UpperPanel/UpperPanel";
import Between from "./Between/Between";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import InfoPanel from "./InfoPanel/InfoPanel";
import DownPanel from "./DownPanel/DownPanel";
import { userTableDisplay } from "../../types/userTableType";
import { displayTurn } from "../../types/displayTurn";
import { modalWindow } from "../../types/modalWindow";
import ActionPicker from "./ActionPicker/ActionPicker";
import { ActionProps } from "../../types/actionProps";
import { CardInformation } from "../../types/infrormation";

type triggerFunc = (action: string, data: string ) => void;


const Game: React.FC<{userPanelToShow:userTableDisplay[], teamName:string,
     numberRolled:number, cubeIsRolling:boolean,
     triggerGameChange:triggerFunc, triggerUserChange:triggerFunc, 
     isGameStarted:boolean, displayTurn:displayTurn,
     modalToDisplay: modalWindow | null,
     personalData:userTableDisplay | null, 
     shopInformation: CardInformation | null,
     actionPicker: ActionProps}> = ({userPanelToShow, cubeIsRolling, numberRolled, teamName, triggerGameChange,triggerUserChange, isGameStarted, displayTurn, modalToDisplay, personalData, actionPicker, shopInformation}) => {
  
  const [showModal, setShowModal] = useState(false);
  const [playerState, setPlayerState] = useState<userTableDisplay[]>([]);
  const [onHoverMyStates, setOnHoverMyStates] = useState(false);
  const [modalQuest, setModalQuest] = useState<modalWindow | null>(null);
  
  function createPortal() {
    setShowModal(true);
  }


  function  setHover(meaning: boolean) {
           setOnHoverMyStates(meaning); 
           

  }

  useEffect(() =>{     
    if(modalToDisplay !== null )
    setModalQuest(modalToDisplay);
  }, [modalToDisplay])

  useEffect(() => {
    if(modalQuest !== null)  { 
     createPortal();
    }
  }, [modalQuest])
  
  useEffect(() => { 
    triggerUserChange("getGameState", "");
    
    
  }, [isGameStarted])


  useEffect(() => { 
      
      setPlayerState(userPanelToShow)

  }, [userPanelToShow])
  return (
    <div className={classes.gameField}>
      {!showModal ? (
        ""
      ) : (
        <Modal
          triggerUserChange = { triggerUserChange}
          obj={modalQuest}
          displayTurn= {displayTurn}
          showModal = {setShowModal}
          triggerGameChange={triggerGameChange}
          personalData =  {personalData}
        ></Modal>
      )} 
      <div className={classes.innerWrapper}>
         
        <ActionPicker dices={ {numberRolled: numberRolled, isRolling: cubeIsRolling, triggerFunction: triggerUserChange } } actionPicker = {actionPicker} displayTurn={displayTurn} teamName={teamName} numberRolled={numberRolled} shopInformation ={ shopInformation}></ActionPicker>
      
        <UpperPanel
          whichSide={false}
          player={playerState}
          createPortal={createPortal}
          personalData = {personalData}
          onHover = {onHoverMyStates}
          
        ></UpperPanel>

        <Between player={playerState} personalData = {personalData} onHover = {onHoverMyStates}></Between>
        
        <DownPanel
          whichSide={true}
          player={playerState}
          createPortal={createPortal}
          personalData = {personalData}
          onHover = {onHoverMyStates}
        ></DownPanel>
      </div>

      <div>
        <InfoPanel player={playerState} inGame ={isGameStarted} triggerFunction={triggerUserChange} teamName = {teamName} personalData={personalData}  setOnHoverMyStates ={setHover }></InfoPanel>
      
      </div>
    </div>
  );
};
export default Game;
