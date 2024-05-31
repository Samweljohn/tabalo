<?php
include './connect.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$type = $data["type"];

$amount= $data["intervalValue"]["intervalAmmount"]; // Corrected the key name
 $intervalValue = $data["intervalValue"]["interval"];


if($type==="FieldOfficerWithLeastFarmers"){
    $sql = "SELECT su.userNameForSy AS field_officer_name, COUNT(farmer_id) AS num_farmers
    FROM Farmer f
    INNER JOIN systemUserInfo su ON f.fieldOfficerId = su.user_id
    WHERE f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount $intervalValue)
    GROUP BY f.fieldOfficerId
    ORDER BY num_farmers ASC
    LIMIT 1";
$result = $con->query($sql);


if($result->num_rows > 0){
$officers= array();
while($row = $result->fetch_assoc()){
    $officers[]=$row;
}
echo json_encode($officers);
}
   
}elseif($type==="FieldOfficerWithMostFarmers"){
    $sql = "SELECT su.userNameForSy AS field_officer_name, COUNT(farmer_id) AS num_farmers
            FROM Farmer f
            INNER JOIN systemUserInfo su ON f.fieldOfficerId = su.user_id
            WHERE f.registration_date >= DATE_SUB(CURDATE(), INTERVAL $amount  $intervalValue)
            GROUP BY f.fieldOfficerId
            ORDER BY num_farmers DESC
            LIMIT 1";
    $result = $con->query($sql);
    if($result->num_rows > 0){
        $officer= array();
        while($row = $result->fetch_assoc()){
            $officer[]=$row;
        }
        echo json_encode($officer);
    }

  
 
   }
