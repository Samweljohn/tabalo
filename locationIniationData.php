<?php

$servername = "localhost";
$username = "samwel";
$password = 123; // Enclose the password in quotes
$dbname = "Tabalo";

$con = new mysqli($servername, $username, $password, $dbname);
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = "SELECT * FROM `regions`";
$result = $con->query($sql);

$regions = array();
while($row = $result->fetch_assoc()) {
    $regions[] = $row;
}

header('Content-Type: application/json');
echo json_encode($regions);


$con->close();

?>
