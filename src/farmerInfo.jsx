import "./css/farmerInfo.css"
import InputMask from 'react-input-mask';
import { ExternalLink } from 'lucide-react';
import { X , MoveLeft} from 'lucide-react'; 
import { Line ,Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useState,useEffect } from "react";
import { Search } from 'lucide-react';
import React from "react";


export default function FarmerInfo({tk}){
  console.log("token for protext api")
  console.log(tk)

 
  const [search, changeSearch]=useState("");

  const [nameOfFieldOfficer,setNameOfFieldOfficer]=useState("")
  const [flaggForViewFieldOfficerData,changeFlage]=useState(false)
  const [intervalDataFormat,arrengleIntervalFormat]=useState({
                                                    interval:"MONTH",
                                                    intervalAmmount:1
                                                 })
  const [result, setSearchResults] = useState([]);



const [mostChemical,setMostChemical]=useState("")
const [leastChemical,setLeastChemical]=useState("")
const [registeredFarmer,setRegistedFa]=useState("")
const [totalFieldOfficer,setTotalFieldOfficer]=useState("")
const [mostPlantedPlant,setMostPlantedPlant]=useState("")
const [leastPlantedPlant,setleastPlantedPlant]=useState("")
const [fieldOfficerWithHighNoFarmer,setfieldOfficerWithHighNoFarmer]=useState([])
const [fieldOfficerWithLowerNoFarmer,setfieldOfficerWithLowerNoFarmer]=useState([])
const [farmerREgisteredSpecificPerFIELDOFFICER,setfarmerREgisteredSpecificPerFIELDOFFICER]=useState([])
const [fieldOfficerWithCountFarmer,setfieldOfficerWithCountNumberFarmer]=useState([])
const [farmerListWithHighAmountOfFarmer, setfarmerListWithHighAmountOfFarmer]=useState([])

farmerListWithHighAmountOfFarmer

useEffect(() => {

  HandleChangeTimeinterval()
  handleSecondApi()
 
}, []);
  const handleAmountChange = (e) => {
    // Update amount state with the new value
   
  };
const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
   
  };




const handleSecondApi=()=>{
  
}
const HandleChangeTimeinterval=()=>{

  console.log("here is data ...................." )
  console.log(intervalDataFormat)

  const data_registeredFarmer={
    intervalValue:intervalDataFormat,
    type:'data_registeredFarmer',
  } 
  const sendChemicalDataForMostusedChemical={
    intervalValue:intervalDataFormat,
    type:'chemicalMostUsed',
  }
  const getOfficerWithCountFarmer={
    intervalValue:intervalDataFormat,
    type:'officerwithCountFarmer',
  }
  const sendChemicalDataForLeastusedChemical={
    intervalValue:intervalDataFormat,
    type:'LeastChemicalUsed',
    tk:tk
  }
  const data_mostPlantedPlant={
    intervalValue:intervalDataFormat,
    type:'MostPlantedPlan',
    tk:tk
  }
  const data_leastPlantedPlant={
    intervalValue:intervalDataFormat,
    type:'leastPlanted',
    tk:tk
  }
  const data_fieldOfficerWithHighNoFarmer={
    intervalValue:intervalDataFormat,
    type:'FieldOfficerWithMostFarmers',
    tk:tk
  }
  const dataForTopFiveFarmerWithManyFarm={
    intervalValue:intervalDataFormat,
    type:'topFiveFarmer',
    tk:tk
  }
  const data_for_totalFieldOfficer={
    intervalValue:intervalDataFormat,
    type:'data_for_totalFieldOfficer',
    tk:tk
  }
  const data_fieldOfficerWithLowerNoFarmer={
    intervalValue:intervalDataFormat,
    type:'FieldOfficerWithLeastFarmers',
    tk:tk
  }
  postDataLeastChemical(sendChemicalDataForLeastusedChemical)
  postDataMostChemical(sendChemicalDataForMostusedChemical)
  postData_mostPlantedPlan(data_mostPlantedPlant)
  postData_leastPlantedPlant(data_leastPlantedPlant)
  postData_fieldOfficerWithHighNoFarmer(data_fieldOfficerWithHighNoFarmer)
  postData_fieldOfficerWithLowerNoFarmermer(data_fieldOfficerWithLowerNoFarmer)
  postData_registeredFarmer(data_registeredFarmer)
  postData_For_tatalfieldOfficer(data_for_totalFieldOfficer)
  postOfficerWithCountFarmer(getOfficerWithCountFarmer)
  postDataForTopFiveFarmerWithManyFarm(dataForTopFiveFarmerWithManyFarm)




  }




 




const postData_registeredFarmer = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
     setRegistedFa(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};


const postDataMostChemical = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setMostChemical(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};








const postOfficerWithCountFarmer = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setfieldOfficerWithCountNumberFarmer(responseData); // Response from backend
    console.log("data for test")
    console.log(responseData)
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};



const postDataLeastChemical = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setLeastChemical(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};



