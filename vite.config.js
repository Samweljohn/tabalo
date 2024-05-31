import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],   
  server:{
    proxy:{    
      "/login.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/login.php "},
      "/region.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/locationIniationData.php" },
     "/location.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/location.php"},
     "/user.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/user.php"},
     "/regster.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/registerFarmer.php"},
     "/regsterAnimal.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/regsterAnimal.php"},
     "/useManagement.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackendO/useManagement.php"}, 
     "/anaysis.php":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/anaysis.php"},
    "/tokenValidation":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/expireToken.php"},
    "/animal":{target:"https://github.com/Samweljohn/tabalo/tree/tabaloBackend/animal.owner.php"},
    "/fieldofficer.php":{target:"http://localhost/TABARO/fieldofficer.php"},
    "/insertFarmData.php":{target:"http://localhost/TABARO/insertFarmData.php"}
    }
  }
})
