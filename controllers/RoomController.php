<?php
require_once __DIR__ . "/../models/RoomModel.php";

class RoomController {
    public static function create($conn, $data)
    {
        $result = RoomModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Quarto criado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function getAll($conn) {
    $roomList = RoomModel::getAll($conn);
    return jsonResponse($roomList);
    }

    public static function getById($conn, $id)
    {
    $room = RoomModel::searchById($conn, $id);
    return jsonResponse($room);
    }

    public static function delete($conn, $id)
    {
        $result = RoomModel::delete($conn, $id);
        if ($result) {
            return jsonResponse(['message' => 'Quarto deletado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro'], 400);
        }
    }

    public static function update($conn, $id, $data)
    {
        $result = RoomModel::update($conn, $id, $data);
        if ($result) {
            return jsonResponse(['message' => 'Quarto atualizado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Eroo'], 400);
        }
    }
}
?>