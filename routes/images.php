<?php

    require_once __DIR__ . "/../controllers/ImagesController.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $data = $_FILES['fotos'] ?? null;
        ImagesController::upload($data);
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }

?>