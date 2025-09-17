<?php
require_once __DIR__ . "/../models/ClientModel.php";
require_once "PasswordController.php";

class clientController {
     public static function create($conn, $data) {
        $data['senha'] = PasswordController::generateHash($password = $data['senha']);
        $result = ClientModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Cliente criado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function getAll($conn) {
    $roomList = ClientModel::listAll($conn);
    return jsonResponse($roomList);
    }

    public static function getById($conn, $id) {
    $room = ClientModel::searchById($conn, $id);
    return jsonResponse($room);
    }

    public static function delete($conn, $id) {
        $result = ClientModel::delete($conn, $id);
        if ($result) {
            return jsonResponse(['message' => 'Cliente deletado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro'], 400);
        }
    }

    public static function update($conn, $id, $data) {
        $result = ClientModel::update($conn, $id, $data);
        if ($result) {
            return jsonResponse(['message' => 'Cliente atualizado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Eroo'], 400);
        }
    }
}

?>