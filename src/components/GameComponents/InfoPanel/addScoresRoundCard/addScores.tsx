import { useState } from "react";
import classes from "./addScores.module.css"
const AddScoresCard: React.FC<{amount:number}> = ({amount}) => { 

    const [isClicked, setIsClicked] = useState(false);
    
    return (<div className={classes.cardWrapper}>
        
        <div className={classes.imageWrapper} onClick={() =>  {setIsClicked(!isClicked)}}> {!isClicked ? <img src={"/public/addScore.png"} className={classes.imageCard}/> : (<div className={classes.textDescription}>
           <div> Получите {Math.floor(amount).toString()} очков за прохождение круга игры. </div>
        </div>) }     </div>
               
    </div>)
}

export default AddScoresCard;