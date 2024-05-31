import "./css/farmerRegistration.css";
import { useState, useEffect } from "react";
import {LoadingAnimation,LoadingAnimationCycle} from "./loding";
import { useActionData } from "react-router-dom";

import InputMask from 'react-input-mask';

const FarmerRegistrationForm = ({userData}) => {
  const [message,setMessage]=useState("")
  const [showSuccess, setShowSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfFarm,setnumberOfFarm]=useState(1)
  const [animationOFDataSending,setAnimationOFDataSending]=useState(false)
  const [numberOfLoop, setNumberOfLoop] = useState([]);
  const [dissableButton,changeDissableButton]=useState(false)
  const [regions, setRegions] = useState([]);
  const [villageData,setVillageData]=useState([])
  const [farmCode,setFarmCode]=useState("")
  const [selectedVilage,setSelectedVilage]=useState([])
  const [selectedRegion, setSelectedRegion] = useState('');
  const [organic, setOrganic] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard,setSelectedWard]=useState('')
  const [wards, setWards] = useState([]);
  const [formData, setFormData] = useState({
    userId:userData,
    firstName: "",
    middleName: "",
    lastName: "",
    organic:"",
    nationalIdentityNo: "",
    region: "",
    district: "",
    ward: "",
    village: "",
    farm: [{ index: null, farmName: "", farmSize: null }],
    cropDetails: [{ index: null, cropName: "", CropType: "", HavestApproximation: "", PlantingDate: "", gemSed: null,immatureVine:null,maturedVine :null}],
    chemicals: [{ index: null, chemical: ""}],
  });

  
useEffect(() => {
  fetchRegions();
}, []);

const fetchRegions = async () => {
  try {
      const response = await fetch("/region.php");
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRegions(data);
  } catch (error) {
      console.error('Error fetching regions:', error);
  }
};

const fetchData = async (url, setterFunction) => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setterFunction(data);
  } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
  }
};

const handleRegionChange = async (e) => {
  const region = e.target.value;
  setSelectedRegion(region);
  setFormData({...formData,region:region})
  if (region) {
      const districtUrl = `/location.php?region=${region}`;
      const [districtsData] = await Promise.all([
          fetchData(districtUrl, setDistricts)
      ]);

      // Optional: Clear wards and villages if necessary
      setWards([]);
      setVillageData([]);

      // Fetch wards and villages in parallel
      if (districtsData.length > 0) {
          const wardUrl = `/location.php?district=${districtsData[0].id}`;
          fetchData(wardUrl, setWards);
          // Fetch villages if necessary
      }
  }
};

const handleDistrictChange = async (e) => {
  const district = e.target.value;
  setSelectedDistrict(district);
  setFormData({...formData, district:district})
  if (district) {
      const wardUrl = `/location.php?district=${district}`;
      const [wardsData] = await Promise.all([
          fetchData(wardUrl, setWards)
      ]);

      // Optional: Clear villages if necessary
      setVillageData([]);

      // Fetch villages if necessary
      if (wardsData.length > 0) {
          const villageUrl = `/location.php?ward_id=${wardsData[0].id}`;
          fetchData(villageUrl, setVillageData);
      }
  }
};

