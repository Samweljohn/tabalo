<?php
include './connect.php';
$sql="SELECT `user_id`,`userNameForSy`,`rolebased`,`email`,`image`,`status`,first_name, last_name FROM `systemUserInfo`";
$result = $con->query($sql);
    
if($result->num_rows > 0){
    $user= array();
   while($row = $result->fetch_assoc()){
    $user[]=$row;
 }
 echo json_encode( $user);
 } else {
 echo "0 result";
 }

if(isset($_POST["user_id"])){
    $edityId=$_POST["user_id"];
    $newpassword=$_POST["password"];
 $stmt = $con->prepare("UPDATE `systemUserInfo` SET `password` = ? WHERE `systemUserInfo`.`user_id` = ?");
 $stmt->bind_param('si',$newpassword,$edityId);
  $stmt->execute();
 
 if ($stmt->execute()) {
    
    echo json_encode(array('message' => 'successfully'));
 } else {
    echo json_encode(array('message' => 'failure'));
 }
echo json_encode('hellow');
  
}
 $con->close();
?> 