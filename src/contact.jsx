import { MapPin } from 'lucide-react';
import { useEffect,useState } from 'react';
import "./css/contact.css"
import Bonus_slide from "./bonus/bonus"
export const Contact=()=>{
    const [validateUser, validateUserInput]=useState([])
    const handleLocation=()=>{
        console.log("location is clicked")
    }
    
    return (

<div className='contactMain'>
  <Bonus_slide/>
  <div className='contactSpecialTerm'>
    <div className='viewContact'>
  <div>WHATSSAPP</div>
  <div  className='viewContact'>
 </div>
 </div>
 <div className='viewContact'>
 <div >INSTAGRAM</div>
  <div  className='viewContact'>
 </div>
 </div>
 <div  className='viewContact'>
<div>LOCATION</div>
<div  className='viewContact'>
    <MapPin  onClick={handleLocation} size="80px"/>
 </div>
 </div>
 <div  className='viewContact'>
 <div>PHONE NUMBER</div>
  <div>0754565775</div>  
 </div>
 </div>

 
</div> 
    
    )
    
}