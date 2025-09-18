<?php

    //Pronto

    require_once __DIR__ . "/../controllers/AddonController.php";
    require_once __DIR__ . "/../controllers/DataController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            AddonsController::getById($conn, $id);
        } else {
            AddonsController::getAll($conn);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        if (isset($id)) {
            AddonsController::delete($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }
    
    } else if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = json_decode(file_get_contents('php://input'), true);

        if (validadePrice($data['preco'])) {
            jsonResponse(["message"=>"Brabo!"], 400);
        } else {
            jsonResponse(["message"=>"Paia!"], 400);
        }

        if (isset($data)) {
            AddonsController::create($conn, $data);
        } else {
            jsonResponse(["message"=>"Atributos Invalidos!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        if (isset($id, $data)) {
            AddonsController::update($conn, $id, $data);
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