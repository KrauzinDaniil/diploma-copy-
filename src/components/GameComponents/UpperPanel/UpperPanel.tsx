import DoubleThrow from './MainPlaceComponent/startingComponent'
import OrdinaryComponent from './OrdinaryComponent/OrdinaryComponent'
import classes from './UpperPanel.module.css'
import ChanceCard from './ChanceCard/ChanceCard'
import { userTableDisplay } from '../../../types/userTableType'
import RightThrow from "./MainPlaceComponentRight/startingComponent"
const UpperPanel: React.FC<{whichSide:boolean, player: userTableDisplay[], createPortal: () => void, personalData :userTableDisplay | null, onHover: boolean }> = ({whichSide, player, createPortal, onHover}) =>  { 

return ( 
<div className={classes.upperPanel}>
<DoubleThrow id =  {whichSide ? 11 : 21 } player={player}></DoubleThrow>
<OrdinaryComponent id =  {whichSide ? 10 : 22} player={player} createPortal = {createPortal} difficulty='easy' onHover ={onHover} ></OrdinaryComponent>
<ChanceCard id = {23} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 8 : 24 } player={player} createPortal = {createPortal} difficulty='easy' onHover ={onHover}></OrdinaryComponent>
<OrdinaryComponent id =  {whichSide ? 7 : 25 } player={player} createPortal = {createPortal} difficulty='medium' onHover ={onHover}></OrdinaryComponent>
<ChanceCard id = {6} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 5 : 27 } player={player} createPortal = {createPortal} difficulty='medium' onHover ={onHover}></OrdinaryComponent>
<OrdinaryComponent id =  {whichSide ? 4 : 28 } player={player} createPortal = {createPortal} difficulty='hard' onHover ={onHover}></OrdinaryComponent>
<ChanceCard id = {29} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 2 : 30 } player={player} createPortal = {createPortal} difficulty='hard' onHover ={onHover}></OrdinaryComponent>
<RightThrow id =  {whichSide ? 1 : 31 } player={player}></RightThrow>
</div>
) 
}
export default UpperPanel