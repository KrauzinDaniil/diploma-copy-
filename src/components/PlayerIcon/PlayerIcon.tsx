import classes from './PlayerIcon.module.css'

const Icon: React.FC<{color:string, imageUrl: string}> = ({color, imageUrl}) =>  { 




return ( 
<div className={classes.triangle} style={{borderColor: color}}>
       <img src= {imageUrl} alt="" />                      
</div>
) 
}
export default Icon