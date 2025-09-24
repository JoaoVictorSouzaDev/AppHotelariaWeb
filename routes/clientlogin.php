<?php
    require_once __DIR__ . "/../controllers/ClientController.php";
 
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);
        ClientController::loginClient($conn, $data);
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }
 
?>