<?php

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

        return $stmt->execute();
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

    }

?>