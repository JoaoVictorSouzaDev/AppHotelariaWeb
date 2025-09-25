<?php

require_once __DIR__ . "/controllers/AuthController.php";
require_once __DIR__ . "/controllers/RoomController.php";
require_once __DIR__ . "/controllers/ClientController.php";
require_once __DIR__ . "/controllers/AddonController.php";
require_once __DIR__ . "/controllers/RequestController.php";
require_once __DIR__ . "/controllers/ReservationController.php";
require_once __DIR__ . "/controllers/PasswordController.php";
require_once __DIR__ . "/helpers/token_jwt.php";

$data = [
    "inicio" => "2025-12-13",
    "fim" => "2025-12-15"
];

$inicio = $data['inicio'];
$fim = $data['fim'];
RoomController::getByAvaible($conn, $inicio, $fim);



?>