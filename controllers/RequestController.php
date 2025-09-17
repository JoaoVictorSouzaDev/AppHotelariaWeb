<?php
require_once __DIR__ . "/../models/RequestModel.php";

class RequestController {
    public static function create($conn, $data) {
        $result = RequestModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Pedido criado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function getAll($conn) {
    $roomList = RequestModel::listAll($conn);
    return jsonResponse($roomList);
    }

    public static function getById($conn, $id) {
    $room = RequestModel::searchById($conn, $id);
    return jsonResponse($room);
    }
}
?>