import classes from "./BeginningComponents.module.css";
import Player from "../../../../routes/Player";
import { useEffect, useState } from "react";
import Icon from "../../../PlayerIcon/PlayerIcon";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { userTableDisplay } from "../../../../types/userTableType";
const BeginningComponents: React.FC<{ id: number; player: userTableDisplay[] }> = ({
  id,
  player,
}) => {
 
    const [players, changePlayers] = useState<userTableDisplay[]>([]);
    const [components, changeComp] = useState<React.ReactElement[]>([]);
    useEffect(() => {
      const comp: React.ReactElement[] = [];
      const addPlaya: userTableDisplay[] = [];
      for (let i = 0; i < player.length; i++) {
        if (id == player[i].position) {

            comp.push(<Icon color = {player[i].borderColor} imageUrl={player[i].avatar}></Icon>);
          addPlaya.push(player[i]);
        }
      }
      changeComp(comp);
      changePlayers(addPlaya);
      
    }, [player]);
  
   

  return (
    <div className={classes.square}>
      <div className={classes.goLabel}> GO   
    
      </div>

      <div className={classes.arrow}><TbArrowBigLeftFilled/> </div>
      <div className={classes.label}>
        <div className={classes.when}>Когда</div>{" "}
        <div className={classes.when}>пройдете круг, </div>{" "}
        <div className={classes.when}>зайдите в магазин  </div>
        <div className={classes.cell}>
          {components}</div>
      </div>
      
    </div>
  );
};
export default BeginningComponents;
