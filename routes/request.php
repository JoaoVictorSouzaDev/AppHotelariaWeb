<?php

    require_once __DIR__ . "/../controllers/RequestController.php";

    //pronto

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            RequestController::getById($conn, $id);
        } else {
            RequestController::getAll($conn);
        }
    
    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data)) {
            RequestController::create($conn, $data);
        } else {
            jsonResponse(["message"=>"Atributos Invalidos!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        if (isset($id)) {
            RequestController::delete($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        if (isset($id, $data)) {
            RequestController::update($conn, $id, $data);
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