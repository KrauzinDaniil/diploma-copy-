import { useState } from "react";
import classes from "./multiplyCard.module.css"
const MultiplyCard: React.FC = () => { 

    const [isClicked, setIsClicked] = useState(false);
    return (<div className={classes.cardWrapper}>
        
        <div className={classes.imageWrapper} onClick={() =>  {setIsClicked(!isClicked)}}> {!isClicked ? <img src={"/public/multiply.png"} className={classes.imageCard}/> : (<div className={classes.textDescription}>
           <div> Умножьте количество очков за квест в два раза, но за неправильный ответ с вас снимут очки. </div>
        </div>) }     </div>
               
    </div>)
}

export default MultiplyCard;