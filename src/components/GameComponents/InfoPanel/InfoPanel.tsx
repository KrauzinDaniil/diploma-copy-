import classes from './InfoPanel.module.css'
import { userTableDisplay } from '../../../types/userTableType';
import { ReactNode, useEffect, useState } from 'react';
import MultiplyCard from './multiplyScoresCard/multiplyCard'
import DeleteQuestionsCard from './deleteQuestionCard/deleteQuestionCard'
import AddScoresCard from './addScoresRoundCard/addScores'
import { bonusCard } from '../../../types/bonusCard';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

type dispatch = (action: string, data: string) => void;


const InfoPanel: React.FC<{
  player: userTableDisplay[];
  inGame: boolean;
  triggerFunction: dispatch;
  teamName: string;
  personalData: userTableDisplay;
  setOnHoverMyStates: (meaning: boolean) => void;
}> = ({
  player,
  inGame,
  triggerFunction,
  teamName,
  personalData,
  setOnHoverMyStates,
}) => {
  function showCards() {
    setShowCards(!cardsPanel)

  }
  
  function slideForward() { 
      setNumberOfCardToShow((numberOfCardToShow + 1) % cards.length);
  }
  function slideBackward() { 
     
    setNumberOfCardToShow(Math.abs(numberOfCardToShow - 1) % cards.length);
    
  }

   useEffect(() => {
  if(personalData !== null) {
   setCards(personalData?.bonusCards) 
   setNumberOfCardToShow(0)
  }
  }, [personalData])

  const [numberOfCardToShow, setNumberOfCardToShow] = useState(0)
  //const [cardToShow, setCardToShow] = useState<bonusCard | null>();
  const [cards, setCards] = useState<bonusCard[]>([]);
  const [cardsPanel, setShowCards] = useState (false)
  

  return (
    <div className={classes.infoPanel}>
      <div className={classes.scoreBoard}>
        <div className={classes.scoreList}>Команды:</div>
        <div className={classes.teams}>
          {player.map((item, index) => {
            return (
              <div className={classes.teamElement}>
                {index + 1}. {item.teamName} : {item.score}{" "}
                <div
                  className={classes.teamCircle}
                  style={{ borderColor: item.borderColor }}
                >         
                 <img src={item.avatar} className={classes.imageTeamy} />{" "}
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>

      {inGame ? (
        <div className={classes.yourPanel}>
          <div className={classes.youLabel}> Вы</div>

          <div className={classes.teamData}>
            <div className={classes.teamAndAvatar}>
              <div className={classes.teamName}> {teamName} </div>
              <div className={classes.circle}>
                <img src={personalData?.avatar} className={classes.imga} />
              </div>
            </div>
            <div className={classes.scores}>Очков : {personalData?.score}</div>
          </div>

          <div className={classes.whatYouOwn}>
            {" "}
            <div className={classes.owned}
              onMouseOver={() => {
                setOnHoverMyStates(true);
              }}
              onMouseLeave={() => {
                setOnHoverMyStates(false);
              }}
            >
              Ваши захваченные <br /> поля
            </div>
            <div onClick={showCards} className={classes.cardLabel} > Ваши карточки </div>
            
          </div>
          <div className={classes.cards}> <div className={classes.bonusCardList} style={{display: cardsPanel ? "" : "none"}}>
          <div onClick={slideBackward} className={classes.leftSlider}><div className={classes.wra}><FaChevronLeft/></div> </div> {cards.length !== 0 ? (<div className={classes.cardSelected}>{cards[numberOfCardToShow]?.type === "addMultiplier" ? <MultiplyCard/> : cards[numberOfCardToShow]?.type === "deleteWrong" ? <DeleteQuestionsCard amount={cards[numberOfCardToShow].amount}/> : cards[numberOfCardToShow]?.type ?  <AddScoresCard amount={cards[numberOfCardToShow].amount}/> : ""}</div>  ) : "" }    <div onClick={slideForward} className={classes.rightSlider}><div className={classes.wra}><FaChevronRight/></div></div>  </div></div>{" "}
        </div>
      ) : (   //                                                                                                                
        <button
          onClick={() => {
            triggerFunction("imReady", "");
          }} 
        >
         
          готов
        </button>
      )}
    </div>
  );
};
export default InfoPanel;
  