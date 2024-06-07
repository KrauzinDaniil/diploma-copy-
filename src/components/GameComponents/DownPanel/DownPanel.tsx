import DoubleThrow from './MainPlaceComponent/startingComponent'
import OrdinaryComponent from './OrdinaryComponent/OrdinaryComponent'
import classes from './DownPanel.module.css'
import ChanceCard from './ChanceCard/ChanceCard'
import BeginningComponents from './BeginningComponent/BeginningComponents'
import { userTableDisplay } from '../../../types/userTableType'
const DownPanel: React.FC<{whichSide:boolean, player: userTableDisplay[], createPortal: () => void, personalData: userTableDisplay | null, onHover: boolean }> = ({whichSide, player, createPortal, personalData, onHover}) =>  { 

return ( 
<div className={classes.upperPanel}>
<DoubleThrow id =  {whichSide ? 11 : 21 } player={player} ></DoubleThrow>
<OrdinaryComponent id =  {whichSide ? 10 : 22} player={player} createPortal = {createPortal} difficulty='hard' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<OrdinaryComponent id =  {whichSide ? 9 : 23 } player={player} createPortal = {createPortal} difficulty='medium' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<ChanceCard id = {8} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 7 : 25 } player={player} createPortal = {createPortal} difficulty='medium' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<ChanceCard id = {6} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 5 : 27 } player={player} createPortal = {createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<OrdinaryComponent id =  {whichSide ? 4 : 28 } player={player} createPortal = {createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<ChanceCard id = {3} player={player} createPortal ={createPortal} ></ChanceCard>
<OrdinaryComponent id =  {whichSide ? 2 : 30 } player={player} createPortal = {createPortal} difficulty='easy' personalData = {personalData} onHover = {onHover}></OrdinaryComponent>
<BeginningComponents id =  {whichSide ? 1 : 31 } player={player} ></BeginningComponents>
</div>
) 
}
export default DownPanel