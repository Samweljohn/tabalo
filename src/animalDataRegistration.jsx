import "./css/animal_reg.css"
import { arrax } from "./contex";
import { useState,useEffect ,useContext} from "react";
import {LoadingAnimationCycle} from "./loding";
import InputMask from 'react-input-mask';
export const  AnimalDataReg=({userData})=>{
   const [message,setMessage]=useState("")
   const [code, setCode]=useState("")
  const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        AnimalOwner: "",
        typeOfBread: "",
        comment: "",
        AMountOfAnimal:"",
        Organic: "",
        AnimialName:"",
        animalType:"",
        userId:userData
      });
      const postDataToBackend = async (data) => {
        try {
          const response = await fetch('/regsterAnimal.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const responseData = await response.json();

        setMessage(responseData.message);
        setCode(responseData.code)
        // Handle the response data here
           console.log(responseData.message)
           setShowSuccess(true);
           setTimeout(() => setShowSuccess(false), 5000)
           if(responseData.message==="successfully"){
            setFormData({
              AnimalOwner: "",
              typeOfBread: "",
              comment: "",
              AMountOfAnimal:"",
              Organic: "",
              AnimialName:"",
              animalType:"",
              userId:userData
            });
           }

          console.log(responseData); // Response from backend
        } catch (error) {
          console.error('Error posting data to backend:', error);
        }
      };
    const handleSendingAnimalData=()=>{
        console.log("data is uploade")
        setAnimationOFDataSending(!animationOFDataSending)
    }
    const [animationOFDataSending,setAnimationOFDataSending]=useState(false)
    const handleSubmit=()=>{
        postDataToBackend(formData)
        handleSendingAnimalData()
        console.log(formData)
        console.log("user data is below")
        console.log(userData)
    }
return(
    <div className="animalREG">
    <div className="AnnouncementOfAnimalReg">FORM OF FILL ANIMAL INFO </div>
    <div  className="fieldBrock">
     <div><label>Animal Name</label></div>
     <div>
     <input  className="fieldAnimalInfo"
      value={formData.AnimialName}
      onChange={(e) => setFormData({...formData,AnimialName:e.target.value })}
     ></input>
     </div>
    
    </div>
  
    <div  className="fieldBrock">
      <div>
      <label>number of animals</label>
      </div>
    
      <InputMask  mask="999999999999" maskChar="" alwaysShowMask={true} 
      className="fieldAnimalInfo"
       value={formData.AMountOfAnimal}
       onChange={(e) => setFormData({...formData,AMountOfAnimal:e.target.value })}
   />
    </div>
    <div  className="fieldBrock">
      <div>
      <label>Animal owner name</label>
      </div>
     <input type="text"  className="fieldAnimalInfo"
       value={formData.AnimalOwner}
       onChange={(e) => setFormData({...formData,AnimalOwner:e.target.value })}
     ></input>
    </div>
    <div  className="fieldBrock">
      <div>
      <label>type of bread</label>
      </div>
    
     <input type="" className="fieldAnimalInfo"   
    
      value={formData.typeOfBread}
      onChange={(e) => setFormData({...formData,typeOfBread:e.target.value })}
     ></input>
    </div>


    <div  className="fieldBrock">
      <div>
      <label>Animal type</label>
      </div>
    
     <input type="" className="fieldAnimalInfo"   
    
      value={formData.animalType}
      onChange={(e) => setFormData({...formData,animalType:e.target.value })}
     ></input>
    </div>




    <div className="fieldBrock">
        <div>Organic</div>
     
            <select className="fieldAnimalInfo" value={formData.Organic} onChange={(e) => setFormData({...formData,Organic:e.target.value })}>
             <option value=""></option>
            <option value="yes">yes</option>
            <option value="no">no</option>
            </select>
           
    </div>
    <div  className="fieldBrock">
        <div className="fieldAnimalInfo">comment </div>
       <textarea className="commentArea"
        value={formData.comment}
        onChange={(e) => setFormData({...formData,comment:e.target.value })}></textarea>
    </div>
    <div>
    {showSuccess && <div className={`success-animation ${message==="successfully"?"successfull":"unsuccessfull"}`}>{message}</div>}
     <button className="buttonForFieldArea"   onClick={ handleSubmit}>UPLOAD</button>
     {code && <div className="code"> code  TB-{code}</div>}
    </div>
    
    </div>
)
}