import classes from './Between.module.css'
import Component from './OrdinaryPlace/Component'
import ChanceCard from './ChanceCard/ChanceCard'
import RightComponent from './RightComponent/RightComponent'
import { userTableDisplay } from '../../../types/userTableType'
const Between: React.FC<{player : userTableDisplay[], createPortal: () => void, personalData: userTableDisplay | null, onHover:boolean}> = ({player, createPortal, personalData, onHover}) =>  { 
    return ( <div className={classes.mainWrappa}>
    <div className={classes.wrappLike}>
      <Component id = {20} player={player} createPortal ={createPortal} difficulty='hard' personalData = {personalData} onHover = {onHover}></Component>
      <RightComponent id = {32} player={player} createPortal ={createPortal} difficulty='easy'  personalData = {personalData} onHover = {onHover}></RightComponent>
    </div>
    <div className={classes.wrappLike}>
      <Component id = {19} player={player} createPortal ={createPortal} difficulty='hard' personalData = {personalData} onHover = {onHover}></Component>
      <RightComponent id = {33} player={player} createPortal ={createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></RightComponent>
    </div>
    <div className={classes.wrappLike}>
    <ChanceCard id = {18} player={player} createPortal ={createPortal} ></ChanceCard>
    <ChanceCard id = {34} player={player} createPortal ={createPortal} ></ChanceCard>
    </div>
    <div className={classes.wrappLike}>
      <Component id = {17} player={player} createPortal ={createPortal} difficulty='medium' personalData = {personalData} onHover = {onHover}></Component>
      <RightComponent id = {35} player={player} createPortal ={createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></RightComponent>
    </div>
    <div className={classes.wrappLike}>
      <ChanceCard id = {16} player={player} createPortal ={createPortal} ></ChanceCard>
      <ChanceCard id = {36} player={player} createPortal ={createPortal} ></ChanceCard>
    </div>
    <div className={classes.wrappLike}>
      <Component id = {15} player={player} createPortal ={createPortal} difficulty='medium' personalData = {personalData} onHover = {onHover}></Component>
      <ChanceCard id = {37} player={player} createPortal ={createPortal} ></ChanceCard>
    </div>
    <div className={classes.wrappLike}>
      <Component id = {14} player={player} createPortal ={createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></Component>
      <RightComponent id = {38} player={player} createPortal ={createPortal} difficulty='hard' personalData = {personalData} onHover = {onHover}></RightComponent>
    </div>
    <div className={classes.wrappLike}>
    <ChanceCard id = {13} player={player} createPortal ={createPortal}  ></ChanceCard>
    <ChanceCard id = {39} player={player} createPortal ={createPortal} ></ChanceCard>
    </div>
    <div className={classes.wrappLike}>
      <Component id = {12} player={player}createPortal ={createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></Component>
      <RightComponent id = {40} player={player}createPortal ={createPortal} difficulty='hard' personalData = {personalData} onHover = {onHover}></RightComponent>
    </div>
    </div>
    ) 
    }
    export default Between