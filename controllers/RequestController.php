<?php
require_once __DIR__ . "/../models/RequestModel.php";
require_once "DataController.php";

class RequestController {

    public static function create($conn, $data) {
        $result = RequestModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Pedido criado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function createRequest($conn, $data){
        $data["usuario_id"] = isset($data['usuario_id']) ? $data['usuario_id'] : null;
        ValidateController::issetData($data,['cliente_id','pagamento','quartos']);      
    
        foreach($data['quartos'] as $index => $quartos){
            ValidateController::issetData($quartos,['id', 'inicio', 'fim']);
        }
        if (count($data['quartos']) == 0) {
            jsonResponse(['message' => 'Nenhum quartos existente na reserva!'], 400);
        }

        //Transformar em data
        //RequestModel::createRequest($conn, $data);
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