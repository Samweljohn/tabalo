import React, { useState ,useEffect} from "react";
import "./css/login.css"
import {loginBackend} from "./apiService"
import TextArea from "./textEdditor"


export const Login = ({ onLogin }) => {
  
  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loginInfo, setLoginInfo] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize and validate input
    const username = userLoginData.username.trim();
    const password = userLoginData.password.trim();

    // Check if username and password are empty
    if (!username || !password) {
      setLoginInfo("Username or password is empty");
      // Optionally display an error message to the user
      return;
    }

    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    const requestOptions = {
      method: "POST",
      body: data,
    };






    try {
    
     
      fetch("/login.php", requestOptions)
      .then((response) => response.json())

      .then((data) => validateUserInput(data)) 
      .catch((error) => console.error("Error fetching category data:", error));
     
      // Log the response body
      // Handle successful response here (e.g., redirect to another page)
    } catch (error) {
      console.error("Error:", error);
      // Display a user-friendly error message
    
    }
  };
 
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Token exists, assume user is logged in
  //     validateToken(token);
  //   }
  // }, []);
  // const validateToken = async (token) => {
  //   try {
  //     const response = await fetch("/tokenValidation", {
  //       method: "POST",
  //       body:  token ,
  //     });
  //     const data = await response.json();
  //     console.log(majaribio)
  //   console.log(data)
  //     if (data.user) {
  //       onLogin(data)
  
  //     } else {
  //       // Token is invalid or expired, prompt user to log in again
  //       // You may also want to clear local storage in this case
  //       // localStorage.removeItem("token");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle error
  //   }
  // };
  const validateUserInput=(data)=>{
    if (data) {
      console.log("data is here")
      if (data.user) {
        onLogin(data)
      }else{
        setMessage("invalid username or password")
      }
    }
  
  }
 

  return (
    <div className="login-form_tabalo">
      <div className="login">
      <form onSubmit={handleSubmit}>
          <div className="login_text">Login</div>
          <label className="text_important_for_login">Username</label>
          <br />
          <input
            type="text"
            className="loginBoxField"
            value={userLoginData.username}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, username: e.target.value })
            }
          />
          <br />
          <label className="text_important_for_login">Password</label>
          <br />
          <input
            type="password"
            className="loginBoxField"
            value={userLoginData.password}
            onChange={(e) =>
              setUserLoginData({ ...userLoginData, password: e.target.value })
            }
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="text_important_for_login">Your forget password?</div>
        </form>
        <p className="loginFailed">{message}</p>
       
      </div>
    
    </div>
  );
};
