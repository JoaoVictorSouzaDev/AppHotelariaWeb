<?php
    require_once "RoomModel.php";
    require_once "ReservationModel.php";

    class RequestModel {

        public static function create($conn, $data) {
            $sql = "INSERT INTO pedidos (pagamento, fk_usuarios, fk_clientes) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
            "sii",
            $data["pagamento"],
            $data["fk_usuarios"],
            $data["fk_clientes"],
        );

            $resultado = $stmt->execute();
            if ($resultado) {
                return $conn->insert_id;
            }
            return false;
        }

        public static function searchById($conn, $id) {
        $sql = "SELECT * FROM pedidos WHERE id= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
        }

        public static function listAll($conn) {
        $sql = "SELECT * FROM pedidos";
        $result = $conn->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
        }

        public static function update($conn, $id, $data) {
        $sql = "UPDATE pedidos SET pagamento=? WHERE id= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "si",
            $data["pagamento"],
            $id
        );

        return $stmt->execute();
        }

        public static function delete($conn, $id) {
        $sql = "DELETE FROM pedidos WHERE id= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
            
        return $stmt->execute();
        }

        public static function createRequest($conn, $data) {
            $usuarioId = $data['usuario_id'];
            $clienteId = $data['cliente_id'];
            $pagamento = $data['pagamento'];
            $reservas = [];
            $reservou = false;

            $conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);

            try {
                $orderId = self::create($conn, [
                    "fk_clientes" => $usuarioId,
                    "fk_usuarios" => $clienteId,
                    "pagamento" => $pagamento
                ]);

                if (!$orderId) {
                    throw new RunTimeException("Erro ao criar o pedido");
                }

                foreach($data['quartos'] as $quarto) {
                    $id = $quarto['id'];
                    $inicio = $quarto['inicio'];
                    $fim = $quarto['fim'];

                    if (!RoomModel::lockById($conn, $id)) {
                        $reservas[] = "Quarto {$id} está indisponivel!";
                        continue;
                    }

                    if (ReservationModel::getAvaibleOrder($conn, $id, $inicio, $fim)) {
                        $reservas[] = "Quarto {$id} está indisponivel.";
                        continue;
                    }

                    $reserverResult = ReservationModel::create($conn,[
                        "fk_pedidos" => $orderId,
                        "fk_quartos" => $id,
                        "fk_adicionais" => 2,
                        "fim" => $fim,
                        "inicio" => $inicio,
                    ]);
                    $reservou = true;
                    $reservas[] = [
                        "fk_reservas" => $conn->insert_id,
                        "fk_quartos" => $id
                    ];
                }

                if ($reservou == true) {
                    $conn->commit();
                    return [
                        "fk_pedidos" => $orderId,
                        "reservas" => $reservas,
                        "messagem" => "Reservas criadas com sucesso!!"
                    ];
                } else {
                    throw new RuntimeException("Pedido nao realizado, nenhum quarto reservado");
                }

            } catch (\Throwable $th) {
                try {$conn->rollback();} 
                catch (\Throwable $th2) {}
                throw $th;
            }
        }
    }

?>