<?php

    require_once __DIR__ . "/../models/UserModel.php";
    require_once "PasswordController.php";

    class AuthController{
        public static function login($conn, $data){

            $data['email'] = trim($data['email']);
            $data['password'] = trim($data['password']);

            //Verificar campos vazios
            if (empty($data['email']) || empty($data['password'])) {
                return jsonResponse([
                    "status"=>"erro",
                    "message"=>"Preencha todos os campos!"
                ], 401);
            }

            //Valida a informação
            $user = UserModel::validateUser($conn, $data['email'], $data['password']);
            if ($user) {
                return jsonResponse([
                    "id"=>$user['id'],
                    "nome"=>$user['nome'],
                    "email"=>$user['email'],
                    "cargo"=>$user['cargo']
                ]);
            } else {
                return jsonResponse([
                    "status"=>"erro",
                    "message"=>"Credenciais invalidas"
                ], 401);
            }

        }
    }

?>