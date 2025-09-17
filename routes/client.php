<?php

    require_once __DIR__ . "/../controllers/ClientController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            ClientController::getById($conn, $id);
        } else {
            ClientController::getAll($conn);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            ClientController::delete($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }
    
    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data)) {
            ClientController::create($conn, $data);
        } else {
            jsonResponse(["message"=>"Atributos Invalidos!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        if (isset($id, $data)) {
            ClientController::update($conn, $id, $data);
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