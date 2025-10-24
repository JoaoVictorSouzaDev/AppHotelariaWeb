<?php
require_once __DIR__ . "/../models/RoomModel.php";
require_once __DIR__ . "/../models/ImageModel.php";
require_once "DataController.php";
require_once "ImagesController.php";

class RoomController {

    //public static $labels = ['nome', 'numero', 'qtd_cama_casal', 'qtd_cama_solteiro', 'preco', 'disponivel'];

    public static function create($conn, $data) {

        //ValidateController::issetData($data, self::$labels);
        
        $result = RoomModel::create($conn, $data);
        if ($result) {
            if ($data['fotos']){
                $pictures = ImagesController::upload($data['fotos']);
                foreach($pictures['saves'] as $name) {
                    $idPhoto = ImageModel::create($conn, $name);
                    if ($idPhoto) {
                        ImageModel::createRelationRoom($conn, $result, $idPhoto);
                    }
                }
            }
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

    public static function update($conn, $id, $data) {
        $result = RoomModel::update($conn, $id, $data);
        if ($result) {
            return jsonResponse(['message' => 'Quarto atualizado com sucesso']);
        } else {
            return jsonResponse(['message' => 'Eroo'], 400);
        }
    }

    public static function getByAvaible($conn, $inicio, $fim, $qtdPessoas) {
        $result = RoomModel::searchAvailable($conn, $inicio, $fim, $qtdPessoas);
        if($result){
            foreach ($result as &$quarto) {
                $quarto['fotos'] = ImageModel::searchByRoomId($conn, $quarto['id']);
            }
            return jsonResponse(['Quartos'=> $result]);
        }else{
            return jsonResponse(['message'=> 'não tem quartos disponiveis'], 400);
        }
    }
}
?>