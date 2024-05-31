
import { Link} from "react-router-dom";
import { useState } from "react";

import { BarChartBig ,UserRoundPlus ,PhoneCall,PencilLine,BookOpen,Settings,Squirrel } from 'lucide-react';
export  const  NavigationLink=({importantInfo})=>{

    const [activelink, setActiveLink]=useState('')
return(
    <nav className="navigation_bar">
      {importantInfo.userHasAccessToPath("Admin") &&  
<div  className={`mainDivOfMenu ${activelink=='Admin'?'link_active':''}`}>
    <div className="imageInMenu">
    <BarChartBig color="white" size="30px"/>
    </div>
    <div>
            <Link to="/Admin" onClick={()=>setActiveLink('Admin')} className="linkList">Admin</Link>

    </div>
</div>
}

{importantInfo.userHasAccessToPath("FarmerWithAccount") &&  
<div  className={`mainDivOfMenu ${activelink=='FarmerWithAccount'?'link_active':''}`}>
    <div className="imageInMenu">
    <BarChartBig color="white" size="30px"/>
    </div>
    <div>
            <Link to="/FarmerWithAccount" onClick={()=>setActiveLink('FarmerWithAccount')} className="linkList">Farmer Ac</Link>

    </div>
</div>
}




{importantInfo.userHasAccessToPath("Adduser") &&  
<div  className={`mainDivOfMenu ${activelink=='Adduser'?'link_active':''}`}>
    <div className="imageInMenu">
    <BarChartBig color="white" size="30px"/>
    </div>
    <div>
            <Link to="/Adduser" onClick={()=>setActiveLink('Adduser')} className="linkList">Add user</Link>

    </div>
</div>
}


{importantInfo.userHasAccessToPath("SystemUser") &&  
<div  className={`mainDivOfMenu ${activelink=='SystemUser'?'link_active':''}`}>
    <div className="imageInMenu">
    <BarChartBig color="white" size="30px"/>
    </div>
    <div>
            <Link to="/SystemUser" onClick={()=>setActiveLink('SystemUser')} className="linkList">Users</Link>

    </div>
</div>
}


 <div  className={`mainDivOfMenu ${activelink=='/login'?'link_active':''}`}>
 
  <div className="imageInMenu">
  <UserRoundPlus color="white" size="30px" />
  </div>
  <div>
            <Link to="/" onClick={()=>setActiveLink('/login')} className="linkList">my account
            </Link>

  </div>
 </div>
 <div className={`mainDivOfMenu ${activelink=='/Contact'?'link_active':''}`}>
  <div className="imageInMenu"> 
  <PhoneCall color="white" size="30px"  />
  </div >
 
  <div>

        <Link to="/Contact" onClick={()=>setActiveLink('/Contact')} className="linkList" >contact</Link >

  </div>
  
 </div>
 {importantInfo.userHasAccessToPath("AnimalInfo") &&  
 <div className={`mainDivOfMenu ${activelink=='/AnimalInfo'?'link_active':''}`}>
  <div className="imageInMenu"> 
  <Squirrel  color="white" size="30px"/>

  </div >
 
  <div>

        <Link to="/AnimalInfo" onClick={()=>setActiveLink('/AnimalInfo')} className="linkList" >Animal info</Link >

  </div>
  
 </div>
}

 {importantInfo.userHasAccessToPath("AnimalDataReg") &&  
 <div className={`mainDivOfMenu ${activelink=='/AnimalDataReg'?'link_active':''}`}>
  <div className="imageInMenu"> 
  <Squirrel  color="white" size="30px"/>

  </div >
 
  <div>

        <Link to="/AnimalDataReg" onClick={()=>setActiveLink('/AnimalDataReg')} className="linkList" >Animal Reg</Link >

  </div>
  
 </div>
}


{importantInfo.userHasAccessToPath("FarmerInfo") &&  

    <div className={`mainDivOfMenu ${activelink=='/FarmerInfo'?'link_active':''}`}>
      <div className="imageInMenu">
      <BookOpen color="white" size="30px"/>
      </div>
      <div>
   
            <Link to="/FarmerInfo" onClick={()=>setActiveLink('/FarmerInfo')} className="linkList">farmer info</Link>

      </div>
    </div>
}
{importantInfo.userHasAccessToPath("Settings") &&  
    <div className={`mainDivOfMenu ${activelink=='/Settings'?'link_active':''}`}>
      <div className="imageInMenu">
      <Settings color="white" size="30px"/>
      </div>
      <div>
   
            <Link to="/Settings" onClick={()=>setActiveLink('/Settings')} className="linkList">Settings</Link>

      </div>
    </div>
}
    {importantInfo.userHasAccessToPath("FarmerInfo") &&  

    <div  className={`mainDivOfMenu ${activelink=='FarmerReg'?'link_active':''}`}>
    <div className="imageInMenu">
    <PencilLine  color="white" size="30px"/>
    </div>
    <div>
            <Link to="/FarmerRegistrationForm" onClick={()=>setActiveLink('FarmerReg')} className="linkList">Farmer Reg</Link>

    </div>
</div>
}  
   

        </nav>

)
}