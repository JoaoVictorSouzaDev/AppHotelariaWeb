<?php

    require_once __DIR__ ."/controllers/AuthController.php";
    require_once __DIR__ ."/controllers/PasswordController.php";
    require_once __DIR__ ."/helpers/token_jwt.php";

    $data = [
        "email"=>"Sara@gmail.com",
        "password"=>"321"
    ];

    AuthController::login($conn, $data);

?>