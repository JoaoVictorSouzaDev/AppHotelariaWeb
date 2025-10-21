<?php
    class ImageModel {

        public static function create($conn, $data) {
            $sql = "INSERT INTO imagens (nome, caminho) VALUES (?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
            "ss", 
            $data["nome"],
            $data["caminho"]
            );
            
            $resultado = $stmt->execute();

            if ($resultado) {
                return $conn->insert_id; 
            }
            
            return false;
        }
    }
?>