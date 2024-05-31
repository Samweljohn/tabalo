<?php
require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

   
    
    if($_POST['token']){
        $tok=$_POST['token'];
        
        $decodedToken =token($tok);
        echo $decodedToken;
    }
    function token($token){
        $key = "tabaro_key";
        $decodedToken =  JWT::decode($token, new Key($key, 'HS256'));
        return json_encode($decodedToken);
    }
        
    
?>
