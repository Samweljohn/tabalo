import React, { useState } from "react";
import ImageUploder from "./imageUpload";
import InputMask from 'react-input-mask';
import "./css/adduser.css"
import "./css/imageUpload.css"

export const Adduser = () => {
    const [resetImage, setResetImage] = useState(false);
    const [message,setMessage]=useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [userRegInfo, setUserRegInfo] = useState({
        password: "",
        image: null,
        email: "",
        role: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        username: "",
        status: "",
        national_id: ""
    });

    const [passwordError, setPasswordError] = useState(false);

    const handleImageChange= (image) => {
        setUserRegInfo({ ...userRegInfo, image: image}); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserRegInfo({ ...userRegInfo, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const confirmPassword = userRegInfo.confirmPassword;
        setPasswordError(password !== confirmPassword);
        setUserRegInfo({ ...userRegInfo, password: password });
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        const password = userRegInfo.password;
        setPasswordError(password !== confirmPassword);
        setUserRegInfo({ ...userRegInfo, confirmPassword: confirmPassword });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       console.log(userRegInfo)
    const dataInsertForm = new FormData();
    for (const key in userRegInfo) {
      dataInsertForm.append(key, userRegInfo[key]);
    }
    dataInsertForm.append('type', 'insertUser');
    const requestOptions = {
      method: 'POST',
      body:dataInsertForm
    };


    
    fetch('/useManagement.php', requestOptions)
      .then(response => response.json())
      .then(data => {
    
        setMessage(data.message);
     // Handle the response data here
        console.log(data.message)
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000)

        // setUserRegInfo({
        //     name: "",
        //     password: "",
        //     image: null,
        //     email: "",
        //     role: "",
        //     phone_number: "",
        //     first_name: "",
        //     last_name: "",
        //     username: "",
        //     status: "",
        //     national_id: ""
        // });
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
      

       
       
       
       
       
       
       
       
       
       
    };

    return (
        <div className="formForRegisterUser">
          
            <form onSubmit={handleSubmit} className="actualForm">
               <div className="FormTitle">FORM OF REGISTER USER</div>
                <div>
                    <div>Add user profile</div>
                    <div className="ProfileImage"><ImageUploder onImageChange={handleImageChange}  resetImage={resetImage} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>Email</div>
                    <div>
                        <input
                        className="inputside"
                        type="email" name="email" value={userRegInfo.email} onChange={handleInputChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>User name</div>
                    <div>
                        <input 
                        className="inputside"
                        type="text" name="username" value={userRegInfo.username} onChange={handleInputChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>First name</div>
                    <div>
                        <input 
                        className="inputside"
                        type="text" name="first_name" value={userRegInfo.first_name} onChange={handleInputChange} /></div>
                </div>

                <div className="userFieldDetail">
                    <div>Last name</div>
                    <div>
                        <input 
                        className="inputside"
                        type="text" name="last_name" value={userRegInfo.last_name} onChange={handleInputChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>Phone number</div>
                    <div>
                 <InputMask 
                    className="inputside"
                    mask="9999999999999" maskChar="" alwaysShowMask={true} name="phone_number" value={userRegInfo.phone_number} onChange={handleInputChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>National ID (NIDA)</div>
                    <div>
                        <input
                        className="inputside"
                        type="text" name="national_id" value={userRegInfo.national_id} onChange={handleInputChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>Role</div>
                    <div>
                        <select
                        className="inputside"
                        name="role" value={userRegInfo.role} onChange={handleInputChange}>
                            <option value="admin">admin</option>
                            <option value="field_officer"> field officer</option>
                        </select>
                    </div>
                </div>
                <div className="userFieldDetail">
                    <div>Status (optional)</div>
                    <div>
                        <select
                         name="status"
                         className="inputside"
                        value={userRegInfo.status} onChange={handleInputChange}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="userFieldDetail">
                    <div>Password</div>
                    <div>
                        <input 
                    className="inputside"
                    type="password" name="password" value={userRegInfo.password} onChange={handlePasswordChange} /></div>
                </div>
                <div className="userFieldDetail">
                    <div>Confirm Password</div>
                    <div>
                    <input
                    className="inputside"
                    type="password" name="confirmPassword" value={userRegInfo.confirmPassword} onChange={handleConfirmPasswordChange} /></div>
                 </div>
                    {passwordError && <div style={{ color: 'red' }}>Passwords do not match</div>}
               
                <div>
                {showSuccess && <div className={`success-animation ${message==="successfully"?"successfull":"unsuccessfull"}`}>{message}</div>}
              
                    <button type="submit" className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    );
};
