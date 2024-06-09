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


  const [shopDetail, setShopDetail] = useState(information);

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
              clicked("1");
            }}
          >
            <div className={classes.name}> Карта бонусных очков </div>{" "}
            <div className={classes.description}></div> За каждый дополнительный
            круг получите очки в диапазоне от 100 до 500
          </div>
          <div
            className={classes.card}
            onClick={() => {
              clicked("2");
            }}
          >
            <div className={classes.name}> Карта лишнего варианта</div>{" "}
            <div className={classes.description}></div> Уберите половину
            неправильных вариантов{" "}
          </div>
          <div
            className={classes.card}
            onClick={() => {
              clicked("3");
            }}
          >
            <div className={classes.name}> Удвоение очков </div>{" "}
            <div className={classes.description}></div> Удвойте очки за задачу{" "}
          </div>
          <div style={{position:"absolute", bottom:"0"}} onClick={() => { }}>закрыть</div>
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
      {information?.inform}
    </div>,
    modalShop
  );
};

export default Shop;
