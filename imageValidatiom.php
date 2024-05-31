<?php
function imageVaridation($Image){
    if (isset($Image)){
        $targetDirPath = "../tabalo/picture/";
        $fileName = basename($Image['name']);
        $targetFilePath = $targetDirPath . $fileName;
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
        $allowedTypes = array("png", "jpg", "jpeg", "gif","webp","JPEG","svg");
        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($Image['tmp_name'], $targetFilePath)) {
                return $fileName;

            }else{
                echo json_encode(array('message' => 'theire problem in uplode image'));
              
            }
        }else{
               
                echo json_encode(array('message' => 'image formate your insert is not allowed'));
        }
         }else{
            echo json_encode(array('message' => 'please insert image'));
       
     }

    
}
?>