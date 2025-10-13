<?php
require_once __DIR__ . "/../models/ReservationModel.php";
require_once "DataController.php";

class ReservationController {
     public static function create($conn, $data) {

        $data['inicio'] = ValidateController::fixDateHour($data['inicio'], 14);
        $data['fim'] = ValidateController::fixDateHour($data['fim'], 12);

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

   public static function isReserved($conn, $fkQuarto, $inicio, $fim) {
        $inicio = ValidateController::fixDateHour($inicio, 14);
        $fim = ValidateController::fixDateHour($fim, 12);

        $isReserved = ReservationModel::getAvaibleOrder($conn, $fkQuarto, $inicio, $fim);
        if ($isReserved) {
            return jsonResponse(['message' => 'Existe uma reserva para este quarto neste período.']);
        } else {
            return jsonResponse(['message' => 'Não Existe reserva. O quarto está disponível.']);
        }
    }
}


?>