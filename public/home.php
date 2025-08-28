<?php

    require_once "../config/database.php";
    require_once "../controllers/AuthController.php";
    $title = "Home";

    $data = [
    "email"=>"Sara@gmail.com",
    "password"=>"321"
    ];

    AuthController::login($conn, $data);

?>

    <h1>Home</h1>
    
<?php
    require_once 'utils/footer.php';
?>
