import { Divide } from "lucide-react"
import { ExternalLink} from 'lucide-react';
import { useEffect,useState } from "react";
import "./css/animalInfo.css"

export const AnimalInfo=()=>{
 const [animalData,setAnimalData]=useState([])
 const [viewDetal,setViewDetail]=useState(false)
 const [animalsMoreDetail,setanimalsMoreDetail]=useState([])
    useEffect(() => {
        fetchRegions();
      }, []);
      
      const fetchRegions = async () => {
        try {
            const response = await fetch("/animal");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAnimalData(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
      };
      const handleAnimalsDetail= async  (data)=>{
        const animalOwnerid=data.animalowner_id
        console.log(animalOwnerid)
        console.log(data)
        const animalOwnerDetail={
          animaId:animalOwnerid,
          type:'animals',
        }


        try {
          const response = await fetch('/animal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalOwnerDetail)
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          setanimalsMoreDetail(responseData); // Response from backend
          setViewDetail(true)
        } catch (error) {
          console.error('Error posting data to backend:', error);
        }

      }
    if(!viewDetal){
    return(
       <div className="animanInfo">
        
        <div>
        <table className='mainTable'>
              <tr className="topuser">
                <td>animal owner</td>
                <td>animal number</td>
                <td>Name Of field officer</td>
                <td>view in detail</td>
                
              </tr>
              {animalData.map((data,index)=>(
              <tr key={index} className='lowUser'>
                  <td>{data.animal_owner_name}</td>
                  <td>{data.total_animals_owned}</td>
               
                <td>{data.field_officer_name}</td>
                <td>  
                <ExternalLink onClick={(e)=>handleAnimalsDetail(data)}/>
                </td>
                
             </tr>
              ))}
              </table>
        </div>
        </div>
    )
   }else{
    return(
        <div className="animanInfo">
    <table className='mainTable'>
    <tr className="topuser">
      <td>AnimalName</td>
      <td>animal number</td>
      <td>Time of reg</td>
      <td>organic</td>
      <td>officer comment</td>
      <td>type of bread</td>
    </tr>
    {animalsMoreDetail.map((data,index)=>(
    <tr key={index} className='lowUser'>
        <td>{data.animalName}</td>
        <td>{data.amount}</td>
     
      <td>{data.AnimalInsertDate}</td>

      <td>{data.organic}</td>
      <td>{data.comment}</td>
     
      <td>{data.typeOfBread}</td>
      
   </tr>
    ))}
    </table>
    </div>
    )

   }
}