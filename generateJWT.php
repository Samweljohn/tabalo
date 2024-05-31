
<?php
require __DIR__ . '/vendor/autoload.php'; // Adjust the path to the autoloader based on your directory structure
use Firebase\JWT\Key;
function generateJWT($user, $permitionData) {
    $key = "tabaro_key"; 

    // Prepare payload for the JWT token "token"
    $expirationTime = time() + (60 * 60);
    $payload = array(
         "user_id" => $user, // Assuming user ID is stored in the 'id' column
         "path" => $permitionData["path"],
         "exp" => $expirationTime,
         "rolebased" => $permitionData["role"]
        // Add any additional claims as needed
    );

    // Generate JWT token using Firebase JWT library
    return \Firebase\JWT\JWT::encode($payload, $key, 'HS256'); // Specify the algorithm as the third argument (e.g., 'HS256')
}
?>
