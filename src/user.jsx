import { Trash2 ,FilePenLine, Beer} from 'lucide-react';
import "./css/user.css"
import React, { useState,useEffect } from 'react';
export const SystemUser=()=>{
    const[editedT, setEditorData]=useState([])
    const [user_id,setUserId]=useState("")
    const [deleteId,setDeleteId]=useState(null)
    const [showAlert, setShowAlert] = useState(false);
    const [userEdityMessage,setMessageForEdity]=useState("")
    const [userInfo,setUserInfo]=useState([])
   const [password,setPassword]=useState("")
    const [NewDataInfo,setNewDataInfo]=useState([])
    const [edityFlag, changeEdityFlag]=useState(false)

    const [message,setMessage]=useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const HandleedityUserInfo=(data)=>{
        console.log(data)
        setEditorData(data)
        setUserId(data.user_id)
        console.log(editedT)
        changeEdityFlag(!edityFlag)

    }
    const handleDeleteAction=(data)=>{
        setShowAlert(true);
        setDeleteId(data)
    }
    const  handleAccept=()=>{
        const data = new FormData();
        data.append('type', 'delete');
        data.append('userIdDeleteId', deleteId);
        
        const requestOptions = {
          method: 'POST',
          body: data
        };
        
        fetch('/useManagement.php', requestOptions)
          .then(response => response.json())
          .then(data => {
            setMessage(data.message)
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000)
            // Handle the response data here
          })
          .catch(error => {
            console.error('Error:', error);
          });
          setShowAlert(false);
    }
    
    const handleReject = () => {
          setShowAlert(false);
    };





    const handleSubmiteOfEdityData= async (e) => {
        console.log(editedT)

        const data = new FormData();
        
        for (const key in editedT) {
                data.append(key, editedT[key]);
              }
              data.append('type', 'updateProductInfo');
            
              const requestOptions = {
                method: 'POST',
                body: data
            };
        
            try {
                const response = await fetch('/useManagement.php', requestOptions);
                console.log(response); // Log the response before parsing JSON
                const body = await response.json();
                setMessageForEdity(body.message)
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000)
                
                 // Log the response body
                // Handle successful response here (e.g., redirect to another page)
            } catch (error) {
                console.error('Error:', error);
                // Display a user-friendly error message
            }
        
        
        }



     
    const HandleUpdatePassword=()=>{
        

    const data = new FormData();
    data.append('type', 'EdityPassword');
    data.append("password", password);
    data.append("user_id", user_id);
    const requestOptions = {
      method: "POST",
      body: data,
    };

    try {
    
     
      fetch('/useManagement.php', requestOptions)
      .then((response) => response.json())

      .then((data) =>{
        
      setMessage(data.message)
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000)
      // Handle the response data here
    }) 
      .catch((error) => console.error("Error fetching category data:", error));
     
      // Log the response body
      // Handle successful response here (e.g., redirect to another page)
    } catch (error) {
      console.error("Error:", error);
      // Display a user-friendly error message
    
    }

    fetch('/user.php', requestOptions)
    .then(response => response.json())
    .then(data => {
       
      setMessage(data.message)
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000)
      // Handle the response data here
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setShowAlert(false);

    }
    
    useEffect(() => {
        fetch("/user.php")
        .then(response => response.json())
        .then(data => {
            setUserInfo(data);
          console.log(data)
        })
        }, [])
    const deleteUser = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(e.target.value)
        
        try {
            const response = await fetch("/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Beer": token // Assuming "Beer" is your authorization header
                },
                body: JSON.stringify({}) // Provide any necessary data for deleting the user
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
    
            const data = await response.json();
        } catch (error) {
            console.error("Error:", error.message);
           
        }
    };
    if(!edityFlag){
    return(
        <div className='userDetail'>

      <table className='mainTable'>
        <tr className="topuser">
            <td>image</td>
            <td>username</td>
            <td>Real name</td>
            <td>role</td>
            <td>status</td>
            <td>action</td>

        </tr>
        {userInfo.map((data ,index)=>(
            <tr key={index} className='lowUser'>
                <td><img src={`../picture/${data.image}`} className='magel' /></td>
                <td>{data.userNameForSy}</td>
                <td>{`${data.first_name} ${data.last_name}`}</td>
                <td>{ data.rolebased}</td>
                <td>{data.status==1?"active":"inactive"}</td> 
                <td><Trash2  onClick={()=>handleDeleteAction(data.user_id)}/>
                   <FilePenLine onClick={()=>HandleedityUserInfo(data)}/>
      </td>
            </tr>
            )

          )}
      </table>
      {showSuccess && <div className={`success-animation ${message==="successfully"?"successfull":"unsuccessfull"}`}>{message}</div>}
      <div className={showAlert ? "showAlert" : "hideAlert"}>
  <p>Are you sure you want to delete user?</p>
  <button onClick={handleAccept} className='buttonYes'>Yes</button>
  <button onClick={handleReject}>No</button>
</div>

        </div>
   
    )
}else{
    return(
       <div className='resertForm'>
        <div className='passwordFormat'>
         <div className='headerForPasswordResert'>RESERT USER PASSWORD</div>
         <div>
            <div>user name</div>
            <div className='userName_edity'>{editedT.userNameForSy}</div>
         </div>
         <div>
             <div>enter password </div>
             <div><input type='text' className='edityInput'/></div>
         </div>
         {showSuccess && <div className={`success-animation ${message==="successfully"?"successfull":"unsuccessfull"}`}>{message}</div>}
         <div><button onClick={HandleUpdatePassword} className='buttonForEdity'>Submite</button></div>
        </div>



        <div className='EdityUserInfo'>
            <div className='userInfo'>Edity User Info</div>
            <div>
                <div>user name</div>
                <div>
                    <input
                     onChange={(e)=>setEditorData({...editedT,userNameForSy:e.target.value})}
                    value={editedT.userNameForSy}
                    type='text' className='edityInput'/>
               </div>
              </div> 
            <div>
                <div>first name</div>
                <div><input type="text" 
                value={editedT.first_name}
                onChange={(e)=>setEditorData({...editedT,first_name:e.target.value})}
                className='edityInput'/></div>
            </div>
            <div>
                <div>last name</div>
                <input 
                 value={editedT.last_name}
                 onChange={(e)=>setEditorData({...editedT,last_name:e.target.value})}
                type='text' 
                className='edityInput'/> 
            </div>
            <div>
                <div>role</div>
                <div>
                    <select
                     value={editedT.rolebased}
                     onChange={(e)=>setEditorData({...editedT,rolebased:e.target.value})}
                    className='edityInput'>
                        <option></option>
                        <option value="admin">admin</option>
                        <option value="field_officer"> field officer</option>
                    </select>
                </div>
            </div>
            <div>
                <div>Email</div>

                <div><input
                  value={editedT.email}
                  onChange={(e)=>setEditorData({...editedT,email:e.target.value})}
                 type='email'
                  className='edityInput'/></div>
            </div>
            {showSuccess && <div className={`success-animation ${userEdityMessage==="successfully"?"successfull":"unsuccessfull"}`}>{userEdityMessage}</div>}
            <div><button onClick={handleSubmiteOfEdityData} className='buttonForEdity' >Submite</button></div>
        </div>
        </div>
     )
}
}