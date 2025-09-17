<?php

require_once __DIR__ . "/controllers/AuthController.php";
require_once __DIR__ . "/controllers/RoomController.php";
require_once __DIR__ . "/controllers/ClientController.php";
require_once __DIR__ . "/controllers/AddonController.php";
require_once __DIR__ . "/controllers/RequestController.php";
require_once __DIR__ . "/controllers/PasswordController.php";
require_once __DIR__ . "/helpers/token_jwt.php";

$data = [
    "nome" => "Uira",
    "cpf" => "123.456.789-10",
    "telefone" => "(10) 98765-4321",
    "email" => "Uira@gmail.com",
    "senha" => "321",
    "fk_funcoes" => 1
];

RequestController::getAll($conn);

?>