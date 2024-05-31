<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Include connection and JWT generation files (replace with your actual paths)
include './connect.php';
include './generateJWT.php';

$con = new mysqli($servername, $username, $password, $dbname);
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}
if(isset($_POST['token'])){
  $token=$_POST['token'];
  validateToken($token);
  exit;
}
if (isset($_POST['username']) && isset($_POST['password'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Prepare and execute login query
  $stmt = $con->prepare("SELECT * FROM  systemUserInfo  WHERE `password`=? AND `userNameForSy`=?");
  $stmt->bind_param('ss', $password, $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    unset($user['password']);

    // Retrieve user permissions (if applicable)
    if ($user["rolebased"]) {
      $accessperm = $user["rolebased"];
      $stmt = $con->prepare("SELECT `Role`.`role_name` AS role, JSON_ARRAYAGG(`FilePath`.`path_name`) AS path
                              FROM `Role`
                              JOIN `FilePath` ON `Role`.`role_id` = `FilePath`.`role_id`
                              WHERE `Role`.`role_name` = ?");
      $stmt->bind_param('s', $accessperm);
      $stmt->execute();
      $result = $stmt->get_result();
      $permitionData = $result->fetch_assoc();
    }

    // Generate JWT token (if applicable - commented out)
     $jwtToken = generateJWT($user, $permitionData);

    // Store user ID in session and set cookie
    $_SESSION['user_id'] = $user['user_id'];
    setcookie('user_id', $user['user_id'], time() + (86400 * 30));
    

    // Return user data, permission data, and JWT token (if applicable)
    echo json_encode(array('user' => $user, 'permission' => $permitionData, 'token' => $jwtToken));
    exit;
  } else {
    // Login failed, return error message
    http_response_code(401);
    echo json_encode(array('message' => 'Invalid username or password'));
    exit;
  }
} else {
  // Check for cookie and session
  $userIdFromCookie = $_COOKIE['user_id'] ? $_COOKIE['user_id'] : "cooke is null";
  $userIdFromSession = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

  if ($userIdFromCookie) {
    // Check if session ID matches cookie ID
    if ($userIdFromCookie === $userIdFromSession) {
      // Valid session, fetch user data
      $stmt = $con->prepare("SELECT * FROM  systemUserInfo  WHERE user_id=?");
      $stmt->bind_param('i', $userIdFromSession);
      $stmt->execute();
      $result = $stmt->get_result();

      if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Retrieve user permissions (if applicable)
        if ($user["rolebased"]) {
          $accessperm = $user["rolebased"];
          $stmt = $con->prepare("SELECT `Role`.`role_name` AS role, JSON_ARRAYAGG(`FilePath`.`path_name`) AS path
                                  FROM `Role`
                                  JOIN `FilePath` ON `Role`.`role_id` = `FilePath`.`role_id`
                                  WHERE `Role`.`role_name` = ?");
          $stmt->bind_param('s', $accessperm);
          $stmt->execute();
          $result = $stmt->get_result();
          $permitionData = $result->fetch_assoc();
        }

        // Check if cookie has expired
        if (time() > (int) $userIdFromCookie + (86400 * 30)) {
          // Cookie expired, inform user
          http_response_code(401);
          echo json_encode(array('message' => 'Your session has expired. Please login again.'));
          exit;
        } else {
          // Valid session and non-expired cookie, return user data
          echo json_encode(array('user' => $user, 'permission' => $permitionData, 'token' => $jwtToken));
          exit;
        }
      } else {
        // Session ID mismatch, likely due to expired session or different browser
        http_response_code(401);
        echo json_encode(array('message' => 'Session information mismatch. Please login again.'));
        exit;
      }
    } else {
      // No cookie present, require login
      echo  $userIdFromCookie ;
      http_response_code(401);
      echo json_encode(array('message' => 'Username and password are required'));
      exit;
    }
  }
}
  echo  $userIdFromCookie ;
// ... (error handling for login failure)
  ?>