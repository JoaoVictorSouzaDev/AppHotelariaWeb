<?php

    class ReservationModel {
        
        public static function listByOrder($conn, $fk_pedidos) {
        $sql = "SELECT * FROM reservas WHERE fk_pedidos= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $fk_pedidos);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
        }

        public static function create($conn, $data) {
            $sql = "INSERT INTO reservas (fim, inicio, fk_pedidos, fk_quartos, fk_adicionais) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
            "ssiii",
            $data["fim"],
            $data["inicio"],
            $data["fk_pedidos"],
            $data["fk_quartos"],
            $data["fk_adicionais"],
        );

        return $stmt->execute();
        }

        public static function getAvaibleOrder($conn, $fkQuarto, $inicio, $fim) {
            $sql = 
            "
            SELECT
                id
            FROM
                reservas
            WHERE
                fk_quartos = ? AND
                (
                    inicio < ? AND fim > ?
                )
            LIMIT 1;
                ";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
                "iss",
                $fkQuarto,
                $inicio,
                $fim

            );   
            $stmt->execute();
            $result = $stmt->get_result();
            $isReserved = $result->num_rows > 0;
            $stmt->close();

            return $isReserved;
        }
    }

?>