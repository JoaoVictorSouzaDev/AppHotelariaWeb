<?php

    require_once __DIR__ . "/../controllers/ImagesController.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        ImagesController::createRoomImagesHandler($conn);
    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }

?>