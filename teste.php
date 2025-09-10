<?php

require_once __DIR__ . "/controllers/AuthController.php";
require_once __DIR__ . "/controllers/RoomController.php";
require_once __DIR__ . "/controllers/PasswordController.php";
require_once __DIR__ . "/helpers/token_jwt.php";

$data = [
    "nome" => "Quarto kids",
    "numero" => 1,
    "qtd_cama_casal" => 2,
    "qtd_cama_solteiro" => 0,
    "preco" => 2500,
    "disponivel" => 1
];

RoomController::getAll($conn);

?>