<?php
// authMiddleware.php

require 'vendor/autoload.php'; // Include Composer's autoloader for JWT

use Firebase\JWT\JWT;

function authenticateJWT() {
    $secret_key = "your_secret_key";
    $jwt = null;

    // Check if JWT token is present in the Authorization header
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $jwt = $_SERVER['HTTP_AUTHORIZATION'];
    } else {
        // Token not found, return unauthorized
        http_response_code(401);
        exit();
    }

    // Verify JWT token
    try {
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));
        // Token is valid, return user ID or other data as needed
        return $decoded->user_id;
    } catch (Exception $e) {
        // Token is invalid, return unauthorized
        http_response_code(401);
        exit();
    }
}
?>
