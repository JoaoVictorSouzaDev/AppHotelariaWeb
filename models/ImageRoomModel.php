<?php
    class RoomImageModel {

        public static function linkRoomToImage($conn, $fk_quartos, $fk_imagens) {
            $sql = "INSERT INTO imagens_quartos (fk_quartos, fk_imagens) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
                "ii",
                $fk_quartos,
                $fk_imagens
            );

            return $stmt->execute();
        }
    }
?>