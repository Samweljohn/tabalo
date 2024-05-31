
<?php
include './connect.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$organic=$data['organic'];
function insertFarmer($farmer) {
   
    global $con;
    // Insert farmer details
    $sql = "INSERT INTO Farmer (farmer_first_name, second_name, last_name, national_identity_number,village_id,`ward`,`district`,`region`,`fieldOfficerId` ) VALUES (?, ?, ?, ?,?,?,?,?,?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssiiiii", $farmer['firstName'], $farmer['middleName'], $farmer['lastName'], $farmer['nationalIdentityNo'], $farmer['village'],$farmer['ward'],$farmer['district'],$farmer['region'],$farmer['userId']);
    $stmt->execute();
    $farmerId = $stmt->insert_id; // Retrieve the auto-generated farmer ID
    $stmt->close();
    
    return $farmerId;
}

function Farm($farm, $farmerId,$organic,$farmcode) {
    global $con;
    
    $farmIds = array();
    // Insert farm details associated with the farmer ID
    foreach ($farm as $fm) {
        $sql = "INSERT INTO Farm (farm_name, farm_size, farmer_id,organic,`farmCode`) VALUES (?, ?, ?,?,?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sdiss", $fm['farmName'], $fm['farmSize'], $farmerId,$organic ,$farmcode);
        $stmt->execute();
        $farmIds[] = $stmt->insert_id; // Retrieve the auto-generated farm ID
        $stmt->close();
    }
    if($farmIds){
        return $farmIds;
    }else{
        echo json_encode(array('message' => 'Problem occur in farm'));
    }
    
}

function insertCropDetails($cropDetails, $farmIds) {
    global $con;
    $cropIds = array();
    foreach ($cropDetails as $index => $crop) {
        $farmId = $farmIds[$index];
        $sql = "INSERT INTO Crop (crop_type, date_planting,CropName, approximation_of_crop_amount, farm_id,number_germinated_seed ,matureVine,immatureVine) VALUES (?, ?,?, ?, ?,?,?,?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ssssiiii", $crop['CropType'],$crop['PlantingDate'], $crop['cropName'], $crop['HavestApproximation'], $farmId, $crop['gemSed'],$crop['maturedVine'],$crop['immatureVine']);
        $stmt->execute();
        $cropIds[] = $stmt->insert_id; // Store the auto-generated crop ID
        $stmt->close();
    } 
    if($cropIds){
        return $cropIds;
    }else{
        echo json_encode(array('message' => 'Problem occur in farm'));
    }
    
   
}

// Function to insert chemical data
function insertChemicalData($chemicals, $cropIds ,$farmcode) {
    global $con;
  foreach($chemicals as $chemical){
    foreach($chemical as $index => $singlechemical){
         $cropId = $cropIds[$index];

             $sql = "INSERT INTO ChemicalUsed (chemical_name, crop_id) VALUES (?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->bind_param("si", $singlechemical, $cropId); // Use $chemicalName directly
            $stmt->execute();
            $stmt->close();
   
  }
}
echo json_encode(array('message' => 'successfully',"code"=>$farmcode));
;
}

// Assuming you have $data variable containing data from the frontend
$farmerId = insertFarmer($data);
$farmcode="TB/".$farmerId;
$farmIds = Farm($data['farm'], $farmerId,$organic,$farmcode);
$cropIds = insertCropDetails($data['cropDetails'], $farmIds);
insertChemicalData($data['chemicals'], $cropIds,$farmcode);

?>






















