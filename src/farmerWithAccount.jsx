import { useState ,useEffect} from "react";
import "./css/farmerWithAccount.css"
import InputMask from 'react-input-mask';


export const FarmerWithAccount=({userData})=>{
const [numberOfFarm,setnumberOfFarm]=useState(1)
const [showSuccess, setShowSuccess] = useState(false);
const [errorMessage,setErrorMessage]=useState("")
const [removerFarm,setRemoveFarm]=useState(null)
const [dataFromBckend,setDataForBackend]=useState([])
const [farmCode,setfarmCode]=useState("")
const [addfarm,changeFarmAMOUNT]=useState(null)
const [numberOfLoop, setNumberOfLoop] = useState([]);
const [requestCode,setrequestCode]=useState(true)
const [validFlag,setVaridFlag]=useState(false)
const [pageNumber, setPageNumber] = useState(1);
const [formData, setFormData] = useState({
    userId:userData,
    farm: [{ index: null, farmName: "", farmSize: null }],
    cropDetails: [{ index: null, cropName: "", CropType: "", HavestApproximation: "", PlantingDate: "", gemSed: null,immatureVine:null,maturedVine :null}],
    chemicals: [{ index: null, cropName: ""}],
  });

  const postDataToBackend = async (data) => {
    try {
      const response = await fetch('/regster.php', {
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
      console.log(responseData); // Response from backend
      setMessage(responseData.message);
      setShowSuccess(true);
      if(responseData.message==="successfully"){
        setFormData({
          farm: [{ index: null, farmName: "", farmSize: null }],
          cropDetails: [{ index: null, cropName: "", CropType: "", HavestApproximation: "", PlantingDate: "", gemSed: null,immatureVine:null,maturedVine :null}],
          chemicals: [{ index: null,chemical: ""}],
        });
       
      }
    } catch (error) {
      console.error('Error posting data to backend:', error);
    }
  };


  const handleSubmit = () => {
    setAnimationOFDataSending(!animationOFDataSending)
    postDataToBackend(formData)
    console.log("Form submitted with data:", formData);
  };



 
  const fetchFarms = async () => {
    if(validFlag){
  const code= validateAndExtractNumber(farmCode)

  console.log("code bellow extracted from cutting inpurt stream")
  console.log(code)
    try {
      const response = await fetch("/insertFarmData.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code, type: "code" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

         console.log(responseData)
         const [errorMessage,setErrorMessage]=useState("")
      console.log(formData)
    } catch (error) {
      console.error("Error posting data to backend:", error);
    }
  }else{
    setErrorMessage(validateAndExtractNumber(farmCode))
    console.log(errorMessage)

  };

  }



const handleAnimationState = () => {
  handlePageNumber();
};

 const handlePreviousPage = () => {
    if(pageNumber>1){
      setPageNumber(pageNumber - 1);
      }
  };
  const handlePageNumber = () => {
    if(pageNumber<3){
    setPageNumber(pageNumber + 1);
    }
  };
 



    useEffect(() => {
   
        setNumberOfLoop(Array.from({ length: numberOfFarm }, () => ({})));
      }, [numberOfFarm]);

  const handleFarmInputChange = (e, index) => {
    const { name, value } = e.target;
    const farms = [...formData.farm];
    farms[index] = { ...farms[index], [name]: value };
    setFormData((prevFormData) => ({
      ...prevFormData,
      farm: farms,
    }));
  };
  const handleCropDetailChange = (e, index) => {
    const { name, value } = e.target;
    const cropDetailsCopy = [...formData.cropDetails];
    cropDetailsCopy[index] = { ...cropDetailsCopy[index], [name]: value };
    setFormData((prevFormData) => ({
      ...prevFormData,
      cropDetails: cropDetailsCopy,
    }));
  };


  const handleChemicalChange = (e, index) => {
    const { value } = e.target;
  
    // Split the input string based on commas and trim each chemical name
    const chemicalsArray = value.split(',').map(chem => chem.trim());
    
    // Filter out any empty strings
    const filteredChemicalsArray = chemicalsArray.filter(chem => chem !== "");
  
    // Update the state with the modified chemicals array
    setFormData(prevFormData => ({
      ...prevFormData,
      chemicals: [
        ...prevFormData.chemicals.slice(0, index), // Keep previous chemicals before the index
        filteredChemicalsArray, // Replace the chemicals at the specified index with the modified array
        ...prevFormData.chemicals.slice(index + 1) // Keep previous chemicals after the index
      ]
    }));
  };

  function validateAndExtractNumber(inputString) {
    const pattern = /^(t|T)(b|B)\/(\d+)$/;
    if (!pattern.test(inputString)) {
        return "Input string does not match the required format (e.g., TB/1)";
    }
    const numberMatch = inputString.match(/\d+/);

    if (!numberMatch) {
        return "number input No ";
    }

    const extractedNumber = numberMatch[0];
    setVaridFlag(true)

    return extractedNumber;
}

    if(requestCode) {
    return(
        <div className="placeToEnterCode">
          <div className="codeBox">
          <div className="headofTable">FORM FOR FILL FARM INFO </div>
            <div>
                <div className="codeInputDescr">Enter Farmer code</div>
            <div>
              <input 
              value={farmCode}
             onChange={(e) => setfarmCode(e.target.value )}
            type="text" className="codeInputfield"
             placeholder="TB/01"></input></div>
             </div>
             <div><button className="buttonForCode" onClick={fetchFarms}> Submit</button></div>
             <div>{errorMessage}</div>

          </div>
            
        </div>
    )}else{
    if (pageNumber === 1) {
        return (
          <div className="registrationBox">
            <div className="NumberOfFarm"> <div><label className="pluss_Symbol">+</label>ADD NO OF FARM</div>
            <input type="number"
            className="numberFarm"
            value={numberOfFarm}
            onChange={(e)=>setnumberOfFarm(e.target.value)}
            onClick={(e)=>handleNumberOfFarmer(e)}
            ></input>
            <button className="buttonForFarmerNumber">Request</button>
            </div>
            {numberOfLoop.map((index, i) => (
              <div className="FarmerDatafieldArea" key={i}> 
                     <div className="dispaly_amount">FARM  NO {i+1} </div>
                     <div className="farmerName">
      <label className="childField labelField">Size of area(hecta)</label>
      <InputMask  mask="9999999999999" maskChar="" alwaysShowMask={true} 
                   
      
        name="farmSize"
        value={formData.farm[i]? formData.farm[i].farmSize : ""}
        onChange={(e) =>  handleFarmInputChange(e, i)   }
        className="inputField childField"
      />
    </div>
    <div className="farmerName ">
      <label className="childField labelField">Farm name(optional)</label>
      <input
        type="text"
        name="farmName"
        value={formData.farm[i]? formData.farm[i].farmName : ""}
        onChange={(e) => handleFarmInputChange(e, i)}
        className="inputField childField"
      />
    </div>
    
     </div>
    
               
            ))}
            <div className="footOfForm">
              <div>
                
                <div>
                  <button className="buttonForFieldArea" onClick={handleAnimationState}>NEXT</button>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (pageNumber === 2) {
        return (
        <div className="registrationBox">
        {numberOfLoop.map((index, i) => (
          <div className="FarmerDatafieldArea" key={i}> 
                 <div className="dispaly_amount">CROP DETAIL FOR FARM  NO {i+1} </div>
                 <div className="farmerName">
                    <label className="childField labelField">Name of crop</label>
                    <input type="text" 
                     name="cropName"
                     value={formData.cropDetails[i]? formData.cropDetails[i].cropName: ""}
                     onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"></input>
                  </div>
                 <div className="farmerName">
                    <label className="childField labelField">Type of crop</label>
                    <input type="text"
                                  name="CropType"
                                  value={formData.cropDetails[i]? formData.cropDetails[i].CropType : ""}
                                  onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"></input>
                  </div>
                  <div className="farmerName">
                    <label className="childField labelField">Yield estimate</label>
                    <InputMask  mask="999999999999" maskChar="" alwaysShowMask={true} 
                       name="HavestApproximation"
                         value={formData.cropDetails[i]? formData.cropDetails[i].HavestApproximation: ""}
                         onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"
        />
                  </div>
                  <div className="farmerName">
                    <label className="childField labelField">planting date</label>
                    <input type="date"
                       name="PlantingDate"
                       value={formData.cropDetails[i]? formData.cropDetails[i].PlantingDate: ""}
                       onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"></input>
                  </div>
                  <div className="farmerName">
                    <label className="childField labelField">Number of vines</label>
                    <InputMask  mask="9999999999" maskChar="" alwaysShowMask={true} 
                   
                                    name="gemSed"
                                    value={formData.cropDetails[i]? formData.cropDetails[i].gemSed: ""}
                                    onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"
                    />
                  </div>
    
    
                  <div className="farmerName">
                    <label className="childField labelField">Number of mature vines</label>
                    <InputMask  mask="9999999999" maskChar="" alwaysShowMask={true} 
                   
                                    name="maturedVine"
                                    value={formData.cropDetails[i]? formData.cropDetails[i].maturedVine: ""}
                                    onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"
                    />
                  </div>
    
                  <div className="farmerName">
                    <label className="childField labelField">Number of immature vines</label>
                    <InputMask  mask="9999999999" maskChar="" alwaysShowMask={true} 
                   
                                    name="immatureVine"
                                    value={formData.cropDetails[i]? formData.cropDetails[i].immatureVine: ""}
                                    onChange={(e) => handleCropDetailChange(e, i)}
                    className="inputField childField"
                    />
                  </div>
    
                 </div>
          ))}
          <div className="footOfForm">
          <div>
            
            <div>
            <button className="buttonForFieldArea" onClick={handlePreviousPage }>PREVIEW</button>
              <button className="buttonForFieldArea" onClick={handleAnimationState}>NEXT</button>
            </div>
          </div>
        </div>
      </div>  
        )  
      } else {
        return(
          <div className="registrationBox">
          {numberOfLoop.map((index, i) => (
            <div className="FarmerDatafieldArea" key={i}> 
                   <div className="dispaly_amount">CHEMICAL USED IN FARM NO {i+1} </div>
                    <div className="farmerName">
                      <label className="childField labelField">chemical used</label>
                        <input type="text"
                        className="childField"
                        value={formData.chemicals[i] ? formData.chemicals[i].chemical: ""}
                         onChange={(e) => handleChemicalChange(e, i)}
                       />
                    </div>
                    <div className="chemicalHint">Remember to put comma ","<br></br> to separate chemicals </div>
                   </div>
     
     ))}
     <div className="footOfForm">
       <div>
        
         <div>
         {showSuccess && <div className={`success-animation ${message==="successfully"?"successfull":"unsuccessfull"}`}>{message}</div>}
         <button className="buttonForFieldArea"   onClick={handlePreviousPage}>PREVIEW</button>
           <button className="buttonForFieldArea" onClick={handleSubmit}>Upload</button>
         </div>
       </div>
     </div>
    </div>
    )
    }
  }
}