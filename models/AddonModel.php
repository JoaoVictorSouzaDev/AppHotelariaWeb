<?php

    class AddonsModel {

        public static function listAll($conn) {
        $sql = "SELECT * FROM adicionais";
        $result = $conn->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
        }

        public static function searchById($conn, $id) {
        $sql = "SELECT * FROM adicionais WHERE id= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        return $stmt->get_result()->fetch_assoc();
        }

        public static function create($conn, $data) {
        $sql = "INSERT INTO  adicionais (nome, preco) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sd",
            $data["nome"],
            $data["preco"],
        );

        return $stmt->execute();
        }

        public static function update($conn, $id, $data) {

        $sql = "UPDATE adicionais SET nome=?, preco=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sdi",
            $data["nome"],
            $data["preco"],
            $id
        );

        return $stmt->execute();
        }

        public static function delete($conn) {
        $sql = "DELETE FROM adicionais WHERE id= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        return $stmt->execute();
        }
        
    }

?>
