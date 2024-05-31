<?php
include './connect.php';
include './farmer_with_farm.php';
include './expireToken.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$tk=$data["tk"];
$array_file=token($tk);
$tok=json_decode($array_file, true);
$valid="FarmerInfo";
if($tok){
    echo "data";
    echo $tok;
    exit;
}else{
    echo json_decode("problem rise");
    exit;
}
$type = $data["type"];





$amount= $data["intervalValue"]["intervalAmmount"]; // Corrected the key name
 $intervalValue = $data["intervalValue"]["interval"];






// Define different endpoints based on the type

    if($type==="FieldOfficerWithLeastFarmers"){
      if($intervalValue){
         // echo json_encode($intervalValue);
         $FieldOfficerWithLeastFarmers=getFieldOfficerWithLeastFarmers($amount, $intervalValue) ;

          echo json_encode($FieldOfficerWithLeastFarmers);
     }else{
         echo json_encode(array('message' => "time not found"));

     }
    }elseif($type==="FieldOfficerWithMostFarmers"){
         $data=getFieldOfficerWithMostFarmers($amount , $intervalValue);
         echo json_encode($data);
        }else if($type==="data_registeredFarmer"){
         
         $data=getTotalNumberOfFarmers($amount , $intervalValue);
         echo json_encode(array('message' => $data));
        }elseif($type==="chemicalMostUsed"){
  
              $data=getMostUsedChemical($amount , $intervalValue) ;
                 echo json_encode(array('message' =>  $data));
        }elseif($type==="LeastChemicalUsed"){
             $data=getLeastUsedChemical($amount , $intervalValue) ;
                echo json_encode(array('message' =>  $data));

        }elseif($type==="MostPlantedPlan"){
               $data=getMostPlantedPlant($amount  ,$intervalValue);
                echo json_encode(array('message' =>  $data));
         }elseif($type==="leastPlanted"){
         
         $data=getLeastPlantedPlant($amount , $intervalValue);
         echo json_encode(array('message' =>  $data));
         }elseif($type==="fildOfficerMoreInfo"){
    
             $officer_Id= $data["officer_Id"];
         $data=getFarmersDetailsByOfficer($officer_Id, $intervalValue ,$amount );
         echo json_encode($data);
         }elseif($type==="data_for_totalFieldOfficer"){
        
          $data=countFieldOfficers();
         echo json_encode(array('message' =>  $data));
         }elseif($type==="officerwithCountFarmer"){
           $data=  getFieldOfficersWithFarmerCounts($amount  ,$intervalValue);
           echo json_encode($data);
          // echo json_encode(array('data' =>  $data));
        
      }elseif($type==="topFiveFarmer"){
          $data=listOfFarmerWithHighNumberOfFarmer($amount  ,$intervalValue);
          echo json_encode($data);

       } else{
              echo json_encode(array("error" => "Unknown analysis type."));
          }

                
       //Add more cases for other types of analysis as needed


//  // Function to get the name of the field officer with the highest number of registered farmers within a specified time interval
 function getFieldOfficerWithMostFarmers($amount , $intervalValue) {
     global $con;
      $sql = "SELECT su.userNameForSy AS field_officer_name, COUNT(farmer_id) AS num_farmers
              FROM Farmer f
              INNER JOIN systemUserInfo su ON f.fieldOfficerId = su.user_id
              WHERE f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount  $intervalValue)
              GROUP BY f.fieldOfficerId
              ORDER BY num_farmers DESC
              LIMIT 1";
      $result = $con->query($sql);
      if($result->num_rows > 0){
          $officers= array();
          while($row = $result->fetch_assoc()){
              $officers[]=$row;
          }
          return $officers;
      }
  }