const postData_mostPlantedPlan = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setMostPlantedPlant(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};

const postData_leastPlantedPlant = async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setleastPlantedPlant(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};

const postData_fieldOfficerWithHighNoFarmer= async (data) => {
  try {
    const response = await fetch('/fieldofficer.php', {
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
    console.log("data pre")
    console.log(responseData)
    
    setfieldOfficerWithHighNoFarmer(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};


const postData_fieldOfficerWithLowerNoFarmermer= async (data) => {
  try {
    const response = await fetch('/fieldofficer.php', {
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
   
    setfieldOfficerWithLowerNoFarmer(responseData)// setfieldOfficerWithLowerNoFarmer(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};

const postData_For_tatalfieldOfficer= async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    setTotalFieldOfficer(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};




const postData_farmerREgisteredSpecificPerFIELDOFFICER= async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    
    setfarmerREgisteredSpecificPerFIELDOFFICER(responseData)
    console.log(farmerREgisteredSpecificPerFIELDOFFICER)
    if(farmerREgisteredSpecificPerFIELDOFFICER){
      HandleChangeFrag()
    }
    
   
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};
const [data_farmerREgisteredSpecificPerFIELDOFFICER, setdata_farmerREgisteredSpecificPerFIELDOFFICER]=useState({
  intervalValue:intervalDataFormat,
  type:'fildOfficerMoreInfo',
  officer_Id:"",
  tk:tk
})

const postDataForTopFiveFarmerWithManyFarm= async (data) => {
  try {
    const response = await fetch('/anaysis.php', {
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
    console.log("here is field officer with high number of farmer")
    console.log(responseData )
    setfarmerListWithHighAmountOfFarmer(responseData); // Response from backend
  } catch (error) {
    console.error('Error posting data to backend:', error);
  }
};

  const HandleExpandData_fieldOfficer_farmer=(data)=>{
    setNameOfFieldOfficer(data.name)
    setdata_farmerREgisteredSpecificPerFIELDOFFICER({...data_farmerREgisteredSpecificPerFIELDOFFICER,officer_Id:data.id})
    console.log(data_farmerREgisteredSpecificPerFIELDOFFICER)
    postData_farmerREgisteredSpecificPerFIELDOFFICER(data_farmerREgisteredSpecificPerFIELDOFFICER)

  }
  useEffect(() => {
      
    // Ensure arrays is available before filtering
    if (fieldOfficerWithCountFarmer) {
      const filteredResults = fieldOfficerWithCountFarmer.filter(tafuta =>
        tafuta.name.toLowerCase().includes(search.toLowerCase())
      );
     
      setSearchResults(filteredResults);
    }
  }, [search,fieldOfficerWithCountFarmer]);


  const HandleChangeFrag=()=>{
   for (const data of farmerREgisteredSpecificPerFIELDOFFICER) {
  if (data.farmer_id) {
    changeFlage(true); // Change flag if firstName exists
    break; // Exit the loop
  }
}

  }


  const dataa = {
    labels: farmerListWithHighAmountOfFarmer.map(dataPoint => dataPoint.farmer_name),
    datasets: [
      {
        label: 'farm number',
        data: farmerListWithHighAmountOfFarmer.map(dataPoint => dataPoint.num_farms),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 1)',
      
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Use linear scale for numerical data
        ticks: {
          beginAtZero: true,
          fontSize: 25,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'TOP 5 LIST  OF FARMER WITH HIGH NUMBER OF FARMS',
        fontSize: 26, // Adjust the font size as needed
      },
    },
  };


 if(!flaggForViewFieldOfficerData){
    return(
       <div className="farmerInfo">

           <div className="tiemFilter">
              <div className="filterHeader">FILTER DATA ACCORDING TO TIME</div>
              <div className="filterDataSecondPotion">
                <div >
                  <select className="selectionperiod"
                  value={intervalDataFormat.interval}
                  onChange={(e) => arrengleIntervalFormat({...intervalDataFormat,interval:e.target.value })} >
                    <option value="MONTH">month</option>
                    <option value="WEEK">week</option>
                    <option value="DAY">day</option>
                    <option value="YEAR">year</option>
                  </select>
      
                </div>
                <div>
<input 
  type="number" 
  className="itermInFilter" 
 value={intervalDataFormat.intervalAmmount} 
 onChange={(e) => arrengleIntervalFormat({...intervalDataFormat,intervalAmmount:e.target.value })}
 
/>


                {/* <input type="number" className="itermInFilter" value={amount} onChange={(e)=>setAmount(e.target.value)}/> */}
                </div>
              <div>
                 <button onClick={HandleChangeTimeinterval} className="itermInFilter">submit</button>
              </div>
               </div>
         
             </div>
             
            <div className="importantDataForSystemANalize">
                   <div className="totalNumberOfFarmer boxForGeneralInfo">
                     <div>TOTAL NUMBER OF <br></br> FARMER REGISTERED</div>
                    <div className="stasticValue">{registeredFarmer.message}</div> 
                   </div>
                   <div className="field_officer  boxForGeneralInfo ">
                     <div>
                     TOTAL NUMBER OF<br></br> 
                     FIELD OFFICER
                     </div>
                      <div className="stasticValue">{totalFieldOfficer.message}</div> 
                     </div>
                   <div className="field_officer_withHighNoF  boxForGeneralInfo ">
                     <div>
                  <div>
                   FIELD OFFICER WICH 
                  REGISTER HIGH NUMBER
                  OF FARMER
                  </div>
                  </div>
                  {fieldOfficerWithHighNoFarmer.map((data ,index)=>(
                     <React.Fragment key={index} >

                     <div className="stasticValue">TOTAL : {data.num_farmers} </div>
                     <div className="officerName">officer name :{data.field_officer_name}</div>
                       </React.Fragment>

                  ))
                   
                  
                  }

                 </div>
                <div className="field_officer_withlowNoF  boxForGeneralInfo">
                   <div>
                   FIELD OFFICER WICH 
                  REGISTER LOW NUMBER
                  OF FARMER
                  </div>



                  {fieldOfficerWithLowerNoFarmer.map((data ,index)=>(
                     <React.Fragment key={index} >

                     <div className="stasticValue">TOTAL : {data.num_farmers} </div>
                     <div className="officerName">officer name : {data.field_officer_name}</div>
                       </React.Fragment>

                  ))
                   
                  
                  }

                </div>
                   

                <div className="mostUsedChemical  boxForGeneralInfo ">
                  <div>
                  MOST USED CHEMICAL
                  </div>
                  <div className="stasticValue">{mostChemical.message}</div>
                  </div>
                  <div className="leastUsedChemical  boxForGeneralInfo ">
                  <div>
                  LEAST USED CHEMICAL
                  </div>
                  <div className="stasticValue">{leastChemical.message}</div>
                  </div>

                  <div className="mostPlantedPlant  boxForGeneralInfo ">
                  <div>
                  MOST PLANTED PLANT
                  </div>
                  <div className="stasticValue">{mostPlantedPlant.message}</div>
                  </div>
                  <div className="leastPlantedPlant  boxForGeneralInfo ">
                  <div>
                  LEAST PLANTED PLANT
                  </div>
                  <div className="stasticValue">{leastPlantedPlant.message}</div>
                  </div>
            </div>
            <div className="graphs">
            {/* <Bar data={chartData} options={chartOptions}/> */}
            <Bar data={dataa} options={options} />

            </div>
            <div className="officer_InfoDiscription">
                <div className="searchFieldOfficer"> <Search color="blue" />
               <input className="seachActureBar"
                onChange={(e) =>changeSearch(e.target.value)}
               type="text" placeholder="search for field officer"/>
               <X color="blue"/>
                </div>
                <div className="wrappdataTableForFieldInfo">
                <div className="dataTableForFieldInfo">
                     <div className="fieldOffNameH headTableFarmer">Name field Officer</div>
                     <div className="AmmountOfFarmerH headTableFarmer">Ammount of Farmer</div>
                     <div className="excellOpenerH headTableFarmer">Open excell</div>
                     {result.map((data, index)=>(
                       <React.Fragment key={data.id}>
                           
                        <div className="fieldOffName insideTableFarmer">{data.name}</div>
                        <div className="AmmountOfFarmer insideTableFarmer">{data.num_farmers}</div>
                        <div className="excellOpenerH insideTableFarmer"><ExternalLink onClick={(e)=>HandleExpandData_fieldOfficer_farmer(data)}/></div>
                            
                        </React.Fragment>
                            
                        )
                        )}
                </div>
                </div>
            </div> 
            </div>
 
    )}else{
  return(
    <div className="fieldOfficerWithFarmerMoreInfo">
      <div>
        <div><MoveLeft onClick={HandleChangeFrag}/></div>
        <div>
        <div>Name of field Officer</div>
        <div>{nameOfFieldOfficer}</div>
      </div>
      <div>TABLE FOR  SHOW  DETAILS OF  EACH FARMER</div>
      </div>
      <div className="realData">
        <table className='mainTable'>
          <tr className="topuser">
            <td>first Name</td>
            <td>second name</td>
            <td>Last Name</td>
            <td>region</td>
            <td>district</td>
            <td>ward</td>
            <td>village</td>
            <td>total farms</td>
          </tr>
          {farmerREgisteredSpecificPerFIELDOFFICER.map((data,index)=>(
          <tr key={index} className='lowUser'>
              <td>{data.first_name}</td>
              <td>{data.second_name}</td>
            <td>{data.last_name}</td>
            <td>{data.region}</td>
            <td>{data.district}</td>
            <td>{data.ward}</td>
            <td>{data.village}</td>
            <td>{data.total_farms}</td>
         </tr>
          ))}
              

             
        </table>
      </div>
         </div>

       
      )
    }
}
