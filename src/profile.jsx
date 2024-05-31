import "./css/userProfile.css"
import { arrax } from "./contex";
import { useContext,useState,useEffect } from "react";
export  const UserProfile=({userInfo})=>{
    // const userDataString = localStorage.getItem('userData');
    const [userData,setUserData]=useState([""])
    // useEffect(() => {
    //   if (userDataString) {
    //     const userData = JSON.parse(userDataString);
    //     if (userData && userData.user) {
    //       setUserData(userData);
    //       console.log(userData.user.first_name)
         
    //     }
    //   }
    // }, [userDataString]);
    const [userName,setUserName]=useState('')
    const [userEmail,setUserEmail]=useState('')
    const [userRole, setUserRole]=useState('')
    const [userFirstName,setFirstName]=useState('')
    const [useSecondName,setSecondName]=useState("")
    const [userImage,setUserImage]=useState('')
    useEffect(() => {
    setUserName(userInfo.userNameForSy)
    setUserEmail(userInfo.email)
    setUserRole(userInfo.rolebased)
    setFirstName(userInfo.first_name)
    setSecondName(userInfo.last_name)
    setUserImage(userInfo.image)
  }, []); 




    console.log(userInfo)
   
    return(
        <div className="userProfile">
            <div className="TopPartOfUserProfile">
<img src={`../picture/${userImage}`} className="ImageOfUser"></img>

                <div className="impotantInfoForUser">
                <div className="shortDescriptionOfUser">
                  <div className="userName">{`${userFirstName}  ${useSecondName}` }</div>
               <div className="Email_position">

                <div className="Email">{userEmail}</div>
                <div>-{userRole}</div>
               </div>
                </div>
                </div>
            </div>
            <div className="LowPartOfUserProfile" >
                <div className="headerSecondPART">Account</div>
                <div className="secondPartUserData">
                  <div className="firstItermInLowProfile">Username</div><div>{userName}</div>
                </div>
                <div className="secondPartUserData">
                  <div className="firstItermInLowProfile">full name</div><div>{`${userFirstName}  ${useSecondName}` }</div>
                </div>
                <div className="secondPartUserData">
                  <div  className="firstItermInLowProfile">Email</div><div>{userEmail}</div>
                </div>
                <div className="secondPartUserData">
                  <div  className="firstItermInLowProfile">Tittle</div><div>{userRole}</div>
                </div>
            </div>
        </div>
    )
 }