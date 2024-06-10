import { createPortal } from "react-dom";
import classes from "./Shop.module.css";
import { CardInformation } from "../../../../types/infrormation";
import { useEffect, useState } from "react";
const modalShop = document.getElementById("shop");

const Shop: React.FC<{
  dispatchUserState: (action: string, data: string) => void;
  information: CardInformation | null;
}> = ({ dispatchUserState, information }) => {
  function clicked(data: string) {
    dispatchUserState("userClickedOnCard", data);
  }
  const [cardClicked, setCardClicked] = useState();

  const [shopDetail, setShopDetail] = useState(information);

  const [isClickeAddScoreCard, setIsClickedAddScoreCard] = useState(false)

  const [isClickedDeleteCard, setIsClickedDeleteCard] = useState(false)

  const [isClickedDoubleUpCard, setIsClickedDoubleUpCard] = useState(false)
  
  useEffect(() => {
    setShopDetail(information)
  }, [information]) 


  if (!modalShop) {
    return null;
  }

 console.log(shopDetail)
  
  return createPortal(
    <div className={classes.shop}>
      Магазин
      {shopDetail === null || shopDetail.type === null ? (
        
        <div className={classes.cardWrapper}>
          <div
            className={classes.card}
            onClick={() => {
              if(isClickeAddScoreCard) { 
              clicked("1");
              } else {  
                setIsClickedAddScoreCard(true);
              }
            }}
          >
            <div className={classes.name}> Карта бонусных очков </div>{" "}
           {!isClickeAddScoreCard  ? (<img src={"/public/addScore.png"} alt="" className={classes.innerImage} />) : "" } 
            <div className={classes.description}></div> За каждый дополнительный
            круг получите очки в диапазоне от 100 до 500
            <div style={{marginTop: "5%"}}>Цена 1000 очков </div>
          </div>
          <div
            className={classes.card}
            onClick={() => {

              if(isClickedDeleteCard) { 
              clicked("2")

          
              } else  {             setIsClickedDeleteCard(true);}
            }}
          >
            <div className={classes.name}> Карта лишнего варианта</div>{" "}
         {!isClickedDeleteCard ? (<img src={"/public/delete.jpg"} alt="" className={classes.innerImage} />) : "" }   
            <div className={classes.description}></div> Уберите половину
            неправильных вариантов{" "}
            <div style={{marginTop: "5%"}}>Цена 750 очков </div>
          </div>
          <div
            className={classes.card}
            onClick={() => {
              if(isClickedDoubleUpCard) { 
              clicked("3");
              }else {
                setIsClickedDoubleUpCard(true);
              }
            }}
          >
            <div className={classes.name}> Удвоение очков </div>{" "}
            {!isClickedDoubleUpCard ? (<img src={"/public/multiply.png"} alt="" className={classes.innerImage} />) : "" }     
            <div className={classes.description}></div> Удвойте очки за задачу 
            <div style={{marginTop: "5%"}}> Цена 1250 очков </div>
          </div>
          <div style={{position:"absolute", bottom:"0"}} onClick={() => { dispatchUserState("closeShop", "")}}>закрыть</div>
        </div>
      ) : (
        <div className={classes.cardWrapper}>
          <div className={classes.card}>
            <div className={classes.name}>
              {shopDetail.type === "appliedScore" ? (
                <div>
                  Добавьте очков за каждый пройденный круг: {shopDetail.amount}
                </div>
              ) : shopDetail.type === "deleteWrong" ? (
                <div>
                  При использовании этой карты будет удалено неправильных
                  ответов: {shopDetail.amount}

                  
                </div>
              ) : (
                <div>
                  Используйте эту карту чтобы удвоить свое количество очков,
                  если правильно ответите
                
                </div>
              )}
            </div>
            <div className={classes.description}></div>{" "}
          </div>
        </div>
      )}
      <div>
      {information?.inform}
      </div>
    </div>,
    modalShop
  );
};

export default Shop;
