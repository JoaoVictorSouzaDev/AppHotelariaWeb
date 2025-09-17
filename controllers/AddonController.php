<?php
require_once __DIR__ . "/../models/AddonModel.php";

class addonsController {
     public static function create($conn, $data)
    {
        $result = AddonsModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Adicional criado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function getAll($conn) {
    $roomList = AddonsModel::listAll($conn);
    return jsonResponse($roomList);
    }

    public static function getById($conn, $id) {
    $room = AddonsModel::searchById($conn, $id);
    return jsonResponse($room);
    }

    public static function delete($conn, $id) {
        $result = AddonsModel::delete($conn, $id);
        if ($result) {
            return jsonResponse(['message' => 'Adicional deletado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro'], 400);
        }
    }

    public static function update($conn, $id, $data) {
        $result = AddonsModel::update($conn, $id, $data);
        if ($result) {
            return jsonResponse(['message' => 'Adicional atualizado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Eroo'], 400);
        }
    }
}

?>