const handleWardChange = async (e) => {
  const ward = e.target.value;
  setFormData({...formData, ward:ward})
  setSelectedWard(ward);
  if (ward) {
      const villageUrl = `/location.php?ward_id=${ward}`;
      fetchData(villageUrl, setVillageData);
  }
};

 




  

  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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


   const handleNumberOfFarmer = (e) => {
    setnumberOfFarm(parseInt(e.target.value));
  };

  const handlePreviousPage = () => {
    if(pageNumber>1){
      setPageNumber(pageNumber - 1);
      }
  };

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
      setFarmCode(responseData.code);
      setMessage(responseData.message);
      setShowSuccess(true);
      if(responseData.message==="successfully"){
        setFormData({
          userId:userData,
          firstName: "",
          middleName: "",
          lastName: "",
          organic:"",
          nationalIdentityNo: "",
          region: "",
          district: "",
          ward: "",
          village: "",
          farm: [{ index: null, farmName: "", farmSize: null }],
          cropDetails: [{ index: null, cropName: "", CropType: "", HavestApproximation: "", PlantingDate: "", gemSed: null,immatureVine:null,maturedVine :null}],
          chemicals: [{ index: null,chemical: ""}],
        });
        setSelectedRegion("")
        setSelectedDistrict("")
        setSelectedWard("")
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

  useEffect(() => {
   
    setNumberOfLoop(Array.from({ length: numberOfFarm }, () => ({})));
  }, [numberOfFarm]);


 


  const handleAnimationState = () => {
    setAnimate(!animate);
    handlePageNumber();
  };

  const handlePageNumber = () => {
    if(pageNumber<4){
    setPageNumber(pageNumber + 1);
    }
  };
  const deleteUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
        const response = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Beer": "token" // Assuming "Beer" is your authorization header
            },
            body: JSON.stringify({}) // Provide any necessary data for deleting the user
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        const data = await response.json();
        localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
        console.error("Error:", error.message);
        // Handle error gracefully, such as displaying an error message to the user
    }
};


  

  if (pageNumber === 1) {
    return (
      <div className="registrationBox">
        <div className="FarmerDatafieldArea">
             <div className="farmFirstTitle">FARMER DETAILS</div>
              <div className="farmerName">
                <div className="labelField ">
                <label className="childField">First name</label>
                </div>
               <div className="inputField ">
               <input type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData,firstName:e.target.value })}
                className="childField">
                  
                </input>
               </div>
              
              </div>
              <div className="farmerName">
                <div className="labelField">
                <label className=" childField">Middle name</label>
                </div>
              <div className="inputField ">
              <input type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => setFormData({...formData,middleName:e.target.value })}
                className="childField">
                  
                </input>
              </div>
              
              </div>
              <div className="farmerName">
                <div className="labelField">
                <label className=" childField">Last name</label>
                </div>
               <div className="inputField">
               <input type="text"
                 name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData,lastName:e.target.value })}
                className=" childField">
                  
                </input>
               </div>
               
              </div>
              <div className="farmerName">
                <div className="labelField">
                <label className=" childField">National Identity No</label>
                </div>
              <div className="inputField ">
              <input type="text"
                  name="nationalIdentityNo"
                  value={formData.nationalIdentityNo}
                  onChange={(e) => setFormData({...formData,nationalIdentityNo:e.target.value })}
                className=" childField">

                </input>
              </div>
             
              </div>
              <div className="farmerName">
               <div className=" labelField ">
                <label className="childField">organic</label></div> 
               <div className="inputField">
               <select className="labelField childField" value={formData.organic} onChange={(e) => setFormData({...formData,organic:e.target.value })}>
                        <option value=""></option>
                         <option value="yes">yes</option>
                         <option value="no">no</option>
                        
               </select>

               </div>
              </div>
              <div className="farmerName">
               <div className=" labelField ">
                <label className="childField">Select Region</label></div> 
               <div className="inputField">
               <select className="labelField childField" value={selectedRegion} onChange={handleRegionChange}>
                         <option value=""></option>
                         {regions.map(region => (
                      <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                        ))}
               </select>

               </div>
              </div>
              <div className="farmerName">
                <label className="labelField childField">Select District</label>

                <div>
                <select  className="inputField childField" value={selectedDistrict} onChange={handleDistrictChange}>
                   <option value=""></option>
                   {districts.map(district => (
                   <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                    ))}
      </select>
                </div>
              </div>
              <div className="farmerName">
                <label className="labelField childField">Select ward</label>
                <div>
                <select className="inputField childField"  value={selectedWard} onChange={handleWardChange}>
                    <option value=""></option>
                       {wards.map(ward => (
                       <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                        ))}
                    </select>
                </div>
               
              </div>
              <div className="farmerName">
                <label className="labelField childField" >Select village</label>
                <div className="inputField">
               <select className="labelField childField"
                 value={formData.village}
                 onChange={(e) => setFormData({...formData,village:e.target.value })}
               >
                         <option value=""></option>
                         {villageData.map(village => (
                      <option key={village.village_id} value={village.village_id}>{village.village_name }</option>
                        ))}
               </select>

               </div>
              </div>
        </div>
        <div className="footOfForm">
        <div>
        
           <div><button className="buttonForFieldArea" onClick={handleAnimationState}>NEXT</button></div>
         </div>
            
        </div>
      </div>
    );
  } else if (pageNumber === 2) {
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
            <button className="buttonForFieldArea" onClick={handlePreviousPage }>PREVIEW</button>
              <button className="buttonForFieldArea" onClick={handleAnimationState}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (pageNumber === 3) {
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
  } else if (pageNumber > 3){
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
   {farmCode && <div>code : {farmCode}</div>}
    
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

};

export default FarmerRegistrationForm;
