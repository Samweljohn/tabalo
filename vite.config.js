import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],   
  server:{
    proxy:{    
      "/login.php":{target:"http://localhost/TABARO/login.php "},
      "/region.php":{target:"http://localhost/TABARO/locationIniationData.php" },
     "/location.php":{target:"http://localhost/TABARO/location.php"},
     "/user.php":{target:"http://localhost/TABARO/user.php"},
     "/regster.php":{target:"http://localhost/TABARO/registerFarmer.php"},
     "/regsterAnimal.php":{target:"http://localhost/TABARO/regsterAnimal.php"},
     "/useManagement.php":{target:"http://localhost/TABARO/useManagement.php"}, 
     "/anaysis.php":{target:"http://localhost/TABARO/anaysis.php"},
    "/tokenValidation":{target:"http://localhost/TABARO/expireToken.php"},
    "/animal":{target:"http://localhost/TABARO/animal.owner.php"},
    "/fieldofficer.php":{target:"http://localhost/TABARO/fieldofficer.php"},
    "/insertFarmData.php":{target:"http://localhost/TABARO/insertFarmData.php"}
    }
  }
})
