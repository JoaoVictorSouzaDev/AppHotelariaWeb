<?php

    require_once __DIR__ ."/controllers/AuthController.php";
    require_once __DIR__ ."/controllers/PasswordController.php";

    $data = [
        "email"=>"Sara@gmail.com",
        "password"=>"321"
    ];

    AuthController::login($conn, $data);

    echo $hash = PasswordController::generateHash($data['password']);
    echo "<br>".PasswordController::validateHash($data['password'], $hash);

?>