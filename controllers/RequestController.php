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
        $requestList = RequestModel::listAll($conn);
        return jsonResponse($requestList);
    }

    public static function getById($conn, $id) {
        $request = RequestModel::searchById($conn, $id);
        return jsonResponse($request);
    }

    public static function delete($conn, $id) {
        $result = RequestModel::delete($conn, $id);
        if ($result) {
            return jsonResponse(['message' => 'Pedido deletado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro'], 400);
        }
    }

    public static function update($conn, $id, $data) {
        $result = RequestModel::update($conn, $id, $data);
        if ($result) {
            return jsonResponse(['message' => 'Pedido atualizado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Ero'], 400);
        }
    }

}
?>