//  // Function to get the name of the field officer with the lowest number of registered farmers within a specified time interval
 function getFieldOfficerWithLeastFarmers($amount , $intervalValue) {
      global $con;
      $sql = "SELECT su.userNameForSy AS field_officer_name, COUNT(farmer_id) AS num_farmers
              FROM Farmer f
              INNER JOIN systemUserInfo su ON f.fieldOfficerId = su.user_id
              WHERE f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount  $intervalValue)
              GROUP BY f.fieldOfficerId
              ORDER BY num_farmers ASC
              LIMIT 1";
      $result = $con->query($sql);

  
      if($result->num_rows > 0){
          $officers= array();
          while($row = $result->fetch_assoc()){
              $officers[]=$row;
          }
          return $officers;
      }


     // if ($result && $result->num_rows > 0) {
     //     $row = $result->fetch_assoc();
      //     return $row;
     // } else {
     //     return null;
     // }
 }
  // Function to get the total number of registered farmers within a specified time interval
 function getTotalNumberOfFarmers($amount , $intervalValue) {
     global $con;
     $sql = "SELECT COUNT(*) AS total_farmers
             FROM Farmer
             WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount  $intervalValue)";
     $result = $con->query($sql);
     if ($result && $result->num_rows > 0) {
         $row = $result->fetch_assoc();
         return $row['total_farmers'];
     } else {
         return 0;
     }
 }
 function countFieldOfficers() {
     global $con;
     $sql = "SELECT COUNT(*) AS num_field_officers
             FROM systemUserInfo
             WHERE rolebased = 'field_officer'";
     $result = $con->query($sql);
     if ($result && $result->num_rows > 0) {
         $row = $result->fetch_assoc();
         return $row['num_field_officers'];
     } else {
         return 0;
     }
 }


 function getLeastPlantedPlant($amount, $intervalValue) {
    global $con;
    $sql = "SELECT c.CropName, COUNT(*) AS planting_count
            FROM Crop c
            INNER JOIN Farm f ON c.farm_id = f.farm_id
            WHERE f.FarmDate >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
            GROUP BY c.CropName
            ORDER BY planting_count ASC
            LIMIT 1";
    $result = $con->query($sql);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['CropName'];
    } else {
        return "No plants planted within the specified interval.";
    }
}

function getMostPlantedPlant($amount, $intervalValue) {
    global $con;
    $sql = "SELECT c.CropName, COUNT(*) AS planting_count
            FROM Crop c
            INNER JOIN Farm f ON c.farm_id = f.farm_id
            WHERE f.FarmDate >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
            GROUP BY c.CropName
            ORDER BY planting_count DESC
            LIMIT 1";
    $result = $con->query($sql);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['CropName'];
    } else {
        return "No plants planted within the specified interval.";
    }
}

function getMostUsedChemical($amount, $intervalValue) {
    global $con;
    $sql = "SELECT cu.chemical_name, COUNT(*) AS usage_count
            FROM ChemicalUsed cu
            INNER JOIN Crop c ON cu.crop_id = c.crop_id
            INNER JOIN Farm f ON c.farm_id = f.farm_id
            WHERE f.FarmDate >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
            GROUP BY cu.chemical_name
            ORDER BY usage_count DESC
            LIMIT 1";
    $result = $con->query($sql);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['chemical_name'];
    } else {
        return "No chemical used within the specified interval.";
    }
}

function getLeastUsedChemical($amount, $intervalValue) {
    global $con;
    $sql = "SELECT cu.chemical_name, COUNT(*) AS usage_count
            FROM ChemicalUsed cu
            INNER JOIN Crop c ON cu.crop_id = c.crop_id
            INNER JOIN Farm f ON c.farm_id = f.farm_id
            WHERE f.FarmDate >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
            GROUP BY cu.chemical_name
            ORDER BY usage_count ASC
            LIMIT 1";
    $result = $con->query($sql);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['chemical_name'];
    } else {
        return "No chemical used within the specified interval.";
    }
}

 function getFieldOfficersWithFarmerCounts($amount  ,$intervalValue) {
     global $con;
     $sql = "SELECT su.user_id AS field_officer_id, su.userNameForSy AS field_officer_name, COUNT(f.farmer_id) AS num_farmers
             FROM Farmer f
             INNER JOIN systemUserInfo su ON f.fieldOfficerId = su.user_id
             WHERE f.registration_date >= DATE_SUB(CURDATE(),INTERVAL $amount  $intervalValue)
             GROUP BY f.fieldOfficerId";
     $result = $con->query($sql);

     $fieldOfficers = array();
     if ($result && $result->num_rows > 0) {
         while ($row = $result->fetch_assoc()) {
             $fieldOfficer = array(
                 'id' => $row['field_officer_id'],
                 'name' => $row['field_officer_name'],
                 'num_farmers' => $row['num_farmers']
             );
             $fieldOfficers[] = $fieldOfficer;
         }
     }
     return $fieldOfficers;
 }
 function listOfFarmerWithHighNumberOfFarmer($amount  ,$intervalValue){
     global $con; 
         $sql = "SELECT f.farmer_id, f.farmer_first_name AS farmer_name, COUNT(*) AS num_farms 
         FROM Farmer f 
         INNER JOIN Farm fm ON f.farmer_id = fm.farmer_id 
         WHERE f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount  $intervalValue) 
         GROUP BY f.farmer_id 
         ORDER BY num_farms DESC 
         LIMIT 5";

//  // Execute query
  $result = $con->query($sql);

 $farmData = array();

 if ($result->num_rows > 0) {
  // Fetch data and store in array
 while($row = $result->fetch_assoc()) {
 // Create an associative array for each row
 $data = array(
      'farmer_name' => $row['farmer_name'],
     'num_farms' => $row['num_farms']
  );
 // Push the associative array into the $farmData array
 array_push($farmData, $data);
 }
 }

  return $farmData;
  }

 
?>
