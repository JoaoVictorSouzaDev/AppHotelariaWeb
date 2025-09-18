<?php

    //Pronto

    require_once __DIR__ . "/../controllers/ReservationController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $fk_pedidos = $segments[2] ?? null;

        if (isset($fk_pedidos)) {
            ReservationController::listbyOrder($conn, $fk_pedidos);
        } else {
             jsonResponse(["message"=>"Atributos Invalidos!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data)) {
            ReservationController::create($conn, $data);
        } else {
            jsonResponse(["message"=>"Atributos Invalidos!"], 400);
        }
    
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }

?>