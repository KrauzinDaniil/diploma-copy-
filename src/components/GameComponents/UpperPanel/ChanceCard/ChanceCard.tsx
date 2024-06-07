import Icon from "../../../PlayerIcon/PlayerIcon";
import { useEffect, useState } from "react";
import { actionPlace } from "../../Game";
import classes from "./ChanceCard.module.css"
import { userTableDisplay } from "../../../../types/userTableType";
import { MdQuestionMark } from "react-icons/md";

const ChanceCard: React.FC<{ id: number; player: userTableDisplay[]; createPortal: () => void}> = ({
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



  return <div className={classes.square}>  
     <div className={classes.outer}> 
     <div className={classes.chanceLabel}> <MdQuestionMark className={classes.iconic}/></div>
    <div className={classes.cell}>
    {components}</div>
    
    </div>  
    <div className={classes.lower}> Шанс</div>
    </div>
    
};
export default ChanceCard;
