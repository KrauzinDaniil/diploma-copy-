import { createPortal } from "react-dom";
import classes from "./Shop.module.css"
import { CardInformation } from "../../../../types/infrormation";
import { useEffect } from "react";
import { SiPetsathome } from "react-icons/si";
const modalShop = document.getElementById("shop");

const Shop: React.FC<{dispatchUserState: (action: string, data: string) => void, information: CardInformation | null }> = ({dispatchUserState, information}) => { 
                   
    function clicked(data: string){ 
      dispatchUserState("userClickedOnCard", data)
    }


    if (!modalShop) {
      return null;
    }

    return createPortal(<div className={classes.shop}>
        Магазин 
          
        {information  === null || information.type === null ?  (
         <div className={classes.cardWrapper}>
           <div className={classes.card} onClick={() => { clicked("1")}}><div className={classes.name}> Карта бонусных очков  </div>        <div className={classes.description}></div> За каждый дополнительный круг получите очки в диапазоне от 100 до 500  </div> 
           <div className={classes.card} onClick={() => { clicked("2")}}><div className={classes.name}> Карта лишнего варианта</div>        <div className={classes.description}></div> Уберите половину неправильных вариантов </div> 
           <div className={classes.card} onClick={() => { clicked("3")}}><div className={classes.name}> Удвоение очков        </div>        <div className={classes.description}></div> Удвойте очки за задачу </div> 
         </div>  
        ) :  ( <div className={classes.cardWrapper}>  
                <div className={classes.card}><div className={classes.name}> {information.type === "appliedScore" ? (<div>Добавьте очков за каждый пройденный круг: {information.amount}</div>) : information.type === "deleteWrong" ? (<div> При использовании этой карты будет удалено неправильных ответов: {information.amount}</div>)
                : (<div>Используйте эту карту чтобы удвоить свое количество очков, если правильно ответите</div>)} 
                  </div> <div className={classes.description}></div> </div> 
        </div> 
         
      )}
      {information?.inform}
       
        
    </div>, modalShop); 
}


export default Shop;