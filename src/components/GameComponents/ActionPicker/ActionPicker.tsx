import { useEffect, useState } from "react";
import { displayTurn } from "../../../types/displayTurn"
import Dices from "../Dices/Dices"
import classes from  "./ActionPicker.module.css"
import { Wheel } from 'react-custom-roulette'
import { ActionProps } from "../../../types/actionProps";
import Shop from "./Shop/Shop";
import { CardInformation } from "../../../types/infrormation";

type triggerFunc = (action: string, data: string ) => void;

interface DicesProps { 
    numberRolled: number, 
    isRolling: boolean, 
    triggerFunction:triggerFunc

}
const data = [
    { option: 'Задача' },
    { option: 'Получите очки'},
    { option: 'Бонус карта' },
    { option: 'Повторный бросок' },
  ]


const ActionPicker: React.FC<{dices: DicesProps, displayTurn: displayTurn, teamName : string, numberRolled : number, actionPicker : ActionProps, shopInformation: CardInformation | null }> = ({dices,  displayTurn, teamName, numberRolled, actionPicker, shopInformation } ) => { 
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [toSpin, setToSpin] = useState(false);
    const [actionType, setActionType] = useState(actionPicker.actionType);

    useEffect(() => { 
       if(toSpin && actionPicker.numberSpinned !== null) { 
          handleSpinClick(actionPicker.numberSpinned)
       }
           
    }, [actionPicker])


    useEffect (() => { 
      actionPicker.actionType
       setActionType(actionPicker.actionType)
    }, [actionPicker])

  const handleSpinClick = (prize:number) => {
    if (!mustSpin) {
      
      setPrizeNumber(prize);
      setMustSpin(true);
    }
  }
        
    
    return (
         
         actionPicker.actionType === "dices" ? (<div className={classes.dices}>
               
        <div
          className={classes.buttonThrow}
          onClick={() => {
            if(displayTurn.teamName === teamName) { 
                dices.triggerFunction("diceClicked", "");
            }
          }}
        >

          <span>    Бросайте кубик, </span> 
              {displayTurn.teamName}
          <span className={classes.playerName}>
          </span>
          <span className={classes.teamCircle} style={{borderColor: displayTurn.borderColor } }> <img src= {displayTurn?.avatar} alt="" className={classes.iconic} /></span>  
                 
        </div>
         <Dices numberRolled={dices.numberRolled} isRolling ={dices.isRolling} triggerFunction ={dices.triggerFunction}></Dices>  { 
         numberRolled === 0 ? " " : 
        <div className={classes.rolledNumber}> {numberRolled} </div> } 
      </div>) : actionPicker.actionType === "chance" ? ( 
        <div className={classes.dices}>
               
         <Wheel
        pointerProps = {{style: { width: '50px',
        height: '50px',}}}
        outerBorderWidth = {10}
        outerBorderColor = {"saddlebrown"}
        backgroundColors = { ['#E1C576', '#CEAE57', '#CA8931', '#C2712F' ]}
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
          dices.triggerFunction("stoppedSpinning","");
        }}
      />
        <button onClick={ () => {dices.triggerFunction("setSpin", ""); setToSpin(true) }}>SPIN</button>
        </div>
      ) : actionPicker.actionType === "blitz" ? ( <div className={classes.dices }>
                Ответьте правильно на 3 вопроса 
                <button onClick={ () => { dices.triggerFunction("beginBlitz", "") }}> начать </button>


      </div>) : actionPicker.actionType === "prison" ? (<div className={classes.dices }> Тюрьма</div>) : actionPicker.actionType ===  "shop" ? (<Shop dispatchUserState={dices.triggerFunction} information={shopInformation}/>) : displayTurn.bonusScore > 0 ?  (<div>Вы получили бонусные очки: {displayTurn.bonusScore}</div>) : (<div></div>) 
        
    )
  
 }










 export default ActionPicker
