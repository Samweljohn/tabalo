<?php
include './imageValidatiom.php';
include './connect.php';
// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Function to add a new user
function addUser($firstName, $lastName, $email, $password, $role_id) {
    global $con;
    $sql = "INSERT INTO UserName (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssi", $firstName, $lastName, $email, $password, $role_id);
    $stmt->execute();
    $stmt->close();
}

// Function to edit user information
function editUser($user_id, $first_name, $last_name,$status,  $email ,$rolebased, $name) {
    global $con;
    $sql = "UPDATE systemUserInfo SET first_name = ?, last_name = ?,`status`=?, email = ? , rolebased=?,userNameForSy=?
     WHERE user_id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssssi", $first_name, $last_name,$status, $email,$rolebased,$name, $user_id);
    if ($stmt->execute()) {
        echo json_encode(array('message' => 'successfully'));
    } else {
        echo json_encode(array('message' => ' their is problem '));
    }
    $stmt->close();
}

// Function to delete a user
function deleteUser($userId) {
    global $con;
    $sql = "DELETE FROM systemUserInfo WHERE user_id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $userId);
    if ($stmt->execute()) {
        echo json_encode(array('message' => 'successfully'));
    } else {
        echo json_encode(array('message' => ' their is problem '));
    }

    $stmt->close();
}

// Function to set user role
function setUserRole($userId, $roleId) {
    global $con;
    $sql = "UPDATE UserName SET role_id = ? WHERE user_id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $roleId, $userId);
    $stmt->execute();
    $stmt->close();
}

// Example usage

// Add a new user
if(isset($_POST["type"])) {
    $type=$_POST["type"];
if($type==="insertUser"){
  
    $fileName=imageVaridation($_FILES['image']);
     $email=$_POST["email"];
    
     $password=$_POST["confirmPassword"];
     $userName=$_POST["username"];
     $role=$_POST["role"];
     $phone_number=$_POST["phone_number"];
     $first_name=$_POST["first_name"];
     $last_name=$_POST["last_name"];
     $national_id=$_POST["national_id"];
     $status=$_POST["status"];

     $stmt = $con->prepare("INSERT INTO systemUserInfo (first_name, last_name, status, password, email, phone_number, national_identity_number, rolebased, userNameForSy, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
     $stmt->bind_param("ssssssssss",  $first_name,  $last_name,  $status, $password, $email,$phone_number, $national_id,$role,  $userName,  $fileName);
     if ($stmt->execute()) {
        echo json_encode(array('message' => 'successfully'));
     
    } else {
        echo json_encode(array('message' => ' their is problem '));
    }

    exit;
}else if($type==="updateProductInfo"){
    $user_id=$_POST["user_id"]; 
    $name=$_POST["userNameForSy"]; 
    $rolebased=$_POST["rolebased"]; 
    $email=$_POST["email"]; 
    $first_name=$_POST["first_name"]; 
    $last_name=$_POST["last_name"]; 
    $status=$_POST["status"]; 


    editUser($user_id, $first_name, $last_name,$status, $email ,$rolebased, $name);
} else if($type==="delete"){
    $id=$_POST["userIdDeleteId"];   
    deleteUser($id);
}else if($type==="EdityPassword"){
    $edityId=$_POST["user_id"];
    $newpassword=$_POST["password"];
     $stmt = $con->prepare("UPDATE `systemUserInfo` SET `password` = ? WHERE `systemUserInfo`.`user_id` = ?");
     $stmt->bind_param('si',$newpassword,$edityId);
    $stmt->execute();
 
   if ($stmt->execute()) {
    
       echo json_encode(array('message' => 'successfully'));
       } else {

        echo json_encode(array('message' => ' their is problem '));
       }

}
}

$con->close();

?>
