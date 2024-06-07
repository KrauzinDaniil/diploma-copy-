import classes from './startingComponent.module.css'  
import { userTableDisplay } from '../../../../types/userTableType';
import { useEffect, useState } from 'react';
import Icon from '../../../PlayerIcon/PlayerIcon';
import { SiStackblitz } from "react-icons/si";
const DoubleThrow: React.FC<{id:number, player: userTableDisplay[] }> = ({id, player}) =>  { 
  
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
  
  
  
  return  <div className={classes.square}>
    <div className={classes.expressIcon}><SiStackblitz style={{color:"yellow"}}/></div>
  <div className={classes.express}> Блиц</div> 
 <div className={classes.cell}>
 {components}
 </div>
 
 <div className={classes.textLabel}> 3 вопроса</div> 
 </div>
  


}
export default DoubleThrow; 

  