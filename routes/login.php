<?php

    require_once __DIR__ . "/../controllers/AuthController.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $op = $segments[2] ?? null;
        $data = json_decode(file_get_contents('php://input'), true);

        if ($op === "client") {
            AuthController::loginClient($conn, $data);
        } else if ($op == "user") {
            AuthController::loginUser($conn, $data);
        } else {
            jsonResponse([
            "status"=>"erro",
            "message"=>"Rota não encontrada"
        ], 405);
        }
    
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }

?>