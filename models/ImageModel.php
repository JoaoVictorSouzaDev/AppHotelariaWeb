<?php
    class ImageModel {

        public static function listAll($conn) {
            $sql = "SELECT * FROM imagens";
            $result = $conn->query($sql);

            return $result->fetch_all(MYSQLI_ASSOC);
        }

        public static function searchById($conn, $id) {
            $sql = "SELECT * FROM imagens WHERE id= ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            return $stmt->get_result()->fetch_assoc();
        }

        public static function create($conn, $data) {

            $sql = "INSERT INTO imagens (nome, caminho) VALUES (?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
            "ss", 
            $data["name"],
            $data["path"]
            );
            $resultado = $stmt->execute();
            if ($resultado) {
                return $conn->insert_id; 
            }
            return false;

        }

        public static function createRelationRoom($conn, $fk_quartos, $fk_imagens) {
            $sql = "INSERT INTO imagens_quartos (fk_quartos, fk_imagens) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $fk_quartos, $fk_imagens);
            if ($stmt->execute()) {
                return $conn->insert_id;
            }
            return false;
        }

        public static function searchByRoomId($conn, $id) {
            $sql = "SELECT i.nome FROM imagens_quartos iq JOIN imagens i ON iq.fk_imagens = i.id WHERE iq.fk_quartos = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $photos = [];
            while ($row = $result->fetch_assoc()) {
                $photos[] = $row['nome'];
            }
            return $photos;
        }
    }
?>