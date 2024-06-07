import classes from './startingComponent.module.css'  

import { userTableDisplay } from '../../../../types/userTableType';
import { useEffect, useState } from 'react';
import Icon from '../../../PlayerIcon/PlayerIcon';
import { TbPrison } from "react-icons/tb";
const RightThrow: React.FC<{id:number, player: userTableDisplay[]}> = ({id, player}) =>  { 


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
<div className={classes.express}> Тюрьма</div> 
    <div className={classes.expressIcon}> <TbPrison style={{height:"100%", width:"100%", color:"yellow"}}/></div>
  
 <div className={classes.cell}>
 {components}
 </div>
 
 
 </div>
  )


}
export default RightThrow; 

  