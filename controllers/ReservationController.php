<?php
require_once __DIR__ . "/../models/ReservationModel.php";

class ReservationController {
     public static function create($conn, $data) {

        $inicio = new DateTime($data['inicio']);
        $fim = new DateTime($data['fim']);
       
        $inicio->setTime(14, 0, 0);
        $fim->setTime(12, 0, 0);
           
        $data['inicio'] = $inicio->format('Y-m-d H:i:s');
        $data['fim'] = $fim->format('Y-m-d H:i:s');

        $result = ReservationModel::create($conn, $data);
        if ($result) {
            return jsonResponse(['message' => 'Reserva criada com sucesso']);
        } else {
            return jsonResponse(['message' => 'Erro inesperado'], 400);
        }
    }

    public static function listbyOrder($conn, $fk_pedidos) {
    $reservation = ReservationModel::listByOrder($conn, $fk_pedidos);
    return jsonResponse($reservation);
    }

}


?>