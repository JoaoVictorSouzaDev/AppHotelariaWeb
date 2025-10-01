<?php

    require_once __DIR__ . "/../models/UserModel.php";
    require_once __DIR__ . "/../models/ClientModel.php";
    require_once "PasswordController.php";
    require_once __DIR__ . "/../helpers/token_jwt.php";

    class AuthController{
        public static function loginUser($conn, $data){

            $data['email'] = trim($data['email']);
            $data['senha'] = trim($data['senha']);

            if (empty($data['email']) || empty($data['senha'])) {
                return jsonResponse([
                    "status"=>"erro",
                    "message"=>"Preencha todos os campos!"
                ], 401);
            }

            $user = UserModel::validateUser($conn, $data['email'], $data['senha']);
            if ($user) {
                $token = createToken($user);
                return jsonResponse(["token" => $token]);
            } else {
                return jsonResponse([
                    "status"=>"erro",
                    "message"=>"Credenciais invalidas"
                ], 401);
            }

        }

        public static function loginClient($conn, $data) {

            $data['email'] = trim($data['email']);
            $data['senha'] = trim($data['senha']);
    
            if (empty($data['email']) || empty($data['senha'])) {
                return jsonResponse([
                    "status" => "erro",
                    "message" => "Preencha todos os campos!"
                ], 401);
            }
    
            $client = ClientModel::validateClient($conn, $data['email'], $data['senha']);
            if ($client) {
                $token = createToken($client);
                return jsonResponse([ "token" => $token ]);
            } else {
                return jsonResponse([
                    "status" => "erro",
                    "message" => "Credenciais inválidas!"
                ], 401);
            }
        }
    }

?>