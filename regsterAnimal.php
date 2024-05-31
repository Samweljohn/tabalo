<?php
include './connect.php'; // Include your database connection
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
// Sample data
$ownerName = $data['AnimalOwner'];
$amount=$data['AMountOfAnimal'];
$organic=$data['Organic'];
$comment=$data['comment'];
$officerId=$data['userId'];
$animalType =$data['animalType'];
$AnimalName =$data['AnimialName'];

 // Assuming officer_id is provided
$typeOfBread=$data['typeOfBread'];
if($AnimalName){
if($ownerName){
    if($amount){

                $stmtOwner = $con->prepare("INSERT INTO animalOwner (name, officer_id) VALUES (?, ?)");
                $stmtOwner->bind_param("si", $ownerName, $officerId);
                $stmtOwner->execute();

                // Get the inserted animalowner_id
                $animalOwnerId = $stmtOwner->insert_id;

                // Close the statement
                $stmtOwner->close();

                // Sample animal data

                // Prepare and execute statement to insert into Animal table
                $stmtAnimal = $con->prepare("INSERT INTO Animal (animal_type, amount, organic,`comment` , animalowner_id,`typeOfBread`, `animalName`) VALUES (?, ?, ?, ?, ?,?,?)");
                $stmtAnimal->bind_param("sississ", $animalType, $amount, $organic, $comment, $animalOwnerId,$typeOfBread,$AnimalName);
                $stmtAnimal->execute();

                // Close the statement
                $stmtAnimal->close();

                // Optionally, you can check for success and provide a response
                if ($stmtAnimal && $stmtOwner) {
                    echo json_encode(array('message' => 'successfully' ,'code' => $animalOwnerId ));
                } else {
                    echo json_encode(array('message' => ' their is problem '));
                }

    }else{
        echo json_encode(array('message' => ' please enter amount'));
    }

}else{
    echo json_encode(array('message' => ' please insert owner name'));
}
}else{
    echo json_encode(array('message' => ' please insert animal name'));
}
// Prepare and execute statement to insert into animalOwner table


// Close the database connection
$con->close();
?>
