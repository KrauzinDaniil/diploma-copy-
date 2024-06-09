import { useState } from "react";
import classes from "./deleteQuestionCards.module.css"
const DeleteQuestionsCard: React.FC<{amount: number}> = (amount) => { 

    const [isClicked, setIsClicked] = useState(false);
    return (<div className={classes.cardWrapper}>
        
        <div className={classes.imageWrapper} onClick={() =>  {setIsClicked(!isClicked)}}> {!isClicked ? <img src={"/public/delete.jpg"} className={classes.imageCard}/> : (<div className={classes.textDescription}>
           <div> Удалите {amount.toString()} неправильных вариантов ответов </div>
        </div>) }     </div>
               
    </div>)
}

export default DeleteQuestionsCard;