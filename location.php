<?php

include './connect.php';
if($con->connect_error){
die("connection failed: ". $con->connect_error);
}
$json_data = file_get_contents('php://input');

// Decode the JSON data
$data = json_decode($json_data, true);
foreach ($data as $region => $districts) {
    // Insert region into regions table
    $sql = "INSERT INTO regions (region_name) VALUES ('$region')";
    $con->query($sql);

    // Get the ID of the inserted region
    $region_id = $con->insert_id;

    foreach ($districts as $district => $wards) {
        // Insert district into districts table
        $sql = "INSERT INTO districts (district_name, region_id) VALUES ('$district', $region_id)";
        $con->query($sql);

        // Get the ID of the inserted district
        $district_id = $con->insert_id;

        foreach ($wards as $ward => $streets) {
            // Insert ward into wards table
            $sql = "INSERT INTO wards (ward_name, district_id) VALUES ('$ward', $district_id)";
            $con->query($sql);

            // Get the ID of the inserted ward
            $ward_id = $con->insert_id;

            foreach ($streets as $street => $places) {
                foreach ($places as $place) {
                    // Insert place into a corresponding table
                    $sql = "INSERT INTO village (village_name, ward_id) VALUES ('$place', $ward_id)";
                    $con->query($sql);
                }
            }
        }
    }
}

// Close the database connection


if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["region"])) {
    $selectedRegion = $_GET["region"];
    
    // Prepare and execute query to fetch districts
    $stmt = $con->prepare("SELECT * FROM districts WHERE region_id = ?");
    $stmt->bind_param("i", $selectedRegion);
    $stmt->execute();
    
    // Get result and encode as JSON
    $result = $stmt->get_result();
    $districts = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($districts);
}

// wards.php - Fetch wards based on selected district
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["district"])) {
    $selectedDistrict = $_GET["district"];
    
    // Prepare and execute query to fetch wards
    $stmt = $con->prepare("SELECT * FROM wards WHERE district_id = ?");
    $stmt->bind_param("i", $selectedDistrict);
    $stmt->execute();
    
    // Get result and encode as JSON
    $result = $stmt->get_result();
    $wards = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($wards);
}
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["ward_id"])) {
    $selectedWard = $_GET["ward_id"];
    
    // Prepare and execute query to fetch wards
    $stmt = $con->prepare("SELECT * FROM village WHERE ward_id= ?");
    $stmt->bind_param("i",  $selectedWard );
    $stmt->execute();
    
    // Get result and encode as JSON
    $result = $stmt->get_result();
    $village = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($village);

}
// Close connection
$con->close();
?>