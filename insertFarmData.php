<?php
include './connect.php';
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$farmCode=$data['code'];
$farm=$data['farm'];
$crops =$data['cropDetails'];
$chemicals=$data['chemicals'];
$farmer_id=$data["farmer_id"];
$type=$data["type"];
if($type="code"){

$stmt = $con->prepare("SELECT  farmer_first_name ,second_name, last_name FROM Farmer WHERE farmer_id= ?"); 
$stmt->bind_param("s", $farmCode);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows > 0){
    $farmData= array();
   while($row = $result->fetch_assoc()){
    $farmData[]=$row;
 }
 echo json_encode($farmData);
 } else {
    echo json_encode(array('message' => 'user not found'));
 }
exit;
}else{
    Farm($farm, $farmerId,$organic,$farmcode);
    insertCropDetails($crops, $farmIds);
    insertChemicalData($chemicals, $cropIds);

  
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
echo json_encode(array('message' => 'successfully'));
;
}