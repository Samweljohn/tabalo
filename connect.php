<?php
$servername = "localhost";
$username = "samwel";
$password = 123; // Enclose the password in quotes
$dbname = "tabaro";

$con = new mysqli($servername, $username, $password, $dbname);
if($con->connect_error){
die("connection failed: ". $con->connect_error);
}
?>