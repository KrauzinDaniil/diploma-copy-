import classes from './startingComponent.module.css'  

import { userTableDisplay } from '../../../../types/userTableType';
import { useEffect, useState } from 'react';
import Icon from '../../../PlayerIcon/PlayerIcon';
import { IoReloadCircle } from "react-icons/io5";
const DoubleThrow: React.FC<{id:number, player: userTableDisplay[]}> = ({id, player}) =>  { 


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


  return(  

<div className={classes.square}>
<div className={classes.express}> Бросайте</div> 
    <div className={classes.expressIcon}> <IoReloadCircle style={{height:"100%", width:"100%", color:"yellow"}}/></div>
  
 <div className={classes.cell}>
 {components}
 </div>
 
 <div className={classes.textLabel}> заного </div> 
 </div>
  )


}
export default DoubleThrow; 

  