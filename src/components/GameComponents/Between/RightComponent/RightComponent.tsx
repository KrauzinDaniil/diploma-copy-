
import classes from "./RightComponent.module.css";
import { useEffect, useState } from "react";
import Icon from "../../../PlayerIcon/PlayerIcon";
import { LuBrain } from "react-icons/lu";
import { FaBrain } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import { userTableDisplay } from "../../../../types/userTableType";
const RightComponent: React.FC<{id:number, player: userTableDisplay[], createPortal: () => void, difficulty: string, onHover:boolean, personalData : userTableDisplay | null}> = ({id, player, createPortal, difficulty, onHover, personalData}) => {
    
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







  return <div className={classes.square} style={{backgroundColor : onHover ? personalData?.ownedStates?.includes(id) ? `${personalData.borderColor}` : "transparent" : "transparent"}} >
 <div className={difficulty === "easy" ? classes.easy : difficulty === "medium" ? classes.medium : classes.hard}> <div className={classes.points}>{difficulty === "easy" ? "+ 200" : difficulty === "medium" ? "+ 300" : "+ 400" }</div> </div>   
    <div className={classes.cell}>
 {components}</div>
 
 <div className={classes.subjectColor}>
 <div className={classes.lowLabel}>
 { difficulty === "easy" ? "Легко" : difficulty === "medium" ? "Средне" : "Тяжело" }
 </div>
   <div>
 { difficulty === "easy" ? <LuBrain/> : difficulty === "medium" ? <FaBrain/> : <GiBrain/> }
 </div>
 
 </div>

 
  

 </div>
};
export default RightComponent;
