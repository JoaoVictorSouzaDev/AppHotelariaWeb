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
                return null;
            }

            $user = UserModel::validateUser($conn, $data['email'], $data['senha']);
            if ($user) {
                $user->role = 'user'; 
                return $user; 
            }

            return null;
        }

        public static function loginClient($conn, $data) {

            $data['email'] = trim($data['email']);
            $data['senha'] = trim($data['senha']);
            $data['email'] = strtolower($data['email']);
    
            if (empty($data['email']) || empty($data['senha'])) {
                return null; 
            }
    
            $client = ClientModel::validateClient($conn, $data['email'], $data['senha']);
            if ($client) {
                $client->role = 'client'; 
                return $client; 
            } 

            return null;
        }
    }

?>