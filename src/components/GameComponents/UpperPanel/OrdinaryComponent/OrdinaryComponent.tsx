import classes from "./OrdinaryComponents.module.css";
import Icon from "../../../PlayerIcon/PlayerIcon";
import { useEffect, useState } from "react";
import { IoShapesOutline } from "react-icons/io5";
import { IoShapes } from "react-icons/io5";
import { FaShapes } from "react-icons/fa6";
import { userTableDisplay } from "../../../../types/userTableType";
const OrdinaryComponent: React.FC<{ id: number; player: userTableDisplay[]; createPortal: () => void; difficulty: string; personalData: userTableDisplay | null, onHover:boolean  }> = ({
  id,
  player,
  createPortal,
  difficulty,
  personalData,
  onHover
}) => {
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
    
  }, [player]);

 

  return <div className={classes.square} style={{backgroundColor : onHover ? personalData?.ownedStates?.includes(id) ? `${personalData.borderColor}` : "transparent" : "transparent"}} >

  
 
 <div className={classes.subjectColor}> <div>
 { difficulty === "easy" ? <IoShapesOutline/> : difficulty === "medium" ? <IoShapes/> : <FaShapes/> }
 </div>
 <div className={classes.lowLabel}>
 { difficulty === "easy" ? "Легко" : difficulty === "medium" ? "Средне" : "Тяжело" }
 </div>
 </div>
 <div className={classes.cell}>
 {components}</div>
 <div className={difficulty === "easy" ? classes.easy : difficulty === "medium" ? classes.medium : classes.hard}>{difficulty === "easy" ? "+ 200" : difficulty === "medium" ? "+ 300" : "+ 400" } </div>
 </div>
};
export default OrdinaryComponent;
