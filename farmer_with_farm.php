<?php
include './connect.php';
if($con->connect_error){
die("connection failed: ". $con->connect_error);
}
function getFarmersDetailsByOfficer($officer_Id, $intervalValue, $amount ){
    global $con;
    $sql = "SELECT f.farmer_id, f.farmer_first_name, f.second_name, f.last_name,
                   r.region_name, w.ward_name, d.district_name, v.village_name,
                   COUNT(DISTINCT fr.farm_id) AS total_farms
            FROM Farmer f
            INNER JOIN Farm fr ON f.farmer_id = fr.farmer_id
            INNER JOIN regions r ON f.region = r.region_id
            INNER JOIN wards w ON f.ward = w.ward_id
            INNER JOIN districts d ON f.district = d.district_id
            INNER JOIN village v ON f.village_id = v.village_id
            WHERE f.fieldOfficerId = ?
              AND f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
            GROUP BY f.farmer_id";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $officer_Id);
    $stmt->execute();
    $result = $stmt->get_result();

    $farmers = array();
    while ($row = $result->fetch_assoc()) {
        $farmer = array(
            'farmer_id' => $row['farmer_id'],
            'first_name' => $row['farmer_first_name'],
            'second_name' => $row['second_name'],
            'last_name' => $row['last_name'],
            'region' => $row['region_name'],
            'ward' => $row['ward_name'],
            'district' => $row['district_name'],
            'village' => $row['village_name'],
            'total_farms' => $row['total_farms']
        );
        $farmers[] = $farmer;
    }
    $stmt->close();
    return $farmers;
}

// Get the details of farmers registered by a specific officer within the last month

?>