import classes from "./OrdinaryComponents.module.css";
import Icon from "../../../PlayerIcon/PlayerIcon";
import { useEffect, useState } from "react";
import { IoBookOutline } from "react-icons/io5"; 
import { FaBookOpen } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { userTableDisplay } from "../../../../types/userTableType";
const OrdinaryComponent: React.FC<{ id: number; player: userTableDisplay[]; createPortal: () => void, difficulty: string, personalData :userTableDisplay | null, onHover:boolean }> = ({
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
    for (let i = 0; i < player.length; i++) {
      if (id == player[i].position) {
        comp.push(<Icon color = {player[i].borderColor} imageUrl={player[i].avatar}></Icon>);
      
      }
    }
    changeComp(comp);
  }, [player]);
  
  
  return <div className={classes.square} style={{backgroundColor : onHover ? personalData?.ownedStates?.includes(id) ? `${personalData.borderColor}` : "transparent" : "transparent"}} >

    <div className={difficulty === "easy" ? classes.easy : difficulty === "medium" ? classes.medium : classes.hard}>{difficulty === "easy" ? "+ 200" : difficulty === "medium" ? "+ 300" : "+ 400" } </div>   
    <div className={classes.cell}>
    {components}</div>
    <div className={classes.subjectColor}> <div>
    { difficulty === "easy" ? <IoBookOutline/> : difficulty === "medium" ? <FaBookOpen/> : <FaBook/> }
    </div>  
    <div className={classes.lowLabel}>
    { difficulty === "easy" ? "Легко" : difficulty === "medium" ? "Средне" : "Тяжело" }
    </div>
    </div>
    </div>
};
export default OrdinaryComponent;
