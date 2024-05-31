<?php
//choose crop to see all chemical used on it
function chemical_for_specific_crop(){
$sql = "SELECT * FROM ChemicalUsed WHERE crop_id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $cropId);
$stmt->execute();
$result = $stmt->get_result();
$chemicals = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();
}


function Allfarmerdetails(){
    $sql = "SELECT Farmer.*, Farm.*, Crop.*, ChemicalUsed.*
        FROM Farmer
        LEFT JOIN Farm ON Farmer.farmer_id = Farm.farmer_id
        LEFT JOIN Crop ON Farm.farm_id = Crop.farm_id
        LEFT JOIN ChemicalUsed ON Crop.crop_id = ChemicalUsed.crop_id
        WHERE Farmer.farmer_id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $farmerId);
$stmt->execute();
$result = $stmt->get_result();
$combinedData = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

}
//find all farm of specific farmer
function farm_retrival_for_specific_farmer(){
    $sql = "SELECT * FROM Farm WHERE farmer_id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $farmerId);
$stmt->execute();
$result = $stmt->get_result();
$farms = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

}
function selectfarmerInSpecicArea(){

// Assuming you have a variable containing the location data
$region = $data['region']; // Example: 'RegionName'
$district = $data['district']; // Example: 'DistrictName'
$village = $data['village']; // Example: 'VillageName'

// Construct SQL query to select farmers in the specified location
$sql = "SELECT * FROM Farmer WHERE region = ? AND district = ? AND village = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("sss", $region, $district, $village);
$stmt->execute();
$result = $stmt->get_result();
$farmers = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

// Optionally, you can encode the result as JSON and send it back to the frontend
echo json_encode($farmers);


}
?>