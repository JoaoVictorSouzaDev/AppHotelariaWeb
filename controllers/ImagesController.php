<?php

require_once __DIR__ . "/../models/RoomService.php";

class ImagesController {

    public static function createRoomImagesHandler($conn) {

        $roomData = $_POST; 
        $fileData = $_FILES['imagens'] ?? [];

        try {
            $result = RoomService::createRoomWithImages($conn, $roomData, $fileData);

            return jsonResponse([
                'message' => 'Quarto e imagens criados com sucesso!', 
                'data' => $result
            ], 201);
            
        } catch (\RuntimeException $e) {
            return jsonResponse(['message' => $e->getMessage()], 400); 
            
        } catch (\Throwable $th) {
            error_log("Erro Crítico no ImagesController: " . $th->getMessage());
            return jsonResponse(['message' => 'Erro interno no servidor.'], 500);
        }
    }
}

?>