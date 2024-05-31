<?php
include './connect.php';
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$type = $data["type"];
$animalowner_id=$data["animaId"];
if($type==="animals"){
    global $con;
    
    // Prepare the SQL query
    $sql = "SELECT * FROM Animal WHERE animalowner_id = ?";
    $stmt = $con->prepare($sql);
    
    // Bind the parameter
    $stmt->bind_param("i", $animalowner_id);
    
    // Execute the statement
    $stmt->execute();
    
    // Get the result
    $result = $stmt->get_result();
    
    // Fetch data into an associative array
    $animals = [];
    while ($row = $result->fetch_assoc()) {
        $animals[] = $row;
    }
    
    // Close the statement
    $stmt->close();
    
    echo json_encode($animals);
    exit;
}else{
    $sql="SELECT 
su.user_id AS field_officer_id, 
su.userNameForSy AS field_officer_name, 
ao.animalowner_id, 
ao.name AS animal_owner_name, 
SUM(a.amount) AS total_animals_owned
FROM 
systemUserInfo su
INNER JOIN 
animalOwner ao ON su.user_id = ao.officer_id
LEFT JOIN 
Animal a ON ao.animalowner_id = a.animalowner_id
GROUP BY 
su.user_id, su.userNameForSy, ao.animalowner_id, ao.name;
";
   $result = $con->query($sql);
   if($result->num_rows > 0){
       $animal= array();
       while($row = $result->fetch_assoc()){
           $animal[]=$row;
       }
       echo  json_encode($animal);
   }

}








?>