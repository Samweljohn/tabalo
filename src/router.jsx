import {NavigationLink} from "./navigationlink"
import {Login} from "./login"
import { Contact } from "./contact";
import {UserProfile} from "./profile"
import { arrax } from "./contex";
import { Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FarmerRegistrationForm from "./registerfarmer";
import FarmerInfo from "./farmerInfo";
import {SystemUser} from "./user"
import {AnimalInfo} from "./animalInfo"
import {Setting} from "./setting"
import { Noaccess } from "./Noaccess";
import {AnimalDataReg} from "./animalDataRegistration"
import {Adduser} from "./adduser"
import {FarmerWithAccount} from "./farmerWithAccount"
import Admin from "./admin"
import "./css/router.css"
import "./css/head.css"


export default function Navigation(props) {
  const [showmenu, setShowmenu] = useState("");
  const [search, setSearch] = useState("");
  const [userAuthenticate, setAuthenticate] = useState(false);
  const [successfulLogin, setSuccessfulLogin]=useState(false)
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [userData,setUserData]=useState([""])
  const [userId,setId]=useState("")
  const [tk,setTk]=useState("")
 
 

  useEffect(() => {
    // Function to update device width
    const updateDeviceWidth = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceWidth);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDeviceWidth);
    };
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount

  let displayType;
  if (deviceWidth >= 1024) {
    displayType = "Desktop";
  } else if (deviceWidth >= 768) {
    displayType = "Tablet";
  } else {
    displayType = "Phone";
  }
  

  const HandleLogin = (data) => {
    setUserData(data);
    setId(data.user.user_id);
    setSuccessfulLogin(true);
    setTk(data.token)
    localStorage.setItem('token', data.token); // Store the token in local storage
  };
  useEffect(() => {
    // Function to update device width
    const updateDeviceWidth = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceWidth);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDeviceWidth);
    };
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount


 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = new FormData();
      data.append("token", token);
      const requestOptions = {
        method: "POST",
        body: data,
      };
      fetch("/tokenValidation", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("let find if data stored correct")
          console.log(data)
          if (data.user_id) {
            setUserData(data);
            setId(data.user_id);
            setSuccessfulLogin(true);
          } else {
            console.log("there problem in user data")
            // Handle case where token is invalid or expired
            // For example, you can redirect the user to the login page
            // and clear the token from local storage
            localStorage.removeItem("token");
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);
  
const validateUserInput=(data)=>{
  if (data) {
    console.log("data is here")
    if (data.user) {
      setUserData(data);
      setId(userData.user.user_id)
      setSuccessfulLogin(true);
    }else{
    
    }
  }

}
  

  const userHasAccessToPath = (path) => {
    if(userData.permission){
    return successfulLogin
      ? userData.permission.path.replace(/\\/g, "").includes(path) || userData.path.replace(/\\/g, "").includes(path)
      : "";
    }else{
      return successfulLogin
      ? userData.path.replace(/\\/g, "").includes(path) || userData.path.replace(/\\/g, "").includes(path)
      : "";
    }

  };

  const PrivateRoute = ({ children, path }) => {
    const hasAccess = userHasAccessToPath(path);
  
    if (!successfulLogin) {
      // Not authenticated, redirect to login
      return <Navigate to="/" />;
    } else if (!hasAccess) {
      // Authenticated but no access to this path
      return <Navigate to="/Noaccess "/>;
    }
    // Authenticated and has access
    return children;
  };
  const [menuOpen, setMenuOpen] = useState(false);
 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="rendercomponent">
       
          <div className="head">
            <div className="head_title">TABARO TERMINAL  {displayType === "Desktop" && "HANDLING" } COMPANY LTD</div>
            <div className="LOGO_title"><img src="../picture/vanila.png" className="tabaloLogo"></img></div>
          {displayType === "Phone" && (
            menuOpen &&
            <div className="X_menu">
                  <div className="close-icon" onClick={toggleMenu}>X</div>
                  <div className="phoneNavigation">
                  <NavigationLink
                importantInfo={{
                  userHasAccessToPath,
                  PrivateRoute,
                 
                }}
              />
              </div>
              </div>
              
              )
                
                }

             {!menuOpen && <div className="menu-icon" onClick={toggleMenu}>
                    <div className="lineInMenu"></div>
                    <div className="lineInMenu"></div>
                    <div className="lineInMenu"></div>
                  </div>}   



          </div>
         
          {displayType === "Desktop" &&   <div className="sideOFlink">
       <NavigationLink
            importantInfo={{
              userHasAccessToPath,
              PrivateRoute,
          
            }}
          />
        </div>}

        <div className="routeValue">
        <arrax.Provider value={userData}>
            <Routes>
            <Route path="/FarmerWithAccount" element={<PrivateRoute path="FarmerWithAccount"><FarmerWithAccount tk={tk}/></PrivateRoute>}></Route>
            <Route path="/SystemUser" element={<PrivateRoute path="SystemUser"><SystemUser tk={tk}/></PrivateRoute>}></Route>
            <Route path="/Adduser" element={<PrivateRoute path="Adduser"><Adduser tk={tk}/></PrivateRoute>}></Route>
            <Route path="/AnimalInfo" element={<PrivateRoute path="AnimalInfo"><AnimalInfo tk={tk}/></PrivateRoute>}></Route>
            <Route path="/AnimalDataReg" element={<PrivateRoute path="AnimalDataReg"><AnimalDataReg userData={userId}/></PrivateRoute>}></Route>
            <Route path="/Admin" element={<PrivateRoute path="Admin"><Admin tk={tk}/></PrivateRoute>}></Route>
            <Route path="/Contact" element={<Contact/>}></Route>
            <Route path="/Settings" element={<PrivateRoute path="Settings"><Setting tk={tk}/></PrivateRoute>}></Route>
            <Route path="/Noaccess" element={<Noaccess/>}></Route>
            <Route path="/FarmerInfo" element={<PrivateRoute path="FarmerInfo"><FarmerInfo tk={tk}/></PrivateRoute>}></Route>

            <Route path="/FarmerRegistrationForm" element={<PrivateRoute path="FarmerRegistrationForm"><FarmerRegistrationForm userData={userId}/></PrivateRoute>}></Route>
            
      
              <Route
                path="/"
                element={
                  !successfulLogin? (
                    <Login onLogin={HandleLogin} />
                  ) : (
                  <UserProfile userInfo={userData.user?userData.user:userData.user_id}></UserProfile>
                  )
                }
              ></Route>
              
            </Routes>
</arrax.Provider>
        </div>
      </div>

  );
}
