<?php

    require_once __DIR__ . "/../controllers/AuthController.php";
    require_once __DIR__ . "/../helpers/token_jwt.php";

    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $client = AuthController::loginClient($conn, $data);

        if ($client) {
            $token = createToken($client); 
            return jsonResponse(["token" => $token, "tipoUsuario" => $client->role], 200);

        } else {
            $usuario = AuthController::loginUser($conn, $data);

            if ($usuario) {
                $token = createToken($usuario);
                return jsonResponse(["token" => $token, "tipoUsuario" => $usuario->role], 200);

            } else {
                return jsonResponse([
                    "status" => "erro",
                    "message" => "Credenciais inválidas!"
                ], 401);
            }
        }
    }    

    /* Cóigo Funcional
        $op = $segments[2] ?? null;
        $data = json_decode(file_get_contents('php://input'), true);

        if ($op == "client") {
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
    */

?>