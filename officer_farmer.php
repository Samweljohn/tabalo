<?php
include './expireToken.php';
// Database connection parameters
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$database = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Retrieve farmers registered by the specific field officer
$sql = "SELECT * FROM Farmer WHERE field_officer_id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $fieldOfficerId);
$stmt->execute();
$result = $stmt->get_result();

// Check if there are any results
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["farmer_id"]. " - Name: " . $row["farmer_first_name"]. " " . $row["last_name"]. "<br>";
        // You can retrieve other fields as needed
    }
} else {
    echo "0 results";
}

// Close connection
$stmt->close();
$conn->close();

?>
