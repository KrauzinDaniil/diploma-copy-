import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { FaBook } from "react-icons/fa";
import { modalWindow } from "../../../types/modalWindow";
import { displayTurn } from "../../../types/displayTurn";
import { useState } from "react";
import { userTableDisplay } from "../../../types/userTableType";
import MultiplyCard from "../InfoPanel/multiplyScoresCard/multiplyCard";
import DeleteQuestionsCard from "../InfoPanel/deleteQuestionCard/deleteQuestionCard";
const modalDialog = document.getElementById("modal");
type triggerFunc = (action: string, data: string) => void;
type UpdateStateFunction = (newValue: boolean) => void;

const Modal: React.FC<{
  obj: modalWindow | null;
  triggerUserChange: triggerFunc;
  triggerGameChange: triggerFunc;
  displayTurn: displayTurn;
  personalData: userTableDisplay | null;
  showModal: UpdateStateFunction;
}> = ({ triggerUserChange, obj, displayTurn, showModal, personalData }) => {
  const [showUser, setShowUser] = useState(displayTurn);
  const [showCardPanel, setShowCardPanel] = useState(false);

  function hide() {
    showModal(false);
  }

 
  
  const clicked = (number: number) => {
    triggerUserChange("sendAnswer", number.toString());
  };
  
  if (!modalDialog) {
    return null;
  }
  
  return createPortal(
    obj !== undefined ? (
      <div className={classes.dialogContent}>
        <div className={classes.mainLabel}>  {obj?.type === "algebra" ? "Алгебра" : obj?.type === "programming" ? "Программирование" : obj?.type === "geometry" ? "Геометрия" : "Логика" }</div>
        <div className={classes.wrapper}>
          <div className={classes.question}>{obj?.question}</div>
          <div className={classes.imageDialog}>
            <FaBook className={classes.icon}></FaBook>

            <div style={{ color: "saddlebrown" }}> {obj?.difficulty === "easy" ? "Легко" : obj?.difficulty === "medium" ? "Средне" : "Тяжело" }</div>
            <div style={{ color: "yellow" }}> {obj?.score + " очков"} </div>
            
          </div>
        </div>
        <div className={classes.playerWrapper}>
          <div>
            {" "}
            Отвечающий{" "}
            <div className={classes.answeringPerson}>
              {" "}
              {showUser.teamName}{" "}
              <div
                className={classes.circle}
                style={{ borderColor: showUser.borderColor }}
              >
                <img src={showUser?.avatar} className={classes.innerAvatar} />
              </div>{" "}
            </div>{" "}
          </div>
          {obj?.owner ? (
            <div>
              {" "}
              Владелец{" "}
              <div className={classes.answeringPerson}>
                {" "}
                {obj?.owner?.teamName}{" "}
                <div
                  className={classes.circle}
                  style={{ borderColor: obj?.owner?.borderColor }}
                >
                  <img
                    src={obj?.owner?.avatar}
                    className={classes.innerAvatar}
                  />
                </div>{" "}
              </div>{" "}
            </div>
          ) : (
            "Область не занята"
          )}{" "}
        </div>
        {!obj?.outcome ? !showCardPanel ?  ( 
          <div className={classes.answers}>
            <div className={classes.inWrapper}>
              <div
                onClick={() => {
                  clicked(1);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[0] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ?  obj.answers[0] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(2);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[1] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[1] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(3);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[2] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[2] : ""}
              </div>
            </div>
            <div className={classes.inWrapper}>
              <div
                onClick={() => {
                  clicked(4);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[3] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[3] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(5);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[4] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[4] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(6);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[5] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[5] : ""}
              </div>
            </div>
            <div className={classes.inWrapper}>
              <div
                onClick={() => {
                  clicked(7);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[6] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[6] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(8);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[7] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[7] : ""}{" "}
              </div>
              <div
                onClick={() => {
                  clicked(9);
                }}
                className={classes.buttonAnswer}
                style={{backgroundColor: obj?.answers[8] === "incorrect" ? "saddlebrown" : "transparent" }}
              >
                {" "}
                {obj ? obj.answers[8] : ""}
              </div>
            </div>
          </div>
        ) : 
           <div className={classes.outerWrapper}>
       
        <div className={classes.cardWrapper}> 
            {personalData?.bonusCards.map((value, index) => ( value.type !== "appliedScore" ? (<div className={classes.innerCard} >{value.type === "deleteWrong" ? <span><DeleteQuestionsCard amount={value.amount}/> <div className={classes.activateButton} onClick={() => {triggerUserChange("clickedDeleteWrongCard","")}}> Активировать</div></span>  : value.type === "addMultiplier" ?<span><MultiplyCard/><div  className={classes.activateButton} onClick={() => {triggerUserChange("clickedMultiplyScores","")}}> Активировать</div></span>  : "" }</div>) : ""))}
            
           
        </div>
            </div> : obj.outcome === "Правильно" ? (
          <div>
            <div> Верно</div>
            <div onClick={hide}> Продолжить </div>
          </div>
        ) : (
          <div>
            <div> Неверно</div>
            <div onClick={hide}> Продолжить </div>
          </div>
        )}

        <div style={{ marginTop: "5%" }} className={classes.cardButton} onClick={() => { 
          setShowCardPanel(!showCardPanel);
        }}> Использовать карточки</div>
        <div className={classes.indicator}>
          {/*Осталось времени: {remainingTime} секунд*/}
        </div>
      </div>
    ) : (
      ""
    ),
    modalDialog
  );
};
export default Modal;
