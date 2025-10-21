<?php
require_once "RoomModel.php";
require_once "ImageModel.php";
require_once "ImageRoomModel.php";

class RoomService {
    public static function createRoomWithImages($conn, $roomData, $fileData) {
        $upload_dir = __DIR__ . "/../uploads/quartos/"; 
        
        $conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
        $imagens_ids = [];
        
        try {
            
            $roomId = RoomModel::create($conn, $roomData);
            
            if (!$roomId) {
                throw new RuntimeException("Erro ao criar o quarto na tabela 'quartos'.");
            }
            
            if (isset($fileData['name']) && is_array($fileData['name'])) {

                foreach ($fileData['name'] as $index => $fileName) {
                    
                    if ($fileData['error'][$index] !== UPLOAD_ERR_OK) {
                        continue;
                    }
    
                    $fileTmpName = $fileData['tmp_name'][$index];
                    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                    
                    $newFileName = uniqid('img_') . time() . '.' . $ext;
                    $destination = $upload_dir . $newFileName;
                    $dbPath = "/uploads/quartos/" . $newFileName;

                    if (!move_uploaded_file($fileTmpName, $destination)) {
                        throw new RuntimeException("Erro ao salvar o arquivo '{$fileName}' no disco. Verifique permissões."); 
                    }
    
                    $imageData = [
                        "caminho" => $dbPath, 
                        "nome" => $fileName 
                    ];
                    
                    $imageId = ImageModel::create($conn, $imageData);
                    
                    if (!$imageId) {
                        throw new RuntimeException("Erro ao inserir o metadado da imagem no BD.");
                    }
                    
                    $imagens_ids[] = $imageId; 
                }
            }
            
            foreach ($imagens_ids as $imageId) {
                $linkResult = ImageRoomModel::linkRoomToImage($conn, $roomId, $imageId);

                if (!$linkResult) {
                    throw new RuntimeException("Erro ao vincular a imagem ID {$imageId} ao quarto ID {$roomId}.");
                }
            }

            $conn->commit();
            
            return [
                "success" => true, 
                "id" => $roomId, 
                "total_imagens" => count($imagens_ids),
                "message" => "Quarto e imagens criados com sucesso."
            ];

        } catch (\Throwable $th) {
            
            try {
                $conn->rollback();
            } catch (\Throwable $th2) {}

            throw $th;
        }
    }
}